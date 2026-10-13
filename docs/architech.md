# Architecture Specification (`architech.md`) - TimberCraft

## 1. System Overview
TimberCraft is designed with a static-first, modular component architecture ensuring zero vendor lock-in, ultra-fast initial load times, zero hardcoded magic numbers, and SonarQube-compliant code maintainability.

## 2. Technology Stack & Placeholders
* **UI Library**: React.js 18.x (`[REACT_VERSION]`)
* **Styling**: Tailwind CSS 3.4.x (`[STYLING_LIBRARY]`)
* **Icons**: `lucide-react`
* **State Management**: React Context + Custom LocalStorage Hooks (`[STATE_MANAGEMENT]`)
* **Data Layer**: Centralized Static Data Modules (`src/data/`)

## 3. Directory & File Architecture
```
doors_website/
├── docs/                     # PRD, Architecture, Design, Security
├── public/                   # Static assets, SVG icons, imagery
├── src/
│   ├── assets/               # Texture svgs, decorative assets
│   ├── components/
│   │   ├── common/           # Atoms: Button, Modal, Badge, Tooltip, Input, Select
│   │   ├── layout/           # Header, Navbar, Footer, MobileNav, Banner
│   │   ├── catalog/          # ProductCard, CatalogGrid, FilterSidebar, SearchBar
│   │   ├── configurator/     # DoorConfigurator, DimensionInputs, FrameSelector
│   │   ├── gallery/          # ImageGallery, LensZoom, LightboxModal
│   │   ├── visualizer/       # RoomVisualizer, BackdropSwitcher
│   │   ├── cart/             # CartDrawer, CartItem, OrderSummary
│   │   └── enquiry/          # QuotationModal, WhatsAppButton
│   ├── context/              # CartContext, WishlistContext, ToastContext
│   ├── data/                 # products.js, woods.js, frames.js, finishes.js
│   ├── hooks/                # useLocalStorage.js, usePriceCalculator.js, useDebounce.js
│   ├── utils/                # constants.js, formatters.js, validators.js, whatsapp.js
│   ├── App.jsx               # Main Application Orchestrator
│   ├── main.jsx              # DOM Mount
│   └── index.css             # Tailwind Directives & Custom Utility Layers
```

## 4. SonarQube & Clean Code Principles
1. **Zero Magic Numbers**: Minimum/maximum door dimensions, tax percentages, and standard door sizes are declared in `src/utils/constants.js`.
2. **Deterministic Pure Calculations**: Price formulas are isolated inside pure testable functions in `src/utils/formatters.js` and `src/hooks/usePriceCalculator.js`.
3. **No Deep Component Nesting**: Strict separation between Container/Organisms and Reusable Atoms.
4. **Resilient Error Boundaries**: Graceful fallback UI for image rendering failures or malformed inputs.
5. **Clear Backend Integration Points**: Readily structured to replace local mocks with `[API_ENDPOINT]` without rewriting UI components.
