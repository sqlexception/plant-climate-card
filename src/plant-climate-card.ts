/*! Plant Climate Card
 * Visual design derived from imohsenb/homeassistant-climate-card (MIT).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./plant-temperature-dial";
import {
  actionIcon,
  actionLabel,
  allowedTemperatureRange,
  boolEntityIsOn,
  clampTemperature,
  demandModeDisplay,
  fanIcon,
  finiteNumber,
  inferRoomEnableEntity,
  numericEntityState,
  temperatureDemandAction
} from "./logic";
import type {
  HassEntity,
  HomeAssistant,
  PlantClimateCardConfig,
  TemperatureRange
} from "./types";

const VERSION = "1.6.0";

const formLabels: Record<string, string> = {
  entity: "Climate-Entity",
  name: "Anzeigename",
  global_enable_entity: "Globale Klimafreigabe",
  room_enable_entity: "Raumfreigabe",
  outside_temperature_entity: "Außentemperatur",
  plant_mode_entity: "Plant-Betriebsart",
  controller_state_entity: "Reglerzustand",
  blocking_reason_entity: "Sperrgrund",
  fault_entity: "Störung",
  defrost_entity: "Abtauung",
  window_entity: "Fenster oder Tür offen",
  heat_default: "Heiz-Startwert",
  heat_manual_max: "Heizen manuell maximal",
  cool_auto_default: "Kühl-Startwert mindestens",
  cool_manual_min: "Kühlen manuell mindestens",
  cool_outdoor_delta: "Maximale Differenz zur Außentemperatur",
  temperature_step: "Sollwert-Schrittweite",
  show_fan: "Lüfterstufen anzeigen"
};

@customElement("plant-climate-card")
export class PlantClimateCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config!: PlantClimateCardConfig;
  @state() private pendingTemperature?: number;
  @state() private serviceError?: string;

  static getStubConfig(
    hass?: HomeAssistant,
    entities?: string[]
  ): Partial<PlantClimateCardConfig> {
    const entity =
      entities?.find((candidate) => candidate.startsWith("climate.")) ??
      Object.keys(hass?.states ?? {}).find((candidate) =>
        candidate.startsWith("climate.")
      );
    return entity ? { entity } : {};
  }

  static getConfigForm() {
    return {
      schema: [
        {
          name: "entity",
          required: true,
          selector: { entity: { domain: "climate" } }
        },
        {
          type: "grid",
          name: "",
          flatten: true,
          column_min_width: "220px",
          schema: [
            { name: "name", selector: { text: {} } },
            {
              name: "global_enable_entity",
              selector: { entity: { domain: "input_boolean" } }
            },
            {
              name: "room_enable_entity",
              selector: { entity: { domain: "input_boolean" } }
            },
            {
              name: "outside_temperature_entity",
              selector: { entity: { domain: "sensor" } }
            }
          ]
        },
        {
          type: "expandable",
          title: "Node-RED- und Plant-Zustände",
          name: "",
          flatten: true,
          schema: [
            {
              name: "plant_mode_entity",
              selector: { entity: { domain: "sensor" } }
            },
            {
              name: "controller_state_entity",
              selector: { entity: { domain: "sensor" } }
            },
            {
              name: "blocking_reason_entity",
              selector: { entity: { domain: "sensor" } }
            },
            {
              name: "fault_entity",
              selector: { entity: { domain: "binary_sensor" } }
            },
            {
              name: "defrost_entity",
              selector: { entity: { domain: "binary_sensor" } }
            },
            {
              name: "window_entity",
              selector: { entity: { domain: "binary_sensor" } }
            }
          ]
        },
        {
          type: "expandable",
          title: "Grenzwerte",
          name: "",
          flatten: true,
          schema: [
            {
              type: "grid",
              name: "",
              flatten: true,
              schema: [
                {
                  name: "heat_default",
                  selector: { number: { min: 16, max: 23, step: 0.5, mode: "box" } }
                },
                {
                  name: "heat_manual_max",
                  selector: { number: { min: 16, max: 30, step: 0.5, mode: "box" } }
                },
                {
                  name: "cool_auto_default",
                  selector: { number: { min: 18, max: 30, step: 0.5, mode: "box" } }
                },
                {
                  name: "cool_manual_min",
                  selector: { number: { min: 25, max: 30, step: 0.5, mode: "box" } }
                },
                {
                  name: "cool_outdoor_delta",
                  selector: { number: { min: 1, max: 15, step: 0.5, mode: "box" } }
                },
                {
                  name: "temperature_step",
                  selector: { number: { min: 0.1, max: 1, step: 0.1, mode: "box" } }
                }
              ]
            }
          ]
        },
        {
          type: "grid",
          name: "",
          flatten: true,
          schema: [
            { name: "show_fan", selector: { boolean: {} } }
          ]
        }
      ],
      computeLabel: (schema: { name?: string }) =>
        schema.name ? formLabels[schema.name] : undefined,
      computeHelper: (schema: { name?: string }) => {
        if (schema.name === "outside_temperature_entity") {
          return "Für die 8-K-Regel. Vorläufig der Sensor der Bosch-Außeneinheit.";
        }
        if (schema.name === "room_enable_entity") {
          return "Diese Freigabe ist der Ein-/Aus-Schalter der Card.";
        }
        if (schema.name === "plant_mode_entity") {
          return "Wird nur angezeigt. Die Betriebsart wird nicht von der Card geändert.";
        }
        return undefined;
      },
      assertConfig: (config: Partial<PlantClimateCardConfig>) => {
        if (!config.entity || !config.entity.startsWith("climate.")) {
          throw new Error("Eine Climate-Entity ist erforderlich.");
        }
      }
    };
  }

  setConfig(config: PlantClimateCardConfig): void {
    if (!config?.entity) {
      throw new Error("Eine Climate-Entity ist erforderlich.");
    }
    if (!config.entity.startsWith("climate.")) {
      throw new Error("Die Entity muss aus der Domain climate stammen.");
    }

    this.config = {
      heat_default: 21,
      heat_manual_max: 23,
      cool_auto_default: 25,
      cool_manual_min: 25,
      cool_outdoor_delta: 8,
      temperature_step: 0.5,
      show_fan: true,
      ...config
    };
  }

  getCardSize(): number {
    return 6;
  }

  getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: 6,
      min_rows: 5
    };
  }

  protected override render() {
    if (!this.hass || !this.config) return nothing;

    const climate = this.entity(this.config.entity);
    if (!climate) {
      return html`
        <ha-card>
          <div class="error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            <span>Entity nicht gefunden: ${this.config.entity}</span>
          </div>
        </ha-card>
      `;
    }

    const unavailable =
      climate.state === "unavailable" || climate.state === "unknown";
    const mode = unavailable ? "off" : climate.state;
    const reportedAction =
      climate.attributes.hvac_action === undefined
        ? undefined
        : String(climate.attributes.hvac_action);
    const name =
      this.config.name ??
      String(climate.attributes.friendly_name ?? this.config.entity);
    const currentTemperature = finiteNumber(climate.attributes.current_temperature);
    const actualTarget = finiteNumber(climate.attributes.temperature);
    const targetTemperature = this.pendingTemperature ?? actualTarget;
    const outsideTemperature = numericEntityState(
      this.entity(this.config.outside_temperature_entity)
    );
    const plantMode =
      this.entity(this.config.plant_mode_entity)?.state ?? undefined;
    const controllerState =
      this.entity(this.config.controller_state_entity)?.state ?? undefined;
    const blockingReason =
      this.entity(this.config.blocking_reason_entity)?.state ?? undefined;

    const roomEnableEntity = this.roomEnableEntity();
    const roomEnableState = boolEntityIsOn(this.entity(roomEnableEntity));
    const globalEnableState = boolEntityIsOn(
      this.entity(this.config.global_enable_entity)
    );
    const fault = boolEntityIsOn(this.entity(this.config.fault_entity)) === true;
    const defrost =
      boolEntityIsOn(this.entity(this.config.defrost_entity)) === true;
    const windowOpen =
      boolEntityIsOn(this.entity(this.config.window_entity)) === true;
    const changeover = controllerState === "changeover";

    const controlsBlocked =
      unavailable ||
      roomEnableState === false ||
      globalEnableState === false ||
      fault ||
      windowOpen ||
      changeover;

    // Der Sollwert bleibt auch bei ausgeschalteter oder gesperrter Anlage
    // bedienbar. Nur eine nicht erreichbare Climate-Entity sperrt den Regler.
    const temperatureBlocked = unavailable;

    const visualMode = this.visualMode(mode, reportedAction, plantMode);
    const action = temperatureDemandAction({
      mode,
      plantMode,
      currentTemperature,
      targetTemperature,
      controlsBlocked,
      reportedAction
    });
    const range = this.temperatureRange(
      climate,
      mode,
      plantMode,
      outsideTemperature
    );
    const fanModes = this.stringArray(climate.attributes.fan_modes);
    const fanMode = String(climate.attributes.fan_mode ?? "");
    const dialState = this.dialState({
      mode: visualMode,
      action,
      roomEnableState,
      globalEnableState,
      fault,
      defrost,
      windowOpen,
      changeover,
      blockingReason
    });

    return html`
      <ha-card>
        <div class="card">
          <button
            class="more-info"
            type="button"
            title="Details öffnen"
            aria-label=${`Details für ${name} öffnen`}
            @click=${this.showMoreInfo}
          >
            <ha-icon icon="mdi:dots-vertical"></ha-icon>
          </button>

          <plant-temperature-dial
            .name=${name}
            .currentTemperature=${currentTemperature}
            .targetTemperature=${targetTemperature}
            .outsideTemperature=${outsideTemperature}
            .mode=${visualMode}
            .action=${action}
            .statusLabel=${dialState.label}
            .statusIcon=${dialState.icon}
            .range=${range}
            .disabled=${temperatureBlocked}
            @temperature-changed=${this.onTemperatureChanged}
          ></plant-temperature-dial>

          <div class="bottom-controls ${visualMode}">
            <button
              class="icon-control power ${roomEnableState === true ? "active" : ""}"
              type="button"
              aria-label=${roomEnableState === true
                ? "Klimaanlage manuell ausschalten"
                : "Klimaanlage manuell einschalten"}
              title=${roomEnableEntity
                ? roomEnableState === true
                  ? "Manuell ausschalten"
                  : "Manuell einschalten"
                : "Raumfreigabe fehlt"}
              aria-pressed=${roomEnableState === true ? "true" : "false"}
              ?disabled=${!roomEnableEntity}
              @click=${() => this.toggleRoomEnable(roomEnableEntity)}
            >
              <ha-icon icon="mdi:power-standby"></ha-icon>
            </button>

            ${this.config.show_fan !== false
              ? fanModes.map(
                  (candidate) => html`
                    <button
                      type="button"
                      class="icon-control fan ${candidate === fanMode ? "active" : ""}"
                      title=${this.fanLabel(candidate)}
                      aria-label=${`Lüfter ${this.fanLabel(candidate)}`}
                      aria-pressed=${candidate === fanMode ? "true" : "false"}
                      ?disabled=${controlsBlocked || mode === "off"}
                      @click=${() => this.setFanMode(candidate)}
                    >
                      <ha-icon .icon=${fanIcon(candidate)}></ha-icon>
                    </button>
                  `
                )
              : nothing}
          </div>

          ${this.serviceError
            ? html`
                <div class="service-error">
                  <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                  <span>${this.serviceError}</span>
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private dialState(data: {
    mode: string;
    action: string;
    roomEnableState?: boolean;
    globalEnableState?: boolean;
    fault: boolean;
    defrost: boolean;
    windowOpen: boolean;
    changeover: boolean;
    blockingReason?: string;
  }): { label: string; icon: string } {
    if (data.fault) return { label: "Störung", icon: "mdi:alert-octagon" };
    if (data.defrost) return { label: "Abtauung", icon: "mdi:snowflake-melt" };
    if (data.windowOpen) return { label: "Fenster offen", icon: "mdi:window-open-variant" };
    if (data.changeover) return { label: "Moduswechsel", icon: "mdi:swap-horizontal" };
    if (data.globalEnableState === false) {
      return { label: "Gesperrt", icon: "mdi:home-lock" };
    }
    if (data.roomEnableState === false) {
      return { label: "Gesperrt", icon: "mdi:lock" };
    }
    if (
      data.blockingReason &&
      !["none", "kein", "unknown", "unavailable", ""].includes(
        data.blockingReason.toLowerCase()
      )
    ) {
      return { label: "Gesperrt", icon: "mdi:lock-clock" };
    }
    const demandDisplay = demandModeDisplay(data.mode, data.action);
    if (demandDisplay) return demandDisplay;
    if (data.mode === "dry") {
      return { label: "Entfeuchten", icon: "mdi:water-percent" };
    }
    return {
      label: actionLabel(data.action, data.mode),
      icon: actionIcon(data.action, data.mode)
    };
  }

  private entity(entityId?: string): HassEntity | undefined {
    return entityId ? this.hass?.states[entityId] : undefined;
  }

  private temperatureRange(
    climate: HassEntity,
    mode: string,
    plantMode: string | undefined,
    outsideTemperature: number | undefined
  ): TemperatureRange {
    return allowedTemperatureRange({
      mode,
      plantMode,
      entityMin: finiteNumber(climate.attributes.min_temp) ?? 16,
      entityMax: finiteNumber(climate.attributes.max_temp) ?? 30,
      outsideTemperature,
      config: this.config
    });
  }

  private stringArray(value: unknown): string[] {
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  }

  private roomEnableEntity(): string | undefined {
    if (this.config.room_enable_entity) {
      return this.config.room_enable_entity;
    }

    const inferred = inferRoomEnableEntity(this.config.entity);
    return inferred && this.entity(inferred) ? inferred : undefined;
  }

  private async toggleRoomEnable(roomEnableEntity?: string): Promise<void> {
    if (!this.hass || !roomEnableEntity) return;
    const state = boolEntityIsOn(this.entity(roomEnableEntity));
    await this.callService(
      "input_boolean",
      state === true ? "turn_off" : "turn_on",
      { entity_id: roomEnableEntity }
    );
  }

  private onTemperatureChanged(event: CustomEvent<{ temperature: number }>): void {
    void this.setTemperature(event.detail.temperature);
  }

  private showMoreInfo(): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: this.config.entity },
        bubbles: true,
        composed: true
      })
    );
  }

  private async setTemperature(temperature: number): Promise<void> {
    const climate = this.entity(this.config.entity);
    if (!climate) return;
    const outsideTemperature = numericEntityState(
      this.entity(this.config.outside_temperature_entity)
    );
    const range = this.temperatureRange(
      climate,
      climate.state,
      this.entity(this.config.plant_mode_entity)?.state,
      outsideTemperature
    );
    const safeTemperature = clampTemperature(temperature, range);
    this.pendingTemperature = safeTemperature;
    const successful = await this.callService("climate", "set_temperature", {
      entity_id: this.config.entity,
      temperature: safeTemperature
    });
    if (!successful) {
      this.pendingTemperature = undefined;
      return;
    }

    window.setTimeout(() => {
      this.pendingTemperature = undefined;
    }, 2500);
  }

  private async setFanMode(fanMode: string): Promise<void> {
    await this.callService("climate", "set_fan_mode", {
      entity_id: this.config.entity,
      fan_mode: fanMode
    });
  }

  private async callService(
    domain: string,
    service: string,
    data: Record<string, unknown>
  ): Promise<boolean> {
    if (!this.hass) return false;
    this.serviceError = undefined;
    try {
      await this.hass.callService(domain, service, data);
      return true;
    } catch (error) {
      this.serviceError =
        error instanceof Error ? error.message : "Befehl konnte nicht gesendet werden.";
      return false;
    }
  }

  private fanLabel(mode: string): string {
    const labels: Record<string, string> = {
      auto: "Auto",
      low: "Niedrig",
      medium: "Mittel",
      high: "Hoch",
      turbo: "Turbo"
    };
    return labels[mode.toLowerCase()] ?? mode;
  }

  private visualMode(
    mode: string,
    action: string | undefined,
    plantMode?: string
  ): string {
    if (action === "heating") return "heat";
    if (action === "cooling") return "cool";
    if ((mode === "heat_cool" || mode === "auto") && plantMode) {
      return plantMode;
    }
    return mode;
  }

  static override styles = css`
    :host {
      display: block;
      --heat-color: var(--plant-climate-heat-color, #ef5350);
      --cool-color: var(--plant-climate-cool-color, #07b9ff);
      --off-color: var(--plant-climate-off-color, #cccccc);
      --control-background: color-mix(
        in srgb,
        var(--primary-text-color) 8%,
        transparent
      );
    }

    ha-card {
      overflow: hidden;
      background: var(--plant-climate-card-background, rgb(28 29 31));
      box-shadow:
        inset 0 1px 0 rgb(255 255 255 / 2%),
        var(--ha-card-box-shadow, 0 2px 6px rgb(0 0 0 / 35%));
    }

    .card {
      position: relative;
      min-height: 280px;
      padding: 0 14px;
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }

    button {
      border: 0;
      color: var(--primary-text-color);
      font: inherit;
    }

    button:not(:disabled) {
      cursor: pointer;
    }

    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .more-info {
      position: absolute;
      z-index: 3;
      top: 8px;
      right: 7px;
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: transparent;
      color: rgb(204 204 204);
      opacity: 0.78;
      transition:
        background 140ms ease,
        color 140ms ease,
        opacity 140ms ease;
    }

    .more-info:hover,
    .more-info:focus-visible {
      background: rgb(255 255 255 / 6%);
      color: rgb(238 238 238);
      opacity: 1;
    }

    .more-info ha-icon {
      width: 24px;
      height: 24px;
      --mdc-icon-size: 24px;
    }

    .bottom-controls {
      min-height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
      margin: 0 auto;
    }

    .icon-control {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: rgb(27 28 30);
      box-shadow:
        inset 0 1px 1px rgb(255 255 255 / 3%),
        rgb(0 0 0 / 82%) 0 0 4px 0;
      color: rgb(204 204 204);
      transition:
        color 140ms ease,
        box-shadow 140ms ease,
        opacity 140ms ease,
        transform 140ms ease;
    }

    .icon-control:not(:disabled):active {
      transform: translateY(1px);
    }

    .icon-control:disabled {
      cursor: default;
      opacity: 0.34;
    }

    .icon-control ha-icon {
      width: 22px;
      height: 22px;
      --mdc-icon-size: 22px;
    }

    .icon-control.active {
      box-shadow: rgb(0 0 0 / 82%) 0 0 7px -2px;
    }

    .icon-control.power.active {
      color: var(--off-color);
    }

    .bottom-controls.heat .icon-control.fan.active {
      color: var(--heat-color);
    }

    .bottom-controls.cool .icon-control.fan.active,
    .bottom-controls.dry .icon-control.fan.active {
      color: var(--cool-color);
    }

    .service-error {
      min-height: 30px;
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: 7px;
      border-radius: 7px;
      padding: 0 9px;
      background: color-mix(
        in srgb,
        var(--warning-color, #ff9800) 12%,
        transparent
      );
      color: var(--warning-color, #ff9800);
      font-size: 11px;
    }

    .service-error {
      background: color-mix(
        in srgb,
        var(--error-color, #db4437) 12%,
        transparent
      );
      color: var(--error-color, #db4437);
    }

    .service-error ha-icon {
      width: 17px;
      height: 17px;
      --mdc-icon-size: 17px;
    }

    .error {
      min-height: 80px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px;
      color: var(--error-color, #db4437);
    }

  `;
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "plant-climate-card",
  name: "Plant Climate Card",
  description:
    "Plant-bewusste Klimakarte mit Node-RED-Freigaben und Bosch-Grenzwerten",
  preview: true,
  getEntitySuggestion: (_hass: HomeAssistant, entityId: string) => {
    if (!entityId.startsWith("climate.")) return null;
    return {
      config: {
        type: "custom:plant-climate-card",
        entity: entityId
      }
    };
  }
});

console.info(
  `%c PLANT-CLIMATE-CARD %c ${VERSION} `,
  "color:white;background:#111;padding:3px 5px;font-weight:700",
  "color:#07b9ff;background:#111;padding:3px 5px"
);
