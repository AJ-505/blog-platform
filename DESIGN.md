---
name: Editorial Modernism
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#474651'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#777682'
  outline-variant: '#c8c5d3'
  surface-tint: '#5654a8'
  primary: '#1a146b'
  on-primary: '#ffffff'
  primary-container: '#312e81'
  on-primary-container: '#9c9af4'
  inverse-primary: '#c3c0ff'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#4c0031'
  on-tertiary: '#ffffff'
  tertiary-container: '#73004c'
  on-tertiary-container: '#f976bb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#100563'
  on-primary-fixed-variant: '#3e3c8f'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffd8e7'
  tertiary-fixed-dim: '#ffafd3'
  on-tertiary-fixed: '#3d0026'
  on-tertiary-fixed-variant: '#85145a'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  h1:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Noto Serif
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1120px
  gutter: 24px
---

## Brand & Style

This design system is built to balance the intellectual depth of a literary journal with the energy of a contemporary creative studio. The brand personality is **articulate, visionary, and welcoming**. It targets a discerning audience of creators, thinkers, and professionals who value clarity of thought and aesthetic beauty.

The design style utilizes **Modern Minimalism** as its foundation, characterized by generous whitespace and a rigorous grid. To achieve a "fresh and creative" feel, this is layered with **Glassmorphism** for interactive elements and high-energy color blocking. The result is a UI that feels premium and curated, where the content is elevated by a sophisticated digital architecture.

## Colors

The palette avoids the sterile whites of typical minimalism by using a **Warm Cream (#FAF9F6)** base, which reduces eye strain and feels more like premium paper. 

- **Primary:** A **Deep Indigo** provides a sense of authority and depth for key brand moments and primary actions.
- **Secondary:** A **Fresh Teal** is used for success states, interactive highlights, and creative accents, offering a vibrant contrast to the indigo.
- **Pastels:** Soft washes of **Lavender and Mint** are used for background containers and category tags to differentiate content without adding visual noise.
- **Typography:** Deep neutrals (near-black) are used for body text to ensure maximum legibility against the cream background.

## Typography

This design system employs a classic typographic pairing to achieve its premium editorial feel. 

**Noto Serif** is reserved for headlines. Its elegant serifs and varying stroke weights convey a sense of tradition and creative authority. Tighten letter spacing slightly for larger display sizes to maintain a "locked-in" professional look.

**Manrope** is used for all functional and body text. As a refined sans-serif with a modern geometric influence, it ensures that long-form articles remain highly readable across all device sizes. The line height is intentionally generous (1.6) to facilitate a comfortable reading pace.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to preserve the editorial integrity of the blog, centering content within a 1120px max-width container. A 12-column system is used to allow for diverse content modules (e.g., a 2-column sidebar with an 8-column article body).

Spacing follows a strict 8px rhythmic scale. Generous vertical "breathable" space (using `lg` and `xl` tokens) is encouraged between major sections to emphasize the premium, unhurried nature of the platform. Negative space is treated as a first-class design element, not merely an absence of content.

## Elevation & Depth

To maintain a clean and modern appearance, this design system eschews heavy, dark shadows in favor of **Tonal Layering** and **Ambient Depth**.

1.  **Low-Contrast Outlines:** Most containers use a 1px border colored slightly darker than the background (or a very soft indigo) rather than a shadow.
2.  **Soft Ambient Shadows:** When elevation is required (e.g., for hovering cards or dropdown menus), use extra-diffused shadows with a very low opacity (5-8%) tinted with the primary Indigo color. This makes the shadow feel like a natural part of the environment.
3.  **Glassmorphism:** Navigation bars and floating action buttons should use a high-blur (20px+) backdrop filter with a semi-transparent white fill (80% opacity) to create a sense of light and transparency.

## Shapes

The shape language is defined by **Rounded (Value 2)** corners. This specific level of radius (0.5rem base) moves away from the clinical feel of sharp corners while remaining more sophisticated and "premium" than overly bubbly, pill-shaped designs.

- **Standard Elements:** Buttons, input fields, and small chips use the base `0.5rem` radius.
- **Large Containers:** Content cards and feature imagery utilize the `rounded-lg` (1rem) or `rounded-xl` (1.5rem) tokens to create a softer, more inviting frame for creative photography and long-form text.

## Components

- **Buttons:** Primary buttons use a solid Deep Indigo fill with white text. Secondary buttons use a Fresh Teal outline with a subtle Pastel Mint hover state. Transitions should be smooth (200ms) to reinforce the premium feel.
- **Cards:** Cards should have a white background, a very thin soft-indigo border, and a subtle lift effect on hover. Imagery within cards should always use the `rounded-lg` corner radius.
- **Input Fields:** Use a subtle cream-to-white gradient for the background with a 1px border that shifts to Fresh Teal on focus. Labels use the `label-sm` typography token for a structured, architectural look.
- **Chips/Tags:** Used for categorization, these use the pastel accent colors (Lavender/Mint) with a slightly darker version of the hue for the text. No borders.
- **Progressive Disclosure:** Use clean, minimalist icons for accordions and dropdowns. Icons should have a consistent 2px stroke weight to match the refined weight of the Manrope typeface.
- **Article Progress Bar:** A thin Fresh Teal line at the top of the viewport that tracks reading progress, providing a subtle functional delight for the user.