# Plant Climate Card

Eine kompakte Home-Assistant-Klimakarte für eine gemeinsame Multi-Split-Plant mit Node-RED-Regelung.

Die Optik basiert auf der runden Climate Card von
[imohsenb/homeassistant-climate-card](https://github.com/imohsenb/homeassistant-climate-card).
Kreis, zweigeteilte dunkle Oberfläche, Sollwertpunkt, Typografie, Heiz- und
Kühlfarben sowie die Zustandsanimationen wurden übernommen. Die Bedienung wurde
für aktuelle Home-Assistant-Versionen und Touch-Geräte neu umgesetzt.

## Was die Karte bedient

- Power-Icon: schaltet ausschließlich die Raumfreigabe
- runder Sollwertregler: sendet einen begrenzten Temperaturwunsch
- Lüfter-Icons: Auto, Niedrig, Mittel, Hoch und Turbo, soweit von der
  Climate-Entity angeboten
- Drei-Punkte-Schaltfläche: öffnet die normale Home-Assistant-Detailansicht
  der Climate-Entity mit Verlauf und Aktionen

Die Betriebsart wird nur angezeigt. Die Karte sendet niemals
`climate.set_hvac_mode`.

Der Power-Button wird immer angezeigt. Fehlt `room_enable_entity` in der
Kartenkonfiguration, ermittelt die Karte die Raumfreigabe automatisch aus dem
vereinbarten Namensschema:

```text
climate.<raum>_klimaanlage_inneneinheit
→ input_boolean.<raum>_klimaanlage_01_freigabe
```

## Integrierte Grenzen

- Heiz-Startwert: 21 °C
- manuelles Heizen: maximal 22 °C
- automatischer Kühl-Startwert:
  `max(25 °C, Außentemperatur - 8 K)`
- manuelles Kühlen über die Karte: mindestens 23 °C
- Sollwert-Schrittweite: 1 K

Die Karte begrenzt die Eingabe bereits in der Oberfläche. Node-RED muss dieselben
Grenzen weiterhin verbindlich prüfen.

## Zuständigkeiten

| Funktion | Zuständig |
|---|---|
| Raumfreigabe | Home Assistant über `input_boolean` |
| Temperatur- und Lüfterwunsch | Karte über die Climate-Entity |
| Betriebsart `heat`, `cool` oder `off` | ausschließlich Node-RED |
| Startwerte und Lüfter-Reset auf Auto | Node-RED beim Einschalten oder Moduswechsel |
| Anti-Takt, Mindestlaufzeit und Mindestauszeit | Node-RED |
| Istzustand | Bosch-Inneneinheit über ESPHome |

Die verlinkte `homeassistant-generic-climate`-Integration wird nicht benötigt.
Sie würde selbst Heiz- und Kühlausgänge regeln und damit eine zweite
Regelinstanz neben Node-RED erzeugen.

## Installation

1. `plant-climate-card.js` nach
   `/srv/homeautomation/homeassistant/config/www/plant-climate-card/plant-climate-card.js`
   kopieren.
2. In Home Assistant unter **Einstellungen → Dashboards → Ressourcen** ergänzen:

   ```text
   /local/plant-climate-card/plant-climate-card.js?v=1.7.0
   ```

   Ressourcentyp: **JavaScript-Modul**

3. Für die originale schmale Temperaturtypografie zusätzlich diese Ressource
   anlegen:

   ```text
   https://fonts.googleapis.com/css2?family=Oswald:wght@400&display=swap
   ```

   Ressourcentyp: **Stylesheet**

   Bei einer Installation über HACS wird die JavaScript-Ressource automatisch
   angelegt. Die Oswald-Stylesheet-Ressource muss einmal manuell ergänzt werden.

4. Browser beziehungsweise Home-Assistant-App vollständig neu laden.
5. Im Dashboard `Benutzerdefiniert: Plant Climate Card` auswählen oder die
   fertige YAML aus `examples/dashboard.yaml` verwenden.

## Minimale Konfiguration

```yaml
type: custom:plant-climate-card
entity: climate.eg_kuechenbereich_klimaanlage_inneneinheit
name: EG Küchenbereich
room_enable_entity: input_boolean.eg_kuechenbereich_klimaanlage_01_freigabe
outside_temperature_entity: sensor.eg_kuechenbereich_klimaanlage_aussentemperatur
```

Im grafischen Karteneditor werden bewusst nur die für die normale Bedienung
benötigten Felder angezeigt. Die frühere globale Klimafreigabe und die
Node-RED-/Plant-Zustände sind dort entfernt.

## Verhalten

- Das Power-Icon ist der manuelle Ein-/Aus-Schalter des Raums. Es setzt die
  Raumfreigabe, worauf Node-RED die Inneneinheit passend ein- oder ausschaltet.
- Die drei Punkte oben rechts öffnen Home Assistants normale Detailansicht der
  jeweiligen Climate-Entity. Dort stehen Verlauf, Aktionen und das
  Home-Assistant-Menü zur Verfügung.
- Die Raumfreigabe wird automatisch aus dem Entity-Namen erkannt. Eine
  ausdrücklich konfigurierte `room_enable_entity` hat Vorrang.
- Bei ausgeschalteter Raumfreigabe steht im Kreis `Gesperrt`. Die
  Lüfterbedienung bleibt gesperrt, der Sollwert kann aber weiterhin für den
  nächsten Start eingestellt werden.
- Auch wenn die Climate-Entity selbst auf `off` steht, bleibt der
  Sollwertregler bedienbar. Ist `plant_mode_entity` per YAML konfiguriert,
  gelten dabei weiterhin die passenden Heiz- beziehungsweise Kühlgrenzen.
- Nur wenn die Climate-Entity `unknown` oder `unavailable` ist, wird auch die
  Sollwertbedienung deaktiviert.
- Der Raumname wird im Kreis hell und gut lesbar angezeigt.
- Unter dem Betriebsstatus zeigt die Karte ausschließlich den Messwert der
  konfigurierten Außentemperatur mit Einheit, ohne Textlabel.
- Isttemperatur, Außentemperatur und Sollwert werden in der Karte als ganze
  Zahlen dargestellt.
- Der Sollwertregler arbeitet standardmäßig in 1-K-Schritten.
- Die Zahl am roten Sollwertpunkt wird nur während des Ziehens angezeigt und
  verschwindet nach dem Loslassen wieder.
- Da die Bosch-Climate-Entity kein `hvac_action` liefert, berechnet die Karte
  den Bedarf aus Ist- und Solltemperatur. Im Kühlbetrieb pulsiert der Ring bei
  `Soll < Ist`, im Heizbetrieb bei `Ist < Soll`.
- Während der Ring pulsiert, steht im Kreis `Kühlen` beziehungsweise `Heizen`.
  Ohne Temperaturbedarf bleibt der Leuchtring ruhig und die Anzeige wechselt
  auf `Lüften`. Schneeflocke beziehungsweise Flamme zeigen weiterhin den
  gewählten Grundmodus.
- Bei einer Sperre bleibt der Leuchtring ruhig und die Anzeige zeigt
  `Gesperrt`.
- Die Sollwertbedienung verwendet Pointer Events und funktioniert damit mit
  Maus, Touch und Stift.
- Die Reglerposition verwendet unabhängig vom Betriebsmodus immer dieselbe feste
  visuelle Skala von 18 bis 30 °C. Heiz- und Kühlgrenzen begrenzen nur den
  auswählbaren Sollwert, nicht die Position der Temperaturskala.

## Optionale Zustands-Entities

Die folgenden Felder werden im grafischen Karteneditor nicht mehr angezeigt.
Bestehende YAML-Konfigurationen bleiben aus Kompatibilitätsgründen unterstützt:

```yaml
global_enable_entity: input_boolean.haus_klimaregelung_01_freigabe
plant_mode_entity: sensor.aussen_garten_klimaaussengeraet_01_betriebsart
controller_state_entity: sensor.aussen_garten_klimaaussengeraet_01_reglerzustand
blocking_reason_entity: sensor.aussen_garten_klimaaussengeraet_01_sperrgrund
fault_entity: binary_sensor.aussen_garten_klimaaussengeraet_01_stoerung
defrost_entity: binary_sensor.aussen_garten_klimaaussengeraet_01_abtauung
window_entity: binary_sensor.eg_kuechenbereich_fenster_01_offen
```

## Lizenz und Herkunft

MIT. Der visuelle Ausgangsentwurf stammt aus
`imohsenb/homeassistant-climate-card`, ebenfalls MIT-lizenziert.
