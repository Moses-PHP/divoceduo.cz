# Divoce – web

Web dua **Divoce** (Instagram [@divoceduo](https://www.instagram.com/divoceduo)).
Hlavní cíl: prodat vstupenky na první koncert „Divoce aneb Holky na tahu“
(sobota 31. 10. 2026 od 20 h, Music Club Žlutý pes, Ke koupališti 62, Pardubice,
[SMSticket](https://www.smsticket.cz/vstupenky/75161-divoce-aneb-holky-na-tahu-pardubice-music-club-zluty-pes-pardubice)).

## Web

Statická stránka bez buildu: `index.html` (CSS inline) + `assets/`. Vychází z varianty C,
jen světlé téma (tmavé vypuštěno). Vstupné 250 Kč.

- Na počítači (landscape, šířka ≥ 900 px) se logo i karta vstupenky vejdou na první
  obrazovku: hero má výšku `100svh`, logo dostane zbylou výšku (140–440 px).
- `assets/divoce-logo.svg` = vínové logo s `viewBox` souměrným podle slova „Divoce!“
  (podtitulky přesahují do stran), takže vycentrovaný obrázek centruje samotné slovo.

Náhled: otevřít `index.html` v prohlížeči.

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

Text „O nás“, Facebook, kontakt, meta/OG tagy, favicon,
fotka ve vyšším rozlišení.
