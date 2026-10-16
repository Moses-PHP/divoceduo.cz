# divoceduo.cz – web dua Divoce

Web dua **Divoce** (Instagram [@divoceduo](https://www.instagram.com/divoceduo)).
Hlavní cíl: prodat vstupenky na koncert „Divoce! aneb Holky na tahu“
(sobota 31. 10. 2026 od 20 h, Music Club Žlutý pes, Ke koupališti 62, Pardubice,
[SMSticket](https://www.smsticket.cz/vstupenky/75161-divoce-aneb-holky-na-tahu-pardubice-music-club-zluty-pes-pardubice)).

## Web

Statická stránka bez buildu: `index.html` (CSS inline) + `assets/`. Vychází z varianty C,
tmavé téma (pozadí `#1b0102`, růžové písmo, karta `#391115`). Vstupné 250 Kč v předprodeji, 300 Kč na místě.

- Na počítači (landscape, šířka ≥ 900 px) se logo i karta vstupenky vejdou na první
  obrazovku: hero má výšku `100svh`, logo dostane zbylou výšku (140–440 px).
- `assets/divoce-logo-ruzova.svg` (na webu) a `assets/divoce-logo.svg` (vínové) = logo
  s `viewBox` souměrným podle slova „Divoce!“ (podtitulky přesahují do stran), takže
  vycentrovaný obrázek centruje samotné slovo.
- Černobílá fotka se SVG filtrem `#tone` tónuje do palety (stíny = vínová pozadí) a maskou
  přechází do karty. Výřez řídí proměnné `--photo-x/-y/-zoom/-fade` na `.ticket`.

Náhled: otevřít `index.html` v prohlížeči.

**Veřejně:** https://moses-php.github.io/divoceduo.cz/ – GitHub Pages z větve `master`
(kořen repa, `.nojekyll`). Repo je kvůli Pages veřejné; každý push do `master` se nasadí.
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
