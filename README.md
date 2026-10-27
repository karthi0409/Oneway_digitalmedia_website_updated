# One Way Digital Media — Full-Stack Web Platform

End-to-End Digital Marketing & Web Solutions platform for **One Way Digital Media**, Bangalore. Built with React 18, Vite, React Router v6, custom CSS design system, and Node.js/Express + MongoDB backend.

## Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Vanilla CSS with custom tokens (no Tailwind), react-icons (`fi`, `bi`, `md`, `gi`).
- **Backend**: Node.js 18+, Express 4, Mongoose (MongoDB / MongoDB Atlas), Nodemailer, Helmet, CORS, Express Rate Limit, Morgan, Dotenv.
- **Architecture**: Monorepo with `client/` and `server/`. Development runs both concurrently; in production, Express serves `client/dist` and the API under `/api`.

---

## Getting Started

### 1. Installation
Install root, client, and server dependencies with:
```bash
npm run install:all
```
Or manually:
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Environment Setup
Create `server/.env` based on `server/.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/onewaydigital
CLIENT_URL=http://localhost:5173
ADMIN_API_KEY=oneway_admin_secret_key_2026

# Optional SMTP for Email Alerts
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
MAIL_FROM="One Way Digital Media" <no-reply@onewaydigital.in>
TEAM_EMAIL=contact@onewaydigital.in
```

### 3. Database Seeding (Optional)
Seed initial project data:
```bash
npm run seed
# Or reset and seed:
npm run seed:reset
```

### 4. Running the Development Server
Run both client (Vite on port 5173) and backend API (Express on port 5000) concurrently:
```bash
npm run dev
```

- Client: [http://localhost:5173](http://localhost:5173)
- API Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 5. Production Build
Build the client and run the unified Express server:
```bash
npm run build
npm start
```
The Express server on port 5000 will serve both the `/api/*` endpoints and the compiled single-page application from `client/dist`.

---

## API Endpoints

### Public Endpoints
- `GET /api/health` — Service health and database connection status
- `POST /api/enquiries` — Submit an enquiry (rate-limited: 5 requests / 15 mins per IP, honeypot protection)
- `GET /api/projects` — Retrieve published client projects and case studies

### Admin Endpoints (Header: `x-admin-key: <ADMIN_API_KEY>`)
- `GET /api/enquiries` — Paginated list of customer enquiries (`?page=1&limit=20&status=new`)
- `PATCH /api/enquiries/:id` — Update enquiry status (`new`, `in-progress`, `contacted`, `converted`, `archived`)
- `DELETE /api/enquiries/:id` — Remove an enquiry
- `GET /api/projects/all` — Retrieve all projects (including drafts)
- `POST /api/projects` — Create a new project
- `PUT /api/projects/:id` — Update project details
- `DELETE /api/projects/:id` — Remove a project

---

## Brand Guidelines & Color Tokens

- **Lime (Primary Accent)**: `#8ac616`
- **Lime Bright (Hover)**: `#a9d81b`
- **Lime Heading (Light backgrounds)**: `#6eaa06`
- **Lime Text (Light backgrounds)**: `#3c7508`
- **Dark Ink (Hero / Headers / Footers)**: `#02060e`
- **Logo Black**: `#0a0a0a`
- **Navy (Bands & Panels)**: `#02162a` / `#02223a`
- **Teal / Teal Bright (Accent)**: `#0b5e5b` / `#4ec2be`
- **Paper (Light backgrounds)**: `#f1f2f0`
- **Headings Font**: `'Antonio', sans-serif` (600/700, uppercase)
- **Body Font**: `'Outfit', sans-serif` (400-700)
