# Product Requirements Document (PRD) - TimberCraft Custom Doors

## 1. Vision & Purpose
TimberCraft is an interactive digital catalog and custom wooden door & side frame (choukath) configurator designed to bridge traditional handcrafted carpentry with modern luxury e-commerce.

## 2. Distinct Dual Architecture: Doors vs. Side Frames
The platform features two distinct primary product sections:
1. **🚪 Wooden Doors Section**:
   - Focuses strictly on door shutters and leaves.
   - Models include: Modern Villa Sunburst Doors with glass sidelights, Royal Ganesha & Peacock Double Doors, Deepalakshmi Sanctum Doors, Shri Kalash Temple Doors, Model 0406 Arched Raised Panel Doors, MPT Series Pooja Doors with temple bells, and Minimalist Fluted Doors.
2. **🖼️ Door Side Frames (Choukaths) Section**:
   - Focuses strictly on solid wood door frames, architraves, and jambs.
   - Models include: Om (ॐ) & Gajendra Elephants Carved Frames, Gaja Lakshmi & Peacock Carved Temple Frames, AK-982 Spiral Braid & Lotus Carved Side Frame Jambs, and Solid Honne Wood Double Rebate Choukaths.
   - Metrics include: Running Feet (Rft), cross-section profiles (5"x4", 5"x3", 4"x2.5"), and single vs. double rebate options (for mosquito mesh safety doors).

## 3. Key Feature Specifications
* **Section Switcher**:
  - Prominent dual-mode selector in the main navigation and catalog header to switch between "Wooden Doors" and "Door Side Frames (Choukaths)".
* **Interactive Dynamic Configurator**:
  - Live dimension entry in inches/feet with automatic surface area calculation ($sq. ft$).
  - Wood species selector (Burma Teak, African Teak, Honne, Red Meranti, White Oak, American Walnut).
  - Wooden Frame (Choukath) cross-section selector with single/double rebate.
  - Real-time dynamic price calculation update.
* **Product Detail & Gallery**:
  - High-resolution multi-view image gallery.
  - Interactive hover magnifier zoom & full-screen preview lightbox.
  - Room Visualizer backdrop switcher with model selector.
* **Wishlist & Cart Management**:
  - Synchronized via localStorage with persistent state.
* **Quotation & Direct Communication**:
  - Direct WhatsApp enquiry button with pre-formatted custom quotation spec string.
  - Request For Quote (RFQ) modal with instant itemized PDF/Print summary.

## 4. Static-to-Backend Transition Hooks
* Product Data: Currently loaded from `src/data/products.js` (`itemType: 'door'` and `itemType: 'frame'`). Future backend hook: `[API_ENDPOINT]/api/v1/products?type={door|frame}`.
* Quote Submission: Currently handled locally + WhatsApp. Future backend hook: `[API_ENDPOINT]/api/v1/quotes`.
