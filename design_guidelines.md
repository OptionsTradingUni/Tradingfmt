# Design Guidelines: Screenshot Generator Platform

## Design Approach
**Selected Approach:** Design System (Material Design) with custom Discord/trading platform mimicry

**Justification:** This is a utility-focused tool requiring efficient workflows and clear form interactions. The generated outputs need pixel-perfect recreation of Discord and trading platforms, while the generator interface should prioritize usability and speed.

## Core Design Elements

### A. Typography
- **Primary Font:** Inter or Roboto (Google Fonts)
- **Headers:** Font weight 600-700, sizes: text-3xl (main), text-xl (sections)
- **Body Text:** Font weight 400, text-base for forms and labels
- **Generated Screenshots:** Match Discord (Whitney/Noto Sans) and trading platform fonts exactly

### B. Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8 (e.g., p-4, m-6, gap-8)

**Primary Layout:**
- Two-column desktop layout (40% controls / 60% preview)
- Single column mobile (controls above preview)
- Container max-width: max-w-7xl with px-6 padding

### C. Component Library

**Navigation:**
- Top horizontal bar with logo/title on left
- Generator mode tabs (Discord | Trading) as pill-style toggle
- Minimal, compact header (h-16)

**Form Controls:**
- Grouped input sections with labels above fields
- Text inputs with border focus states
- Select dropdowns for template/platform selection
- Number inputs for profits/percentages with increment controls
- Date/time pickers for timestamps
- Color pickers for accent customization
- Clear visual grouping with section dividers (space-y-6 between groups)

**Preview Area:**
- Sticky preview panel that follows scroll on desktop
- Live preview updates as user types
- Screenshot rendered at actual size within scrollable container
- Download button prominently placed below preview

**Generator Templates:**

*Discord Testimonials:*
- Username input with avatar uploader/preset selector
- Message text area (expandable)
- Mention tags with @ autocomplete
- Timestamp customization
- Reaction emoji selector
- Server name/channel customization
- Background theme toggle (dark/light Discord themes)

*Trading Screenshots:*
- Platform template selector (multiple brokerage styles)
- Account type dropdown (Roth IRA, Individual, etc.)
- Profit/loss figure input with currency formatting
- Percentage gain input
- Date range selector
- Account balance fields
- Trade detail fields (symbols, quantities, etc.)

**Action Buttons:**
- Primary CTA: "Download PNG" (prominent, full-width in mobile)
- Secondary: "Randomize" to generate variations
- Tertiary: "Reset" to clear all fields

### D. Responsive Behavior
- **Desktop (lg):** Side-by-side controls and preview
- **Tablet (md):** Stacked with controls first, sticky preview
- **Mobile:** Fully stacked, preview follows controls

## Images
No hero images needed. This is a tool interface. The "images" are the generated screenshots themselves which are rendered programmatically based on user inputs.

## Key UX Principles
1. **Instant Feedback:** Preview updates in real-time as users type
2. **Presets:** Provide example templates users can customize
3. **Download Simplicity:** One-click PNG export prominently placed
4. **Randomization:** "Randomize" button to generate unique variations quickly
5. **Form Organization:** Logical grouping (User Settings, Content, Appearance, Export)
6. **Validation:** Inline validation for required fields and number constraints

## Layout Structure
```
┌─────────────────────────────────────┐
│ Header: Generator Mode Toggle       │
├─────────────┬───────────────────────┤
│             │                       │
│  Controls   │    Live Preview       │
│  Panel      │    (Sticky)          │
│  (Scrolls)  │                      │
│             │   [Download Button]   │
│             │                       │
└─────────────┴───────────────────────┘
```

## Critical Implementation Notes
- Generated screenshots must pixel-perfectly match Discord's design system and trading platform UIs
- Use CSS to recreate Discord's exact border radius, spacing, and elevation styles
- Trading screenshots should support multiple platform aesthetics (modern fintech apps, traditional brokerage interfaces)
- Ensure generated images are high-DPI (2x resolution) for clarity