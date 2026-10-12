# divoceduo.cz – web dua Divoce

Web dua **Divoce** (Instagram [@divoceduo](https://www.instagram.com/divoceduo)).
Hlavní cíl: prodat vstupenky na první koncert „Divoce aneb Holky na tahu“
(sobota 31. 10. 2026 od 20 h, Music Club Žlutý pes, Ke koupališti 62, Pardubice,
[SMSticket](https://www.smsticket.cz/vstupenky/75161-divoce-aneb-holky-na-tahu-pardubice-music-club-zluty-pes-pardubice)).

## Web

Statická stránka bez buildu: `index.html` (CSS inline) + `assets/`. Vychází z varianty C,
tmavé téma (prohozené barvy: vínové pozadí, růžové písmo, karta `#561a20`). Vstupné 250 Kč v předprodeji, 300 Kč na místě.

- Na počítači (landscape, šířka ≥ 900 px) se logo i karta vstupenky vejdou na první
  obrazovku: hero má výšku `100svh`, logo dostane zbylou výšku (140–440 px).
- `assets/divoce-logo-ruzova.svg` (na webu) a `assets/divoce-logo.svg` (vínové) = logo
  s `viewBox` souměrným podle slova „Divoce!“ (podtitulky přesahují do stran), takže
  vycentrovaný obrázek centruje samotné slovo.

Náhled: otevřít `index.html` v prohlížeči.

**Veřejně:** https://moses-php.github.io/divoceduo.cz/ – GitHub Pages z větve `master`
(kořen repa, `.nojekyll`). Repo je kvůli Pages veřejné; každý push do `master` se nasadí.
OG meta tagy mají absolutní URL na tuto adresu – při změně domény upravit.

## Návrhy (`navrhy/`)

Handoffy z designu (HTML prototypy, ne produkční kód). Náhled: otevřít `*.dc.html`
v prohlížeči, vedle musí ležet `support.js`.

| Složka | Obsah |
| --- | --- |
| `landing-B/` | varianta B „Split“ – hero rozdělený na text + fotku, světlé/tmavé téma |
| `landing-C/` | varianta C, světlá – karta vstupenky s perforací (cílová dle handoffu) |
| `logo-animace/` | logo v křivkách, animace loga pro sociální sítě, skládání, srovnání fontů |

Varianta A v podkladech (zip „Tři návrhy landing page“) chybí.

Font: Noto Serif Display (extra-condensed), barvy růžová `#fec3e8` + vínová `#290203`.

## Doplnit

„O nás“ složeno z jejich úvodního IG příspěvku (25. 8.), nechat si odsouhlasit.
Facebook a kontakt zatím nejsou. Favicon, fotka ve vyšším rozlišení, případně vlastní doména.
