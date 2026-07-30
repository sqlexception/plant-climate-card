import { describe, expect, it } from "vitest";
import {
  allowedTemperatureRange,
  automaticTarget,
  clampTemperature,
  coolingManualMinimum,
  demandModeDisplay,
  inferRoomEnableEntity,
  temperatureDemandAction
} from "../src/logic";
import type { PlantClimateCardConfig } from "../src/types";

const config: PlantClimateCardConfig = {
  type: "custom:plant-climate-card",
  entity: "climate.test"
};

describe("Plant-Klimagrenzen", () => {
  it("findet die Raumfreigabe aus dem vereinbarten Entity-Namensschema", () => {
    expect(
      inferRoomEnableEntity(
        "climate.eg_kuechenbereich_klimaanlage_inneneinheit"
      )
    ).toBe("input_boolean.eg_kuechenbereich_klimaanlage_01_freigabe");
    expect(
      inferRoomEnableEntity(
        "climate.og_kinderzimmer_01_klimaanlage_inneneinheit"
      )
    ).toBe("input_boolean.og_kinderzimmer_01_klimaanlage_01_freigabe");
    expect(inferRoomEnableEntity("climate.test")).toBeUndefined();
  });

  it("verwendet für den automatischen Kühlstart mindestens 25 °C", () => {
    expect(automaticTarget("cool", 29, config)).toBe(25);
    expect(automaticTarget("cool", 38, config)).toBe(30);
  });

  it("begrenzt manuelles Kühlen standardmäßig auf mindestens 22 °C", () => {
    expect(coolingManualMinimum()).toBe(22);
    expect(coolingManualMinimum(20)).toBe(22);
    expect(coolingManualMinimum(26)).toBe(26);
  });

  it("korrigiert einen unzulässigen Kühlwunsch von 17 °C auf 22 °C", () => {
    const range = allowedTemperatureRange({
      mode: "cool",
      entityMin: 16,
      entityMax: 30,
      outsideTemperature: 32,
      config
    });
    expect(range).toMatchObject({ min: 22, max: 30, effectiveMode: "cool" });
    expect(clampTemperature(17, range)).toBe(22);
  });

  it("übernimmt höhere konfigurierte Kühl-Minima", () => {
    const range = allowedTemperatureRange({
      mode: "cool",
      entityMin: 16,
      entityMax: 30,
      outsideTemperature: 32,
      config: { ...config, cool_manual_min: 25 }
    });
    expect(range.min).toBe(25);
    expect(clampTemperature(17, range)).toBe(25);
  });

  it("begrenzt manuelles Heizen standardmäßig auf 22 °C", () => {
    const range = allowedTemperatureRange({
      mode: "heat",
      entityMin: 16,
      entityMax: 30,
      config
    });
    expect(range).toMatchObject({ min: 16, max: 22, effectiveMode: "heat" });
    expect(clampTemperature(25, range)).toBe(22);
  });

  it("wendet für die manuelle Bedienung die wirksame Plant-Betriebsart an", () => {
    const range = allowedTemperatureRange({
      mode: "heat_cool",
      plantMode: "cool",
      entityMin: 16,
      entityMax: 30,
      outsideTemperature: 35,
      config
    });
    expect(range).toMatchObject({ min: 22, max: 30, effectiveMode: "cool" });
  });

  it("rundet Sollwerte in 0,5-K-Schritten", () => {
    const range = allowedTemperatureRange({
      mode: "cool",
      entityMin: 16,
      entityMax: 30,
      outsideTemperature: 34,
      config
    });
    expect(clampTemperature(27.24, range)).toBe(27);
    expect(clampTemperature(27.26, range)).toBe(27.5);
  });

  it("animiert Kühlen nur bei einem Sollwert unter der Isttemperatur", () => {
    expect(
      temperatureDemandAction({
        mode: "cool",
        currentTemperature: 27,
        targetTemperature: 25
      })
    ).toBe("cooling");
    expect(
      temperatureDemandAction({
        mode: "cool",
        currentTemperature: 25,
        targetTemperature: 25
      })
    ).toBe("idle");
    expect(
      temperatureDemandAction({
        mode: "cool",
        currentTemperature: 24.5,
        targetTemperature: 25
      })
    ).toBe("idle");
  });

  it("animiert Heizen nur bei einer Isttemperatur unter dem Sollwert", () => {
    expect(
      temperatureDemandAction({
        mode: "heat",
        currentTemperature: 20,
        targetTemperature: 21
      })
    ).toBe("heating");
    expect(
      temperatureDemandAction({
        mode: "heat",
        currentTemperature: 21,
        targetTemperature: 21
      })
    ).toBe("idle");
    expect(
      temperatureDemandAction({
        mode: "heat",
        currentTemperature: 22,
        targetTemperature: 21
      })
    ).toBe("idle");
  });

  it("animiert bei einer Sperre auch bei Temperaturbedarf nicht", () => {
    expect(
      temperatureDemandAction({
        mode: "cool",
        currentTemperature: 28,
        targetTemperature: 25,
        controlsBlocked: true
      })
    ).toBe("idle");
    expect(
      temperatureDemandAction({
        mode: "heat",
        currentTemperature: 19,
        targetTemperature: 21,
        controlsBlocked: true
      })
    ).toBe("idle");
  });

  it("verwendet im Automatikmodus die Plant-Betriebsart", () => {
    expect(
      temperatureDemandAction({
        mode: "heat_cool",
        plantMode: "cool",
        currentTemperature: 27,
        targetTemperature: 25
      })
    ).toBe("cooling");
    expect(
      temperatureDemandAction({
        mode: "heat_cool",
        plantMode: "heat",
        currentTemperature: 20,
        targetTemperature: 21
      })
    ).toBe("heating");
  });

  it("zeigt Kühlen nur während des berechneten Kühlbedarfs", () => {
    expect(demandModeDisplay("cool", "cooling")).toEqual({
      label: "Kühlen",
      icon: "mdi:snowflake"
    });
    expect(demandModeDisplay("cool", "idle")).toEqual({
      label: "Lüften",
      icon: "mdi:snowflake"
    });
  });

  it("zeigt Heizen nur während des berechneten Heizbedarfs", () => {
    expect(demandModeDisplay("heat", "heating")).toEqual({
      label: "Heizen",
      icon: "mdi:fire"
    });
    expect(demandModeDisplay("heat", "idle")).toEqual({
      label: "Lüften",
      icon: "mdi:fire"
    });
  });
});
