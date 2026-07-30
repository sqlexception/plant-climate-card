export type HVACMode =
  | "off"
  | "heat"
  | "cool"
  | "heat_cool"
  | "auto"
  | "dry"
  | "fan_only"
  | string;

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>
  ): Promise<unknown>;
  config?: {
    unit_system?: {
      temperature?: string;
    };
  };
}

export interface PlantClimateCardConfig {
  type: string;
  entity: string;
  name?: string;

  global_enable_entity?: string;
  room_enable_entity?: string;
  outside_temperature_entity?: string;

  plant_mode_entity?: string;
  controller_state_entity?: string;
  blocking_reason_entity?: string;
  fault_entity?: string;
  defrost_entity?: string;
  window_entity?: string;

  heat_default?: number;
  heat_manual_max?: number;
  cool_auto_default?: number;
  cool_manual_min?: number;
  cool_outdoor_delta?: number;
  temperature_step?: number;

  show_fan?: boolean;
}

export interface TemperatureRange {
  min: number;
  max: number;
  step: number;
  effectiveMode: HVACMode;
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}
