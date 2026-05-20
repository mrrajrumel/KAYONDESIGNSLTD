---
name: Structural Precision
colors:
  surface: '#f9f9f7'
  surface-dim: '#dadad8'
  surface-bright: '#f9f9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f1'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#404942'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#707971'
  outline-variant: '#bfc9bf'
  surface-tint: '#296a46'
  primary: '#00341c'
  on-primary: '#ffffff'
  primary-container: '#004d2c'
  on-primary-container: '#7bbd93'
  inverse-primary: '#92d5a9'
  secondary: '#416900'
  on-secondary: '#ffffff'
  secondary-container: '#b7f569'
  on-secondary-container: '#457000'
  tertiary: '#292d2c'
  on-tertiary: '#ffffff'
  tertiary-container: '#3f4342'
  on-tertiary-container: '#acb0ae'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#aef2c4'
  primary-fixed-dim: '#92d5a9'
  on-primary-fixed: '#002110'
  on-primary-fixed-variant: '#085230'
  secondary-fixed: '#b7f569'
  secondary-fixed-dim: '#9cd850'
  on-secondary-fixed: '#102000'
  on-secondary-fixed-variant: '#304f00'
  tertiary-fixed: '#e0e3e1'
  tertiary-fixed-dim: '#c4c7c5'
  on-tertiary-fixed: '#181c1b'
  on-tertiary-fixed-variant: '#434846'
  background: '#f9f9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered for a construction logistics and planning consultancy where reliability and precision are paramount. The brand personality is authoritative yet approachable, reflecting the "buildable, compliant, efficient" core values. It targets high-stakes stakeholdersâdevelopers, contractors, and city plannersâwho require clarity and logistical certainty.

The visual style is **Minimalist and Corporate**, utilizing a high-end architectural aesthetic. It prioritizes information density and legibility through generous whitespace and a rigid, invisible grid. This creates an atmosphere of organized expertise and operational efficiency. Visual interest is generated through crisp lines, strategic use of a signature forest green, and photography that emphasizes the scale and complexity of urban development.

## Colors

The palette is derived directly from the construction environment and corporate heritage. 
- **Primary (Forest Green):** Represents stability, growth, and environmental compliance. It is used for primary branding, key call-to-actions, and structural UI elements.
- **Secondary (Safety Lime):** An accent color used sparingly for high-visibility highlights, success states, and interactive markers, echoing the high-visibility gear of the construction site.
- **Tertiary (Concrete White):** A subtle off-white used for backgrounds to reduce eye strain and provide a sophisticated alternative to pure white.
- **Neutral (Iron):** A range of deep charcoals and greys used for typography and borders, ensuring high contrast and accessibility.

The color mode is strictly **Light**, mimicking the clarity of technical drawings and professional documentation.

## Typography

This design system utilizes **Hanken Grotesk** across all roles to maintain a cohesive, contemporary, and engineered feel. The typefaceâs geometry is sharp and precise, reflecting the meticulous nature of logistics planning.

Headlines use a heavy weight with tight tracking to evoke a sense of strength and "buildable" foundations. Body text is set with ample line height to ensure readability in data-heavy reports or planning documents. Labels are often capitalized and tracked out to provide a distinct hierarchy for metadata and technical specifications.

## Elevation & Depth

To maintain a crisp and professional look, this design system avoids heavy shadows. Instead, hierarchy is established through:

1.  **Low-contrast outlines:** Hairline borders (1px) in a soft neutral shade separate content sections without adding visual bulk.
2.  **Tonal layers:** Using slight variations in background color (e.g., moving from the Tertiary background to a pure white card) to indicate "lift."
3.  **Hard-edged Overlays:** When modals or menus are required, use a very subtle 15% opacity primary-tinted backdrop blur (glassmorphism) rather than a dark scrim, keeping the UI feeling light and airy.

## Shapes

The shape language is primarily **Soft (0.25rem)**. This subtle rounding removes the aggressive "sharpness" of pure brutalism while remaining far more professional and "engineered" than pill-shaped consumer designs. 

Interactive elements like buttons and input fields use a consistent 4px radius. Large container elements like cards may use the `rounded-lg` (8px) setting to create a clear container-child relationship when smaller elements are nested inside.

## Components

- **Buttons:** Primary buttons are solid Forest Green with white Hanken Grotesk Medium text. Secondary buttons use a 1px Forest Green border with no fill.
- **Input Fields:** Minimalist design with a 1px bottom border that transforms into a full 1px box on focus. Labels sit above the field in the `label-sm` style.
- **Cards:** White backgrounds with a 1px border in a light neutral grey. No shadows. Content inside cards should follow the `md` spacing unit (24px) for internal padding.
- **Status Chips:** Small, rectangular indicators with 2px roundedness. Use the Secondary color (Safety Lime) for "Active" or "Compliant" states.
- **Logistics Icons:** Use 1.5pt stroke weight, monolinear icons. Icons should be enclosed in a square frame or left openâavoid circular enclosures to keep the "plan-based" aesthetic.
- **Data Tables:** High-density, utilizing the `body-md` font size with subtle row-striping in the Tertiary color to maintain readability across long logistics schedules.