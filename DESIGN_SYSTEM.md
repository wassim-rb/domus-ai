# Domus-AI — Design tokens

Single source of truth. Any new code in this repo must use these values.

## Colors

### Surfaces (warm near-black)
| Token | Value |
|---|---|
| `--bg` | `#0d0d0b` |
| `--bg-alt` | `#111110` |
| `--bg-surface` | `#181816` |
| `--bg-elevated` | `#1f1f1c` |

### Text (warm cream)
| Token | Value |
|---|---|
| `--text` | `#f0ead8` |
| `--text-muted` | `#8c857a` |
| `--text-dim` | `#4a4742` |

### Accent — gold
| Token | Value |
|---|---|
| `--gold` | `#c8922a` |
| `--gold-light` | `#dfb05a` |
| `--gold-pale` | `rgba(200, 146, 42, 0.12)` |
| `--gold-border` | `rgba(200, 146, 42, 0.35)` |

### Borders
| Token | Value |
|---|---|
| `--border` | `rgba(240, 234, 216, 0.07)` |
| `--border-mid` | `rgba(240, 234, 216, 0.12)` |

## Typography

- **Display:** `DM Serif Display` — italic variant used only in gold accent phrases.
- **Body + UI:** `DM Sans` — weights 300, 400, 500, 600. Body is 300.
- **Labels, meta, kickers:** `IBM Plex Mono` — weights 300, 400, 500. Size 0.65–0.72rem, letter-spacing 0.08–0.14em, uppercase. Kicker prefix: `// `.

## Radii, shadows, motion

- **Radius:** `2px` on every card/button/input. **Only the logo mark uses `14px`.**
- **Shadows:** rare. Soft `0 20px 60px rgba(0,0,0,0.22)` on hero proof cards. Gold glow `0 8px 30px rgba(200,146,42,0.2)` on primary CTA hover.
- **Ease:** `cubic-bezier(0.16, 1, 0.3, 1)`.

## Voice

- French. `vous` to reader, `je` as founder. Never `nous`.
- Never emoji.
- "collaborateurs" — never "négociateurs."
- Concrete over abstract: lead with a scene, then the capability.

## Iconography

Inline SVG, `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"`, round caps/joins. No icon library.
