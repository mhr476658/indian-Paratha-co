# Indian Paratha Company — Full-Stack Website

A premium responsive React + Vite + Express website recreated from the supplied IPC client brochure.

## Included
- Exact embedded brochure images extracted from the supplied PDF and placed in `frontend/public/assets`.
- Dark navy / cream / peach / gold visual language matching the reference.
- Responsive navigation and mobile menu.
- Sections for:
  - Hero / Manifesto
  - The Soul of IPC
  - Brand story
  - Visionaries
  - Innovation
  - Parathzzaa
  - Franchise opportunity
  - Highway Chalet / Urban Café models
  - Franchise enquiry form
- Express backend for enquiries.
- Local JSON persistence, so the project works without MongoDB.
- Protected enquiry list/delete API using an admin key.

## Requirements
- Node.js 18+
- npm

## Run frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

## Run backend
Open another terminal:
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```
Backend: http://localhost:5000

The Vite dev server proxies `/api` to the backend.

## Production build
```bash
cd frontend
npm run build
npm run preview
```

## Admin API
Set a strong `ADMIN_KEY` in `backend/.env`.

List enquiries:
```bash
curl -H "x-admin-key: YOUR_KEY" http://localhost:5000/api/inquiries
```

Delete an enquiry:
```bash
curl -X DELETE -H "x-admin-key: YOUR_KEY" http://localhost:5000/api/inquiries/IPC-ID
```

## Deployment
Recommended:
- Frontend: Vercel / Netlify
- Backend: Render / Railway / AWS
- Replace the JSON database with MongoDB/PostgreSQL when multiple admins or production scale is needed.
- Set the frontend API base URL for your deployed backend before production.

## Client-content note
Franchise pricing, ROI timelines and contact details are reproduced from the supplied client material. Confirm commercial/legal details with the client before publishing.
