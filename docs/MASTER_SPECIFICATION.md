# TimberCraft Doors & Wooden Frames - Comprehensive Master Specification

> **Document Classification**: Unified System & Architecture Specification  
> **Status**: Approved & Production Ready  
> **Includes Modules**: `PRD.md`, `ARCHITECH.md`, `DESIGN.md`, `SECURITY.md`  
> **Architecture Standard**: Static-First, Zero-Hardcoding, SonarQube Clean Architecture

---

## Table of Contents
1. [Module 1: Product Requirements Document (PRD)](#module-1-product-requirements-document-prd)
   - 1.1 Distinct Dual Sections (Wooden Doors vs Door Side Frames)
   - 1.2 Target Audience & User Personas
   - 1.3 Core Features & Functional Requirements
   - 1.4 Non-Functional Requirements
   - 1.5 Dynamic Price Calculation Engine Rules
   - 1.6 Static-to-Backend Transition Blueprint (`[API_ENDPOINT]` / `[BACKEND]`)
2. [Module 2: Technical Architecture (`ARCHITECH.md`)](#module-2-technical-architecture-architechmd)
   - 2.1 Technology Stack & Placeholders
   - 2.2 Component Hierarchy & Directory Architecture
   - 2.3 State Management & Data Flow Architecture
   - 2.4 SonarQube Clean Code & Maintainability Guardrails
3. [Module 3: UI/UX Design System Specification (`DESIGN.md`)](#module-3-uiux-design-system-specification-designmd)
   - 3.1 Design Philosophy: Architectural Luxury & Tactile Timber
   - 3.2 Color Palette, Typography & Spacing Tokens
   - 3.3 Visual Hierarchy & Interactive States
4. [Module 4: Security & Compliance Specification (`SECURITY.md`)](#module-4-security--compliance-specification-securitymd)
   - 4.1 Threat Model for Static Web Applications
   - 4.2 Client-Side Input Sanitization & Validation
   - 4.3 Content Security Policy (CSP) & Secure Headers

---

# Module 1: Product Requirements Document (PRD)

### 1.1 Distinct Dual Sections: Wooden Doors vs. Door Side Frames (Choukaths)
TimberCraft explicitly segments its catalog into two specialized, top-level sections:
1. **🚪 Wooden Doors Section (`itemType: 'door'`)**:
   - Focuses on handcrafted solid timber door shutters and leaves.
   - Highlights: Villa Sunburst doors with floral glass sidelights, Royal Ganesha & peacock carved double doors, Deepalakshmi lamp-bearer sacred doors, Shri Kalash temple shutters, Model 0406 arched raised panels, MPT temple bell doors, and sliding barn doors.
2. **🖼️ Door Side Frames (Choukaths) Section (`itemType: 'frame'`)**:
   - Focuses strictly on solid wood door frames, architraves, and jambs.
   - Highlights: Om (ॐ) & elephant carved temple frames, Gaja Lakshmi & peacock carved choukaths, AK-982 spiral ribbon & lotus carved side jambs, and heavy 5"x4" double rebate Honne frames.
   - Metrics include: Running feet (Rft), cross-section profiles, and rebate styles (single rebate vs. double rebate for mosquito safety doors).

### 1.2 Target Audience & Personas
* **Homeowners & Villa Builders**: Need high-resolution tactile visuals, realistic room context visualizers, and transparent pricing estimates.
* **Architects & Interior Designers**: Need technical specifications (core construction, acoustic ratings, running feet of frames, CAD/dimension sheets).
* **Contractors & Carpenters**: Require custom size quotation generators, frame rebate options (single/double rebate), and instant WhatsApp estimate sharing.

### 1.3 Dynamic Price Calculation Engine Rules
$$\text{Total Price} = \left(\text{Area (sq.ft)} \times \text{Base Wood Rate}\right) + \text{Carving Premium} + \text{Finish Premium} + \text{Frame Total} + \text{Hardware Total}$$
Where Frame Total is:
$$\text{Frame Running Feet} = \frac{(2 \times \text{Height}) + \text{Width}}{12}$$
$$\text{Frame Total} = \text{Frame Running Feet} \times \text{Frame Profile Rate}$$

### 1.4 Static-to-Backend Transition Blueprint
When migrating to a backend:
* `[API_ENDPOINT]/api/v1/products?type=door`: Returns door items.
* `[API_ENDPOINT]/api/v1/products?type=frame`: Returns frame items.
* `[API_ENDPOINT]/api/v1/quotes`: Submits custom configured specifications.
