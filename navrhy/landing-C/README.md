# Handoff: Divoce – landing page (varianta C, světlá)

## Overview
Jednostránkový web dua **Divoce**. Hlavní cíl je prodat vstupenky na první koncert „Divoce aneb Holky na tahu“ (sobota 31. 10., od 20 hodin, Music Club Žlutý pes, Ke koupališti 62, Pardubice).
Odkaz na vstupenky: https://www.smsticket.cz/vstupenky/75161-divoce-aneb-holky-na-tahu-pardubice-music-club-zluty-pes-pardubice

## About the Design Files
`Divoce Landing C.dc.html` je **návrh vytvořený v HTML**. Je to referenční prototyp, který ukazuje vzhled a chování, ne produkční kód. Stránku postav znovu ve zvoleném stacku. Pokud projekt ještě neexistuje, doporučujeme statický web (Astro nebo čisté HTML/CSS), protože jde o jednu stránku bez backendu.
Náhled: soubor otevři v prohlížeči (vedle něj musí ležet `support.js`). Šablona používá `{{ }}` díry a třídu `Component`, která nastavuje téma.

## Fidelity
**High-fidelity.** Barvy, typografie, rozvržení i odkazy jsou finální. Texty označené `[Placeholder]` jsou zatím zástupné.
Cílová varianta je **světlá** (`theme = 'light'`). Tmavou variantu je možné ponechat jako přepínač (viz níže), ale není nutná.

## Layout (shora dolů)
Kořen: celá šířka, `container-type: inline-size`. Responzivní hodnoty jsou psané jako `clamp(min, X cqi, max)`, kde `cqi` je % šířky kontejneru (lze nahradit `vw`).

1. **Header**: flex, `space-between`, padding `22px clamp(20px,4cqi,56px)`. Vlevo odkaz `@divoceduo` (Instagram), vpravo přepínač tématu (text „Tmavá“ / „Světlá“). 14px, uppercase, letter-spacing 0.24em.
2. **Hero** (flex column, střed, gap `clamp(32px,4cqi,56px)`, padding dole `clamp(64px,8cqi,120px)`):
   - **Logo**: `assets/divoce-logo-vinova.svg` (ve světlé verzi), šířka `clamp(280px,46cqi,640px)`.
   - **Karta vstupenky**: max. šířka 1040px, `border-radius: 18px`, overflow hidden, pozadí `#fff8fb`, text `#290203`. Grid `repeat(auto-fit, minmax(min(100%,320px),1fr))`, takže na úzkých displejích se zalomí do jednoho sloupce.
     - Vlevo **fotka** `assets/divoce-duo.jpg`, `object-fit: cover`, `object-position: 50% 64%`, min. výška 360px.
     - Vpravo **obsah**, padding `clamp(24px,3.4cqi,44px)`, levý okraj `2px dashed #290203` (perforace vstupenky). Flex column `space-between`, gap 28px:
       - Štítek „První koncert“ (13px, uppercase, letter-spacing 0.3em)
       - H1 „Divoce aneb Holky na tahu“ (`clamp(40px,5cqi,64px)`, weight 600, extra-condensed, line-height 0.95, `text-wrap: balance`)
       - `dl` grid `auto 1fr`, column-gap 22px, row-gap 10px, 18px: **Kdy:** „sobota 31. 10. od 20 hodin“ (600) · **Kde:** „Music Club Žlutý pes / Ke koupališti 62, Pardubice“ · **Vstupné:** „[Placeholder] 000 Kč“. Popisky (`dt`) jsou italic a extra-condensed.
       - **CTA** „Koupit vstupenku →“: celá šířka, flex `space-between`, padding `20px 26px`, pozadí `#290203`, text `#fff8fb`, 16px, weight 600, uppercase, letter-spacing 0.2em, `border-radius: 999px`. Otevírá SMSticket v nové kartě (`target="_blank" rel="noopener"`).
3. **O nás**: střed, padding `clamp(56px,7cqi,110px)`, horní linka 1px `rgba(41,2,3,.2)`. Štítek „O nás“ a odstavec `clamp(26px,3.2cqi,40px)`, italic, extra-condensed, line-height 1.2, max. šířka 760px (placeholder).
4. **Footer**: odkazy na střed (Instagram `https://www.instagram.com/divoceduo`, Facebook `#`, kontakt `#`), gap 28px, 15px, letter-spacing 0.08em, horní linka 1px.

## Interactions
- Odkazy při hoveru `opacity: .8`.
- Přepínač tématu prohodí sadu tokenů (viz níže) a logo (vínové ↔ růžové). Volitelné: uložit volbu do `localStorage` nebo respektovat `prefers-color-scheme`.

## Design Tokens
Světlá (cílová):
- `bg` #fec3e8 (růžová z loga)
- `ink` #290203 (vínová)
- `line` rgba(41,2,3,.2)
- `card` #fff8fb
- `cardInk` #290203

Tmavá (volitelná):
- `bg` #0e0e0e
- `ink` #fec3e8
- `line` rgba(254,195,232,.2)
- `card` #fec3e8
- `cardInk` #290203
- logo `divoce-logo.svg` (růžové)

Typografie: **Noto Serif Display** (Google Fonts, osy `wdth` 62.5–100 a `wght` 300–700, včetně italic). Nadpisy a popisky používají `font-stretch: extra-condensed` (wdth 62.5). Uppercase štítky mají regular řez a velký letter-spacing.
Radiusy: karta 18px, tlačítko 999px.

## Assets
- `assets/divoce-logo-vinova.svg`: logo v křivkách, vínové (#290203), pro světlou verzi
- `assets/divoce-logo.svg`: stejné logo, růžové (#fec3e8), pro tmavou verzi
- `assets/divoce-duo.jpg`: černobílá fotka dua z pódia, 1400×2100, vytažená z plakátu. Pro produkci použij originál ve vyšším rozlišení a exportuj ho do WebP/AVIF.

## Placeholdery k doplnění
Cena vstupného, text „O nás“, URL Facebooku, kontakt. Dále meta tagy (title, description, OG obrázek) a favicon.

## Files
- `Divoce Landing C.dc.html`: návrh (téma `light`)
- `support.js`: runtime potřebný jen k otevření náhledu
- `assets/`: logo a fotka
