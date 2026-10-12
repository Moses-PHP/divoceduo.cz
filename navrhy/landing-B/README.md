# Handoff: Divoce – landing page (varianta B, Split)

## Overview
Jednostránkový web dua **Divoce**. Hlavní cíl je prodat vstupenky na první koncert „Divoce aneb Holky na tahu“ (sobota 31. 10., od 20 hodin, Music Club Žlutý pes, Ke koupališti 62, Pardubice).
Vstupenky: https://www.smsticket.cz/vstupenky/75161-divoce-aneb-holky-na-tahu-pardubice-music-club-zluty-pes-pardubice

## About the Design Files
`Divoce Landing B.dc.html` je **návrh vytvořený v HTML**, referenční prototyp, ne produkční kód. Stránku postav znovu ve zvoleném stacku (doporučujeme statický web, např. Astro nebo čisté HTML/CSS). Náhled otevřeš v prohlížeči, vedle souboru musí ležet `support.js`.

## Fidelity
**High-fidelity.** Texty `[Placeholder]` jsou zástupné. Výchozí téma je světlé, tmavé jde přepnout tlačítkem.

## Layout (shora dolů)
Responzivní hodnoty `clamp(min, X cqi, max)`, kde `cqi` je % šířky kontejneru (lze nahradit `vw`).

1. **Hero split**: grid `repeat(auto-fit, minmax(min(100%,420px),1fr))`, min. výška `clamp(640px,62cqi,900px)`. Na mobilu se zalomí do jednoho sloupce (text nahoře, fotka pod ním).
   - **Levý sloupec**: flex column `space-between`, gap 48px, padding `clamp(24px,4cqi,56px)`:
     - Horní řádek: „Divoce duo“ vlevo a přepínač tématu vpravo (pill, border 1px `line`, padding 8px 14px). 14px, uppercase, letter-spacing 0.24em.
     - Logo (`divoce-logo-vinova.svg` ve světlé, `divoce-logo.svg` v tmavé), šířka `min(100%,520px)`.
     - Blok s datem: horní linka 1px `line`, padding-top 22px, grid `auto 1fr`. „31. 10.“ (`clamp(48px,6cqi,84px)`, 600, extra-condensed) · „sobota od 20 hodin“ (20px italic, extra-condensed) · na samostatném řádku „Music Club Žlutý pes · Ke koupališti 62, Pardubice“ (14px, uppercase, letter-spacing 0.28em).
     - CTA „Koupit vstupenku →“: padding 20px 34px, pozadí `cta`, text `ctaInk`, 16px, 600, uppercase, letter-spacing 0.2em, hranaté rohy. Otevírá se v nové kartě.
   - **Pravý sloupec**: fotka `divoce-duo.jpg` přes celou výšku, `object-fit: cover`, `object-position: 50% 62%`, min. výška 520px.
2. **Info**: grid `repeat(auto-fit, minmax(min(100%,300px),1fr))`, gap `clamp(28px,4cqi,64px)`, padding `clamp(56px,7cqi,110px)`, horní linka. Tři sloupce: H2 „Divoce aneb Holky na tahu“ (`clamp(40px,5cqi,72px)`, 600, extra-condensed), odstavec o koncertu (placeholder) a odstavec o duu (placeholder), 19px / 1.6.
3. **Footer**: „Divoce duo“ (italic) vlevo, odkazy vpravo (Instagram `https://www.instagram.com/divoceduo`, Facebook `#`, kontakt `#`), 15px, horní linka.

## Interactions
- Odkazy při hoveru `opacity: .8`.
- Přepínač tématu prohodí tokeny i logo.

## Design Tokens
Světlá (výchozí): `bg` #fbf1f4 · `ink` #290203 · `line` rgba(41,2,3,.2) · `cta` #290203 · `ctaInk` #fec3e8
Tmavá: `bg` #290203 · `ink` #fec3e8 · `line` rgba(254,195,232,.22) · `cta` #fec3e8 · `ctaInk` #290203

Font **Noto Serif Display** (Google Fonts, osy `wdth` 62.5–100 a `wght` 300–700, i italic). Nadpisy mají `font-stretch: extra-condensed`.

## Assets
- `assets/divoce-logo-vinova.svg`: logo v křivkách, vínové (#290203)
- `assets/divoce-logo.svg`: logo růžové (#fec3e8)
- `assets/divoce-duo.jpg`: fotka z pódia, 1400×2100. Pro produkci použij originál ve vyšším rozlišení a exportuj do WebP/AVIF.

## Placeholdery k doplnění
Text o koncertu, text o duu, Facebook, kontakt, meta/OG tagy, favicon.
