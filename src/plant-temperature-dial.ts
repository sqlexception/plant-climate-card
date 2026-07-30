import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { clampTemperature, roundToStep } from "./logic";
import type { HVACMode, TemperatureRange } from "./types";

@customElement("plant-temperature-dial")
export class PlantTemperatureDial extends LitElement {
  @property({ type: String }) name = "";
  @property({ type: Number }) currentTemperature?: number;
  @property({ type: Number }) targetTemperature?: number;
  @property({ type: Number }) humidity?: number;
  @property({ type: String }) mode: HVACMode = "off";
  @property({ type: String }) action = "off";
  @property({ type: String }) statusLabel = "Aus";
  @property({ type: String }) statusIcon = "mdi:power-standby";
  @property({ attribute: false }) range: TemperatureRange = {
    min: 16,
    max: 30,
    step: 0.5,
    effectiveMode: "off"
  };
  @property({ type: Boolean }) disabled = false;

  @state() private selectedTemperature?: number;
  @state() private dragging = false;
  private activePointer?: number;

  protected override willUpdate(changed: Map<string, unknown>): void {
    if (
      !this.dragging &&
      (changed.has("targetTemperature") || changed.has("range"))
    ) {
      this.selectedTemperature =
        this.targetTemperature === undefined
          ? undefined
          : clampTemperature(this.targetTemperature, this.range);
    }
  }

  protected override render() {
    const target = this.selectedTemperature ?? this.targetTemperature;
    const pointerAngle =
      target === undefined ? 150 : this.temperatureToAngle(target);
    const interactive = !this.disabled && this.mode !== "off" && this.mode !== "fan_only";
    const classes = [
      this.mode,
      this.action,
      this.dragging ? "dragging" : "",
      interactive ? "interactive" : "disabled"
    ].join(" ");

    return html`
      <div class="screen ${classes}">
        <div class="glow"></div>
        <div
          class="handle"
          role="slider"
          aria-label="Solltemperatur"
          aria-valuemin=${this.range.min}
          aria-valuemax=${this.range.max}
          aria-valuenow=${target ?? this.range.min}
          aria-disabled=${interactive ? "false" : "true"}
          tabindex=${interactive ? "0" : "-1"}
          @keydown=${this.onKeyDown}
        >
          <svg class="scale" viewBox="0 0 120 120" aria-hidden="true">
            <path
              stroke-width="1"
              stroke="rgb(70 70 70)"
              stroke-dasharray="2"
              fill="none"
              d="M60 4 a 52 52 0 0 1 0 115 a 52 52 0 0 1 0 -115"
            ></path>
          </svg>

          <div class="name">${this.name}</div>

          <div class="current">
            ${this.currentTemperature === undefined
              ? html`<span class="unknown">--</span>`
              : html`${this.formatTemperature(this.currentTemperature)}<span class="degree">°</span>`}
          </div>

          <div class="status">
            <ha-icon .icon=${this.statusIcon}></ha-icon>
            <span>${this.statusLabel}</span>
          </div>

          <div class="humidity">
            ${this.humidity === undefined
              ? nothing
              : html`<ha-icon icon="mdi:water-percent"></ha-icon
                  ><span>${Math.round(this.humidity)} %</span>`}
          </div>

          <div
            class="touch-layer"
            style=${`--pointer-angle:${pointerAngle}deg;--counter-angle:${-pointerAngle}deg`}
            @pointerdown=${this.onPointerDown}
            @pointermove=${this.onPointerMove}
            @pointerup=${this.onPointerUp}
            @pointercancel=${this.onPointerCancel}
          >
            ${this.mode === "off" || this.mode === "fan_only" || target === undefined
              ? nothing
              : html`
                  <div class="pointer">
                    <div class="pointer-value">${this.formatTemperature(target)}</div>
                    <div class="pointer-dot"></div>
                  </div>
                `}
          </div>
        </div>
      </div>
    `;
  }

  private onPointerDown(event: PointerEvent): void {
    if (this.disabled || this.mode === "off" || this.mode === "fan_only") return;
    const layer = event.currentTarget as HTMLElement;
    this.activePointer = event.pointerId;
    this.dragging = true;
    layer.setPointerCapture(event.pointerId);
    this.updateFromPointer(event, layer);
  }

  private onPointerMove(event: PointerEvent): void {
    if (!this.dragging || event.pointerId !== this.activePointer) return;
    this.updateFromPointer(event, event.currentTarget as HTMLElement);
  }

  private onPointerUp(event: PointerEvent): void {
    if (event.pointerId !== this.activePointer) return;
    const layer = event.currentTarget as HTMLElement;
    this.updateFromPointer(event, layer);
    if (layer.hasPointerCapture(event.pointerId)) {
      layer.releasePointerCapture(event.pointerId);
    }
    this.finishSelection();
  }

  private onPointerCancel(event: PointerEvent): void {
    if (event.pointerId !== this.activePointer) return;
    this.dragging = false;
    this.activePointer = undefined;
    this.selectedTemperature = this.targetTemperature;
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.mode === "off" || this.mode === "fan_only") return;
    let delta = 0;
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      delta = this.range.step;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      delta = -this.range.step;
    }
    if (delta === 0) return;

    event.preventDefault();
    const current = this.selectedTemperature ?? this.targetTemperature ?? this.range.min;
    this.selectedTemperature = clampTemperature(current + delta, this.range);
    this.dispatchTemperature();
  }

  private updateFromPointer(event: PointerEvent, layer: HTMLElement): void {
    event.preventDefault();
    const rect = layer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const raw = (Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180) / Math.PI;
    let angle = raw < 0 ? raw + 360 : raw;

    if (angle > 45 && angle < 150) {
      angle = angle < 97.5 ? 45 : 150;
    }

    const arcPosition = angle >= 150 ? angle - 150 : 210 + angle;
    const ratio = Math.min(1, Math.max(0, arcPosition / 255));
    const value = this.range.min + ratio * (this.range.max - this.range.min);
    this.selectedTemperature = clampTemperature(
      roundToStep(value, this.range.step, this.range.min),
      this.range
    );
  }

  private finishSelection(): void {
    this.dragging = false;
    this.activePointer = undefined;
    this.dispatchTemperature();
  }

  private dispatchTemperature(): void {
    if (this.selectedTemperature === undefined) return;
    this.dispatchEvent(
      new CustomEvent("temperature-changed", {
        detail: { temperature: this.selectedTemperature },
        bubbles: true,
        composed: true
      })
    );
  }

  private temperatureToAngle(temperature: number): number {
    if (this.range.max <= this.range.min) return 150;
    const ratio =
      (clampTemperature(temperature, this.range) - this.range.min) /
      (this.range.max - this.range.min);
    return 150 + ratio * 255;
  }

  private formatTemperature(value: number): string {
    return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
  }

  static override styles = css`
    :host {
      display: block;
      --heat-color: var(--plant-climate-heat-color, #ef5350);
      --cool-color: var(--plant-climate-cool-color, #07b9ff);
      --off-color: var(--plant-climate-off-color, #cccccc);
    }

    .screen {
      position: relative;
      height: 222px;
      overflow: visible;
      display: grid;
      place-items: center;
    }

    .glow,
    .handle {
      position: absolute;
      width: 194px;
      height: 194px;
      border-radius: 50%;
    }

    .glow {
      background: rgba(100, 100, 100, 0.12);
      box-shadow: rgba(0, 0, 0, 0.45) 0 5px 18px -7px;
    }

    .screen.heat .glow {
      border: 1px solid rgb(156 115 0 / 20%);
      background: rgb(255 143 7 / 30%);
      box-shadow: rgb(255 177 0 / 30%) 0 5px 16px -2px;
    }

    .screen.cool .glow,
    .screen.dry .glow {
      border: 1px solid rgb(7 186 255 / 20%);
      background: rgb(7 186 255 / 30%);
      box-shadow: rgb(0 161 255 / 30%) 0 5px 16px -2px;
    }

    .screen.heat.heating .glow {
      animation: heating 3s ease-in-out infinite;
    }

    .screen.cool.cooling .glow {
      animation: cooling 3s ease-in-out infinite;
    }

    .handle {
      width: 184px;
      height: 184px;
      background: linear-gradient(
        0deg,
        rgb(19 19 19) 0%,
        rgb(19 19 19) 49%,
        rgb(25 25 25) 50%
      );
      color: rgb(204 204 204);
      text-align: center;
      outline: none;
    }

    .handle:focus-visible {
      box-shadow: 0 0 0 3px var(--primary-color);
    }

    .scale {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
    }

    .name,
    .current,
    .status,
    .humidity {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 2;
      pointer-events: none;
    }

    .name {
      top: 25px;
      padding: 0 36px;
      overflow: hidden;
      color: rgb(204 204 204 / 36%);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
      font-size: 10px;
      line-height: 1.2;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .current {
      top: 50%;
      transform: translateY(-58%);
      padding-left: 7px;
      font-family: "Oswald", "Arial Narrow", Roboto, sans-serif;
      font-size: 57px;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }

    .current .degree {
      display: inline-block;
      margin-left: 2px;
      transform: translateY(-23px);
      font-size: 28px;
    }

    .current .unknown {
      opacity: 0.45;
    }

    .status {
      bottom: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-family: "Oswald", "Arial Narrow", Roboto, sans-serif;
      font-size: 15px;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .status ha-icon {
      width: 18px;
      height: 18px;
      --mdc-icon-size: 18px;
    }

    .screen.heat .status {
      color: var(--heat-color);
    }

    .screen.cool .status,
    .screen.dry .status {
      color: var(--cool-color);
    }

    .screen.off .status {
      color: var(--off-color);
      opacity: 0.52;
    }

    .humidity {
      bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      color: rgb(202 202 202 / 62%);
      font-size: 12px;
    }

    .humidity ha-icon {
      width: 14px;
      height: 14px;
      --mdc-icon-size: 14px;
    }

    .touch-layer {
      position: absolute;
      inset: 0;
      z-index: 4;
      border-radius: 50%;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }

    .screen.interactive .touch-layer {
      cursor: grab;
    }

    .screen.dragging .touch-layer {
      cursor: grabbing;
    }

    .pointer {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 30px;
      margin-top: -15px;
      transform: rotate(var(--pointer-angle));
      transform-origin: center left;
      pointer-events: none;
    }

    .pointer-dot {
      width: 9px;
      height: 9px;
      margin: 10px 4px 0 auto;
      border-radius: 50%;
      background: rgb(154 40 40);
      transition: width 150ms ease, height 150ms ease, box-shadow 150ms ease;
    }

    .dragging .pointer-dot {
      width: 13px;
      height: 13px;
      margin-top: 8px;
      background: rgb(255 0 0);
      box-shadow: 0 0 6px 1px red;
    }

    .pointer-value {
      position: absolute;
      right: 18px;
      top: 2px;
      font-family: Roboto, sans-serif;
      font-size: 10px;
      font-variant-numeric: tabular-nums;
      transform: rotate(var(--counter-angle));
      transform-origin: center;
    }

    .dragging .pointer-value {
      font-size: 13px;
      font-weight: 600;
    }

    @keyframes heating {
      0%,
      100% {
        background: #ff9007;
        box-shadow: rgb(255 177 0) 0 5px 16px -2px;
      }
      60% {
        background: rgb(255 143 7 / 30%);
        box-shadow: rgb(255 177 0 / 30%) 0 5px 16px -2px;
      }
    }

    @keyframes cooling {
      0%,
      100% {
        background: rgb(7 186 255);
        box-shadow: rgb(0 161 255) 0 5px 16px -2px;
      }
      60% {
        background: rgb(7 186 255 / 30%);
        box-shadow: rgb(0 161 255 / 30%) 0 5px 16px -2px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .glow {
        animation: none !important;
      }
    }
  `;
}
