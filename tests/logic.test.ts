import { describe, expect, it } from "vitest";
import {
  allowedTemperatureRange,
  automaticTarget,
  clampTemperature,
  coolingManualMinimum
} from "../src/logic";
import type { PlantClimateCardConfig } from "../src/types";

const config: PlantClimateCardConfig = {
  type: "custom:plant-climate-card",
  entity: "climate.test"
};

describe("Plant-Klimagrenzen", () => {
  it("verwendet für den automatischen Kühlstart mindestens 25 °C", () => {
    expect(automaticTarget("cool", 29, config)).toBe(25);
    expect(automaticTarget("cool", 38, config)).toBe(30);
  });

  it("begrenzt manuelles Kühlen auf mindestens 23 °C und außen minus 8 K", () => {
    expect(coolingManualMinimum(29)).toBe(23);
    expect(coolingManualMinimum(34)).toBe(26);
  });

  it("begrenzt manuelles Heizen auf 23 °C", () => {
    const range = allowedTemperatureRange({
      mode: "heat",
      entityMin: 16,
      entityMax: 30,
      config
    });
    expect(range).toMatchObject({ min: 16, max: 23, effectiveMode: "heat" });
    expect(clampTemperature(25, range)).toBe(23);
  });

  it("wendet im Automatikmodus die wirksame Plant-Betriebsart an", () => {
    const range = allowedTemperatureRange({
      mode: "heat_cool",
      plantMode: "cool",
      entityMin: 16,
      entityMax: 30,
      outsideTemperature: 35,
      config
    });
    expect(range).toMatchObject({ min: 27, max: 30, effectiveMode: "cool" });
  });

  it("rundet Sollwerte in 0,5-K-Schritten", () => {
    const range = allowedTemperatureRange({
      mode: "cool",
      entityMin: 16,
      entityMax: 30,
      outsideTemperature: 29,
      config
    });
    expect(clampTemperature(24.24, range)).toBe(24);
    expect(clampTemperature(24.26, range)).toBe(24.5);
  });
});
