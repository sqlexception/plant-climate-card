import type {
  HassEntity,
  HVACMode,
  PlantClimateCardConfig,
  TemperatureRange
} from "./types";

export const DEFAULTS = {
  heatDefault: 21,
  heatManualMax: 23,
  coolAutoDefault: 25,
  coolManualMin: 25,
  coolOutdoorDelta: 8,
  temperatureStep: 0.5
} as const;

export function finiteNumber(value: unknown): number | undefined {
  const numeric = typeof value === "number" ? value : Number.parseFloat(String(value));
  return Number.isFinite(numeric) ? numeric : undefined;
}

export function numericEntityState(entity?: HassEntity): number | undefined {
  if (!entity || entity.state === "unknown" || entity.state === "unavailable") {
    return undefined;
  }
  return finiteNumber(entity.state);
}

export function boolEntityIsOn(entity?: HassEntity): boolean | undefined {
  if (!entity || entity.state === "unknown" || entity.state === "unavailable") {
    return undefined;
  }
  return entity.state === "on";
}

export function inferRoomEnableEntity(climateEntity: string): string | undefined {
  const match = /^climate\.(.+)_inneneinheit$/.exec(climateEntity);
  return match
    ? `input_boolean.${match[1]}_01_freigabe`
    : undefined;
}

export function coolingManualMinimum(
  manualMinimum: number = DEFAULTS.coolManualMin
): number {
  return Math.max(DEFAULTS.coolManualMin, manualMinimum);
}

export function automaticTarget(
  mode: HVACMode,
  outsideTemperature: number | undefined,
  config: PlantClimateCardConfig
): number | undefined {
  const heatDefault = config.heat_default ?? DEFAULTS.heatDefault;
  const coolDefault = config.cool_auto_default ?? DEFAULTS.coolAutoDefault;
  const outdoorDelta = config.cool_outdoor_delta ?? DEFAULTS.coolOutdoorDelta;

  if (mode === "heat") {
    return heatDefault;
  }

  if (mode === "cool" || mode === "dry") {
    return outsideTemperature === undefined
      ? coolDefault
      : Math.max(coolDefault, outsideTemperature - outdoorDelta);
  }

  return undefined;
}

export function resolveEffectiveMode(mode: HVACMode, plantMode?: string): HVACMode {
  if ((mode === "heat_cool" || mode === "auto") && (plantMode === "heat" || plantMode === "cool")) {
    return plantMode;
  }
  return mode;
}

export function temperatureDemandAction(options: {
  mode: HVACMode;
  plantMode?: string;
  currentTemperature?: number;
  targetTemperature?: number;
  controlsBlocked?: boolean;
  reportedAction?: string;
}): string {
  const {
    mode,
    plantMode,
    currentTemperature,
    targetTemperature,
    controlsBlocked = false,
    reportedAction
  } = options;
  const effectiveMode = resolveEffectiveMode(mode, plantMode);

  if (effectiveMode === "off") return "off";
  if (controlsBlocked) return "idle";

  if (
    currentTemperature !== undefined &&
    targetTemperature !== undefined
  ) {
    if (effectiveMode === "cool") {
      return targetTemperature < currentTemperature ? "cooling" : "idle";
    }
    if (effectiveMode === "heat") {
      return currentTemperature < targetTemperature ? "heating" : "idle";
    }
  }

  return reportedAction ?? "idle";
}

export function allowedTemperatureRange(options: {
  mode: HVACMode;
  plantMode?: string;
  entityMin: number;
  entityMax: number;
  outsideTemperature?: number;
  config: PlantClimateCardConfig;
}): TemperatureRange {
  const {
    mode,
    plantMode,
    entityMin,
    entityMax,
    outsideTemperature,
    config
  } = options;
  const effectiveMode = resolveEffectiveMode(mode, plantMode);
  let min = entityMin;
  let max = entityMax;

  if (effectiveMode === "heat") {
    max = Math.min(max, config.heat_manual_max ?? DEFAULTS.heatManualMax);
  }

  if (effectiveMode === "cool" || effectiveMode === "dry") {
    min = Math.max(
      min,
      coolingManualMinimum(
        config.cool_manual_min ?? DEFAULTS.coolManualMin
      )
    );
  }

  if (min > max) {
    min = max;
  }

  return {
    min,
    max,
    step: config.temperature_step ?? DEFAULTS.temperatureStep,
    effectiveMode
  };
}

export function roundToStep(value: number, step: number, base = 0): number {
  const rounded = Math.round((value - base) / step) * step + base;
  return Number(rounded.toFixed(3));
}

export function clampTemperature(value: number, range: TemperatureRange): number {
  const clamped = Math.min(range.max, Math.max(range.min, value));
  return roundToStep(clamped, range.step, range.min);
}

export function modeLabel(mode: string): string {
  const labels: Record<string, string> = {
    off: "Aus",
    heat: "Heizen",
    cool: "Kühlen",
    heat_cool: "Automatik",
    auto: "Automatik",
    dry: "Entfeuchten",
    fan_only: "Lüften"
  };
  return labels[mode] ?? mode;
}

export function actionLabel(action: string, mode: string): string {
  const labels: Record<string, string> = {
    off: "Aus",
    heating: "Heizt",
    cooling: "Kühlt",
    drying: "Entfeuchtet",
    fan: "Lüftet",
    idle: "Hält",
    defrosting: "Abtauung",
    preheating: "Vorheizen"
  };
  return labels[action] ?? (action ? action : modeLabel(mode));
}

export function requestLabel(request: string): string {
  const labels: Record<string, string> = {
    none: "Kein Bedarf",
    heat: "Heizbedarf",
    cool: "Kühlbedarf",
    hold: "Soll erreicht",
    blocked: "Gesperrt"
  };
  return labels[request] ?? request;
}

export function controllerLabel(state: string): string {
  const labels: Record<string, string> = {
    off: "Regler aus",
    heating: "Regler heizt",
    cooling: "Regler kühlt",
    holding: "Regler hält",
    changeover: "Moduswechsel",
    fault: "Störung",
    manual: "Manuell"
  };
  return labels[state] ?? state;
}

export function modeIcon(mode: string): string {
  const icons: Record<string, string> = {
    off: "mdi:power-standby",
    heat: "mdi:fire",
    cool: "mdi:snowflake",
    heat_cool: "mdi:autorenew",
    auto: "mdi:autorenew",
    dry: "mdi:water-percent",
    fan_only: "mdi:fan"
  };
  return icons[mode] ?? "mdi:thermostat";
}

export function actionIcon(action: string, mode: string): string {
  const icons: Record<string, string> = {
    heating: "mdi:fire",
    cooling: "mdi:snowflake",
    drying: "mdi:water-percent",
    fan: "mdi:fan",
    idle: "mdi:pause-circle-outline",
    defrosting: "mdi:snowflake-melt",
    preheating: "mdi:radiator"
  };
  return icons[action] ?? modeIcon(mode);
}

export function demandModeDisplay(
  mode: string,
  action: string
): { label: string; icon: string } | undefined {
  if (mode === "heat") {
    return {
      label: action === "heating" ? "Heizen" : "Lüften",
      icon: "mdi:fire"
    };
  }

  if (mode === "cool") {
    return {
      label: action === "cooling" ? "Kühlen" : "Lüften",
      icon: "mdi:snowflake"
    };
  }

  return undefined;
}

export function fanIcon(mode: string): string {
  const icons: Record<string, string> = {
    auto: "mdi:fan-auto",
    low: "mdi:fan-speed-1",
    medium: "mdi:fan-speed-2",
    high: "mdi:fan-speed-3",
    turbo: "mdi:fan-plus"
  };
  return icons[mode.toLowerCase()] ?? "mdi:fan";
}
