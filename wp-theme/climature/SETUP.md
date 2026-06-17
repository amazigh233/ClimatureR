# Climature — WordPress-thema · installatie & test

Classic PHP-thema, omgezet vanuit de statische Climature-site. Bevat de home,
"Hoe werken wij", de 3D-energieflow, de zon-sandbox, de verkengame en de
energiescan, plus een nette 404. Navigatie en kernteksten zijn bewerkbaar.

## Vereisten
- WordPress 6.1+ (getest tot 6.5), PHP 7.4+.
- Een lokale WP (Local, XAMPP, Docker, wp-env, …).

## Installeren (≈ 1 minuut)
1. Kopieer de **map `climature/`** (deze map) naar `wp-content/themes/` van je
   WordPress-installatie.
2. Ga naar **Weergave → Thema's** en activeer **Climature**.
3. Bij activatie maakt het thema automatisch aan:
   - de pagina's (Home, Hoe werken wij, Energie in beweging, Speel met de zon,
     Verken, Energiescan), elk met het juiste page-template;
   - **Home** als statische voorpagina;
   - het menu **"Climature hoofdmenu"**, gekoppeld aan de locatie *Hoofdnavigatie*.
4. Ga naar **Instellingen → Permalinks** en klik **Wijzigingen opslaan**
   (zet bij voorkeur op *Berichtnaam*). Dit ververst de rewrite-rules.
5. Open de site — klaar.

## Pagina → template (naslag)
| Pagina | Slug | Template |
|---|---|---|
| Home | `home` | `front-page.php` (statische voorpagina) |
| Hoe werken wij | `hoe-werken-wij` | `page-templates/tmpl-hoe-werken-wij.php` |
| Energie in beweging | `energie-in-beweging` | `page-templates/tmpl-energie-in-beweging.php` |
| Speel met de zon | `speel-met-de-zon` | `page-templates/tmpl-speel-met-de-zon.php` |
| Verken | `verken` | `page-templates/tmpl-verken.php` |
| Energiescan | `energiescan` | `page-templates/tmpl-energiescan.php` |

Maak je een pagina handmatig opnieuw aan, kies dan rechts onder **Paginakenmerken
→ Template** het bijbehorende template.

## Inhoud bewerken
**Weergave → Customizer → "Climature — Inhoud"**:
- **Home — hero**: kicker, titel, introtekst, en de twee CTA-knoppen (tekst + URL).
- **Contactgegevens**: e-mail en telefoon.
- **Footer**: tagline.

Leeg laten = de oorspronkelijke teksten blijven staan (ontwerp blijft identiek).
De navigatie pas je aan via **Weergave → Menu's**.

## Testchecklist
- [ ] Home: de hero-teller telt op naar 4,2; power-map-animaties lopen.
- [ ] Energie in beweging: de 3D-scene laadt (three.js-module). Bij
      *prefers-reduced-motion* toont de fallback-kaartjes i.p.v. de 3D-scene.
- [ ] Speel met de zon: zon slepen, weer/apparaten togglen, meters reageren.
- [ ] Verken: lopen met W A S D / pijltjes, info-labels bij huis/panelen/batterij/zon.
- [ ] Energiescan: 4 stappen → rapport met geanimeerde cijfers en ROI-balk.
- [ ] Menu klopt op alle pagina's; actief item heeft `aria-current`; mobiele
      hamburger-toggle werkt.
- [ ] 404: open een niet-bestaande URL → branded foutpagina.
- [ ] Browserconsole: geen 404's op assets, geen JS-fouten.

## Technische noten
- **3D-energieflow**: `assets/js/energy-flow.js` wordt als `type="module"` geladen en
  importeert three.js relatief uit `assets/vendor/three/three.module.js`. Houd de
  `assets/`-mappenstructuur intact, anders breekt de import.
- **Conditionele assets**: per-pagina CSS/JS wordt alleen op de betreffende template
  ingeladen (zie `functions.php`).
- **Opnieuw provisioneren**: het thema draait de auto-setup één keer (optie
  `climature_provisioned`). Wil je het opnieuw laten draaien, verwijder die optie
  (bijv. via WP-CLI: `wp option delete climature_provisioned`) en heractiveer het thema.
- De interne **"Stijlen"**-designgalerij uit het prototype is bewust niet meegenomen.
- Optioneel: voeg een `screenshot.png` (1200×900) toe voor een themavoorbeeld in
  het beheer.
