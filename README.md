# Mario Schubert × CarVia

Eine filmische Bewerbungs-Microsite für die Position **Filmmaker / Content Creator Video** bei CarVia. Die Seite verbindet ausgewählte Automotive- und Premium-Arbeiten, eine konkrete YouTube-Formatidee, Arbeitsweise, aktualisierte Vita und eine druckfreundliche CV-Ansicht.

## Lokal starten

```bash
npm install
npm run dev
```

Produktionsprüfung:

```bash
npm run lint
npm run build
npm run preview
```

Die Hauptseite läuft unter `/`, der korrigierte Lebenslauf unter `/cv` und das Anschreiben unter `/anschreiben`. Beide Dokumentansichten bieten eine Druckfunktion und einen direkten Download der final geprüften PDFs.

## Deployment auf Vercel

Das Projekt ist als Vite SPA vorkonfiguriert. In Vercel genügt der Import des Repositories; Build Command und Output Directory werden automatisch als `npm run build` und `dist` erkannt. `vercel.json` stellt sicher, dass `/cv` direkt aufrufbar bleibt.

## Medien und Quellen

Alle Web-Medien werden lokal aus `public/media` ausgeliefert; es gibt keine Bild-Hotlinks und kein Tracking.

- Automotive-Film und Bildmaterial: WYLDWORKS / Mario Schubert
- Aston Martin Vantage, Aston Martin Ulm, Hollfelder Juwelier: WYLDWORKS / Mario Schubert
- Maserati Grecale Barbie Event, Aston Martin DBX 707, ADAC GT4 Germany und The Honourables: lokale Vorschaubilder aus dem kuratierten WYLDWORKS-Portfolio; die externen Player werden erst nach einem Klick geladen
- Mario-Porträt: marioschub.com / Mario Schubert

Die Seite ist eine persönliche Bewerbung und keine offizielle CarVia-Webseite. Marken- und Fahrzeugnamen dienen der Einordnung der gezeigten Referenzen.

## Accessibility und Performance

- semantische Seitenstruktur, Skip-Link und sichtbare Tastatur-Fokuszustände
- lokales Autoplay-Video mit Poster, Pause/Play und Reduced-Motion-Fallback
- responsive Layouts für Desktop, Tablet und Mobile
- lokale variable Schriften über npm
- lokale OpenGraph-Vorschau und Favicon

## Projektstruktur

```text
public/media/   lokale Fotos, Poster und Video
public/documents/ finaler CV und finales Anschreiben als PDF
src/App.tsx     Bewerbung und CV-Ansicht
src/styles.css  Art Direction, Responsive- und Print-Styles
screenshots/    QA-Screenshots für Desktop und Mobile
vercel.json     SPA-Rewrite für direkte Routen
```
