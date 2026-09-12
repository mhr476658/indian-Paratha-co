# Security Policy & Hardening Guidelines

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

---

## Security Architecture & Defense-in-Depth

The Indian Paratha Company platform implements comprehensive security controls across all architectural tiers:

### 1. API Protection & Rate Limiting
- **Adaptive In-Memory Rate Limiting**: Enforces rate limiting per client IP across all `/api` routes (150 requests/min).
- **Sensitive Endpoint Throttling**: Limits order creation and franchise partner lead submissions to 20 requests/minute.
- **Brute-force & Credential Stuffing Prevention**: Authentication endpoints enforce a maximum of 5 attempts per 15-minute window with IP lockout.

### 2. Injection & Prototype Pollution Defense
- **Input Sanitization**: All user inputs (names, phone numbers, emails, vehicle numbers, notes, order items) undergo strict type verification, string length clipping, tag stripping, and control character elimination.
- **Prototype Pollution Shield**: Recursive filtering strips `__proto__`, `constructor`, and `prototype` keys from all JSON and URL-encoded request payloads.
- **Strict Typing & Bounds Checking**: Quantities and prices are cast, validated, and bounded to prevent overflow attacks and arithmetic manipulations.

### 3. File Upload & Path Traversal Prevention
- **Extension & MIME Whitelisting**: Restricts file uploads to validated image types (`.jpg`, `.jpeg`, `.png`, `.webp`).
- **Path Confinement**: Strict directory canonicalization (`path.resolve`) prevents path traversal attacks (`../`).
- **Payload Size Caps**: Upload buffers are capped at 5MB to mitigate memory exhaustion and denial-of-service vectors.

### 4. Database Security (Firestore Rules)
- **Least-Privilege RBAC**: Read access is public for menu catalogs and store operational status, but write/delete permissions are strictly restricted to authenticated administrators.
- **Schema & Size Validation**: Customer orders and franchise inquiries enforce mandatory keys, validated string lengths, non-empty arrays, and value constraints at the database rule layer.

### 5. Secret Management & Git Hygiene
- **Environment Separation**: All sensitive variables (`ADMIN_USERNAME`, `ADMIN_PASSWORD`, `GEMINI_API_KEY`) are managed exclusively via environment variables on the server side.
- **Git Protection**: `.gitignore` strictly excludes all `.env`, `.env.*`, certificates (`.pem`, `.key`), credentials, and local artifacts.
- **No Hardcoded Secrets**: Client-facing bundles contain zero backend credentials or service tokens.

### 6. Information Leakage & Stack Trace Shielding
- **Zero Stack Trace Leaks**: Centralized Express error-handling middleware intercepts uncaught exceptions and returns sanitized JSON error messages without revealing internal stack traces or server file paths.
- **Security Headers**: Transmits `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`, and disables `X-Powered-By`.

---

## Reporting a Vulnerability

If you discover a potential security vulnerability, please report it privately:
- **Email**: `security@indianparathacompany.com` / `mhr476658@gmail.com`
- Please include steps to reproduce, impact assessment, and sample payloads.
- We will acknowledge receipt within 24 hours and provide a remediation timeline.

