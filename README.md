# 🔥 Mama Ko Sekuwa — Restaurant Website

A full-stack restaurant website for **Mama Ko Sekuwa**, a family restaurant in Lalitpur, Nepal.

## Tech Stack

| Layer    | Technologies |
|----------|-------------|
| Frontend | React 18, Vite, TailwindCSS 3, React Router, Axios, react-hot-toast |
| Backend  | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs |

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (or a remote connection string)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` (already provided):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mama-ko-sekuwa
JWT_SECRET=mama_ko_sekuwa_jwt_secret_2024
```

Seed the database:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API requests to the backend.

## Admin Credentials

After running `npm run seed`:
- **Email:** `admin@mamakosekuwa.com`
- **Password:** `admin123`
- **URL:** `/admin/login`

## API Endpoints

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/menu` | Public |
| POST | `/api/orders` | Public |
| POST | `/api/reservations` | Public |
| POST | `/api/contact` | Public |
| POST | `/api/auth/login` | Public |
| POST | `/api/menu` | Admin |
| PUT | `/api/menu/:id` | Admin |
| DELETE | `/api/menu/:id` | Admin |
| GET | `/api/orders` | Admin |
| PUT | `/api/orders/:id` | Admin |
| GET | `/api/reservations` | Admin |

## Project Structure

```
mama-ko-sekuwa/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Route handlers
│   ├── middleware/       # Auth, validation, error handler
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Seed script
│   └── server.js        # Entry point
├── frontend/
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── context/     # Auth & Cart state
│       ├── layouts/     # Main & Admin layouts
│       ├── pages/       # Route pages
│       ├── services/    # Axios API client
│       └── App.jsx      # Router
└── README.md
```
# Mama-Ko-Sekuwa
