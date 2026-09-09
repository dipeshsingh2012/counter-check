# CounterCheck (`counter-check`)

> **Consumer-facing Product Display Page (PDP) Fragment & Fitment Widget**

`counter-check` is a lightweight, embeddable frontend component for e-commerce store product pages. It allows shoppers to snap a photo of their kitchen counter or upload an image to instantly check if an appliance will fit with proper vertical cabinet clearance and surface area.

---

## 🎯 Features

- **Mobile Camera Trigger:** Direct access to native camera capture via `<input type="file" capture="environment">` with EXIF preservation.
- **Real-Time Fitment Gauge:** Displays clearance margin (e.g. *"Fits with 8 cm to spare"* or *"4 cm too tall for cabinets"*).
- **In-Scene Visualizer:** Renders the appliance placed naturally onto the user's countertop.
- **Smart Catalog Upsells / Alternatives:** If the current item does not fit, displays compact alternatives that fit the detected space.

---

## 🏗️ Architecture

```
[ Customer on Product Page ]
            │
            ▼
    [ CounterCheck Widget ] ── (Captures photo + product_id)
            │
            ▼
[ POST /api/v1/fitment/analyze ] ──► (counter-check-service)
```

---

## 🚀 Tech Stack

- **Framework:** React / TypeScript / Vite
- **Styling:** Tailwind CSS / Emotion
- **Packaging:** Standalone Web Component / Micro-Frontend (MFE)
