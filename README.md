# divoceduo.cz – web dua Divoce

Web dua **Divoce** (Instagram [@divoceduo](https://www.instagram.com/divoceduo)).
Web vznikl kvůli prodeji vstupenek na koncert „Divoce! aneb Holky na tahu“
(sobota 31. 10. 2026 od 20 h, Music Club Žlutý pes, Ke koupališti 62, Pardubice,
[SMSticket](https://www.smsticket.cz/vstupenky/75161-divoce-aneb-holky-na-tahu-pardubice-music-club-zluty-pes-pardubice)).
Koncert se odehrál – karta „Koncert · odehráno“ je od 26. 11. 2026 pod blokem nadcházejících
koncertů, s prolínáním 5 úvodních fotek a galerií všech 27 fotek z koncertu.

## Web

Statická stránka bez buildu: `index.html` (CSS inline) + `assets/`. Vychází z varianty C,
tmavé téma (pozadí `#1b0102`, růžové písmo, karta `#391115`). Vstupné bylo 250 Kč v předprodeji, 300 Kč na místě.

- Na počítači (landscape, šířka ≥ 900 px) se logo i karta koncertu vejdou na první
  obrazovku: hero má výšku `100svh`, logo dostane zbylou výšku (140–440 px).
- `assets/divoce-logo-ruzova.svg` (na webu) a `assets/divoce-logo.svg` (vínové) = logo
  s `viewBox` souměrným podle slova „Divoce!“ (podtitulky přesahují do stran), takže
  vycentrovaný obrázek centruje samotné slovo.
- Černobílá fotka se SVG filtrem `#tone` tónuje do palety (stíny = vínová pozadí) a maskou
  přechází do karty. Výřez řídí proměnné `--photo-x/-y/-zoom/-fade` na `.ticket`.

- **Fotka v pozadí úvodní obrazovky**: `assets/pozadi.jpg` (fotka 4 ze Žlutého psa, tónovaná do palety,
  2400 px) v `.hero__bg > .hero__photo`, okraje se rozplývají radiální maskou, dole přechod do další
  sekce. Nastavení v proměnných `--bg-photo-*` na `:root` (viditelnost 8 %, rozmazání 2 px, střed 69 % / 26 %,
  velikost 1, ostrá část 55 %). Ladění posuvníky: `navrhy/ladeni-pozadi.html` (jen lokálně, přes http server).
- **Kde nás uslyšíte** (hero pod logem): karty `.gig` s `data-end` (konec koncertu, ISO s časovou
  zónou) – po skončení se karta sama schová, bez karet se schová celý blok. Nový koncert = zkopírovat
  `<article class="gig">`.
- **Odehráno** (sekce `.past`, nejnovější první): mřížka menších karet `.ticket` (fotka nahoře,
  pod ní štítek, nadpis, řádek datum · místo a tlačítko „Fotky“ obrysem). Karty se v prolínání
  střídají (posun o půl intervalu). Výřez fotky v kartě: `--x/--y` a `--zoom` na `<img>`.
  Atributy karty: `data-dir` (složka fotek), `data-count`, `data-title` (nadpis galerie),
  `data-credit` (autor fotek). Ve složce `01–NN.jpg` (2000 px, bez EXIF), `nahled/` (600 px,
  mřížka galerie) a `uvod/` (1400 px, předem tónované do palety jako filtr `#tone`, prolínají
  se v kartě; výřez `--x/--y` na každém `<img>`). Pořadí: úvodní fotky, pak ostatní podle názvu.
  Galerie = jeden `<dialog>` s mřížkou a prohlížečem (šipky, klávesy, swipe, Esc), plní se podle karty.
  - `assets/koncert-2026-10-31/` – Divoce! aneb Holky na tahu, 27 fotek (5 úvodních), foto Tomáš Kubelka
  - `assets/sestra-2026-10-21/` – Sestra Pardubického kraje 2026, Kino Sirius, 9 fotek (úvodní
    IMG_5636, 5604, 5619), foto Tomáš Karlík (podle EXIF „TOMAS KARLIK“, www.tomaskarlik.com)

Náhled: `python3 -m http.server` v kořeni repa a otevřít http://localhost:8000/
(stačí i otevřít `index.html`).

**Veřejně:** https://divoceduo.cz/ – GitHub Pages z větve `master`
(kořen repa, `.nojekyll`, vlastní doména v `CNAME`; DNS u Active24: 4× A + 4× AAAA na GitHub, `www` CNAME → moses-php.github.io). Repo je kvůli Pages veřejné; každý push do `master` se nasadí.
Změny se proto jen commitují lokálně a pushují až po potvrzení majitelem.
OG meta tagy mají absolutní URL na tuto adresu – při změně domény upravit.

## Návrhy (`navrhy/`, jen lokálně)

Handoffy z designu (HTML prototypy, ne produkční kód). Složka je v `.gitignore`,
aby se pracovní návrhy nepublikovaly přes Pages; drží se jen v lokální kopii. Náhled: otevřít `*.dc.html`
v prohlížeči, vedle musí ležet `support.js`.

| Složka | Obsah |
| --- | --- |
| `landing-B/` | varianta B „Split“ – hero rozdělený na text + fotku, světlé/tmavé téma |
| `landing-C/` | varianta C, světlá – karta vstupenky s perforací (cílová dle handoffu) |
| `logo-animace/` | logo v křivkách, animace loga pro sociální sítě, skládání, srovnání fontů |

Varianta A v podkladech (zip „Tři návrhy landing page“) chybí.

Fonty: Noto Serif Display (nadpisy, extra-condensed) + Noto Serif (drobný text),
barvy růžová `#fec3e8` + vínová `#1b0102`.

## Doplnit

„O nás“ odsouhlaseno: text dodala Adéla 13. 10. 2026. Štítek „První koncert“ zrušen (není to první koncert), nyní „Koncert“.
Kontakt zatím není. Favicon „D!“ z glyfů loga (assets/favicon.svg, favicon.ico, apple-touch-icon.png). Fotka ve vyšším rozlišení, případně vlastní doména.
