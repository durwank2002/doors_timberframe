# Security & Data Integrity Policy (`security.md`) - TimberCraft

## 1. Static Web Application Threat Landscape
Static client-side React single-page applications (SPAs) are inherently immune to server-side SQL injection or remote code execution vulnerabilities. However, client-facing risk factors remain and must be strictly handled:
1. Cross-Site Scripting (XSS) via unescaped string injection.
2. LocalStorage schema tampering or overflow.
3. Open Redirect or Phishing via manipulated WhatsApp / External links.
4. Supply chain security in client-side dependencies.

## 2. Defensive Engineering Practices
### 2.1 Input Validation & Numeric Sanitization
* All custom dimension controls (height, width, wall thickness) enforce strict lower and upper bounds defined in `src/utils/constants.js`.
* User input fields for Request for Quote (RFQ) pass regex verification:
  - Phone numbers are validated against standard international dialing patterns.
  - Names and message bodies undergo strip-tag sanitization to block script payloads.

### 2.2 LocalStorage Integrity
* LocalStorage readers implement defensive JSON parsing inside `try...catch` wrappers.
* Should localStorage contain corrupted JSON or unexpected keys, the client resets to default initial states (`[]` or `{}`) rather than throwing runtime exceptions.
* No sensitive credentials or customer PII are persisted to client storage.

### 2.3 WhatsApp Link Safety
* WhatsApp outgoing messages are constructed using `encodeURIComponent` ensuring that special characters, line breaks, and quotation symbols cannot break URL parameters or execute external schemes.
* Outgoing links include `rel="noopener noreferrer"` attributes to prevent tab-nabbing vulnerabilities.

### 2.4 Future Backend Integration Guidelines (`[BACKEND]`)
When adding a backend:
* Enforce JWT authentication with HTTP-only cookies.
* Apply rate limiting (e.g. 10 requests per minute per IP for the RFQ endpoint).
* Use server-side recalculation of total prices to prevent client-side cart price tampering.
