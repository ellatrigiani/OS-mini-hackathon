# What Should I Do in London Right Now?

## Overview

A single-page web application that generates random London activity suggestions. Users can select from three modes (Chill, Adventurous, Culture) and receive curated suggestions with Google Maps integration and fun London twist modifiers.

## Features

- **90 Curated Suggestions**: 30 unique activities per mode (Chill, Adventurous, Culture)
- **Three Activity Modes**:
  - ☕ **Chill** - Relaxing, low-energy activities (parks, gardens, quiet spots)
  - 🚶‍♂️ **Adventurous** - Exciting, high-energy activities (hikes, markets, urban exploration)
  - 🏛️ **Culture** - Museums, galleries, and cultural sites
- **London Twist Modifier**: 30% chance to append a London-specific phrase to suggestions
- **Google Maps Integration**: Each suggestion includes a link to Google Maps
- **Confetti Celebration**: Pure JavaScript + CSS confetti animation when suggestions appear
- **Keyboard Accessibility**:
  - Enter/Space: Generate new suggestion
  - 1: Switch to Chill mode
  - 2: Switch to Adventurous mode
  - 3: Switch to Culture mode
- **Repeat Avoidance**: Tracks last 3 suggestions to prevent repetition
- **Responsive Design**: Works on mobile and desktop
- **Reduced Motion Support**: Respects user accessibility preferences

## Tech Stack

- **HTML5**: Semantic, accessible markup
- **CSS3**: Custom properties, glassmorphism, animations, fallback gradients
- **Vanilla JavaScript**: ES6+, IIFE pattern, no dependencies

## Project Structure

```
/
├── index.html    (51 lines)
├── styles.css    (620 lines)
└── script.js     (878 lines)
```

All three files in one folder - runs locally by opening index.html in any modern browser. No build tools, server, or external dependencies required.

## Getting Started

1. Open `index.html` in any modern web browser
2. Click "GIVE ME A PLAN" or press Enter/Space
3. Select a mode (Chill, Adventurous, Culture) or press 1/2/3

## Code Organization

### JavaScript (script.js)
- IIFE pattern to avoid global scope pollution
- Constants at top (TWIST_CHANCE, MAX_HISTORY, THINKING_DURATION_MS)
- Suggestions database organized by mode
- Helper functions (getRandomItem, getLondonTwist, createConfetti)
- Core functions (showThinking, showSuggestion, generateSuggestion, switchMode)
- Event listeners for button clicks and keyboard shortcuts

### CSS (styles.css)
- CSS custom properties for theming
- Mobile-first responsive design with media queries
- Glassmorphism design with backdrop-filter
- Smooth animations and transitions
- Reduced motion support via `@media (prefers-reduced-motion)`

### HTML (index.html)
- Semantic structure (header, footer, grouping)
- Accessible buttons with data-mode attributes
- Proper ARIA labels for accessibility
- Clean, minimal markup

## Key Implementation Details

**Suggestion Selection Logic**
- Filters out recently shown suggestions (max 3 in history)
- Randomly selects from available suggestions
- Resets history if all suggestions exhausted

**Thinking State**
- Shows animated loading message (800-1200ms)
- Displays playful London-themed messages
- Smooth fade transition

**London Twist**
- 30% probability to append a London-specific phrase
- Examples: "End with a flat white", "Mind the gap", "Avoid Oxford Circus at all costs"

**Confetti Animation**
- Pure JavaScript creation of DOM elements
- CSS animations falling from top of screen
- 30 particles with random colors and sizes
- Auto-removal after animation completes

## Accessibility

- Keyboard navigation support (Enter/Space/1/2/3)
- ARIA labels on buttons
- Respects `prefers-reduced-motion` preference
- Semantic HTML structure
- High contrast colors
- Responsive touch-friendly buttons

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No external libraries or APIs required.

## Design Notes

- **Background**: Animated gradient (dark blue to purple)
- **Glassmorphism**: Blur effects with transparent backgrounds
- **Typography**: Large, bold headings for impact
- **Colors**: Theme colors for each mode (green/pink/blue)
- **Animations**: Smooth hover states, fade transitions, confetti celebration

## Performance

- Runs entirely offline
- Fast loading (no external dependencies)
- Efficient JavaScript with minimal DOM manipulation
- CSS animations use GPU-accelerated properties

---

**Built for vibes. Powered by London.** ☕🚶‍♂️🏛️