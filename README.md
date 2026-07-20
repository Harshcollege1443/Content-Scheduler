# Rundown — Content Calendar & Multi-Platform Scheduler (MERN)

Plan posts across YouTube, Instagram, and X in one dashboard. Drag posts
between days on a real calendar, drag them across a status board (Idea →
Shooting → Editing → Posted), and see what's due in the next 24 hours.

## Stack
- MongoDB + Mongoose
- Express + JWT auth
- React (Vite) + Tailwind CSS
- Native HTML5 drag-and-drop (no extra DnD library needed)

## Project structure
```
content-scheduler/
  server/     Express API, MongoDB models, auth, post CRUD
  client/     React frontend — Calendar view + Board (Kanban) view
```

## Setup

### 1. Backend
```bash
cd server
npm install
cp .env.example .env
# fill in MONGO_URI and JWT_SECRET
npm run dev
```
Runs on `http://localhost:5000`.

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`, proxying `/api` to the backend.

## Data model
**Post**: `title`, `platform` (youtube/instagram/x), `status`
(idea/shooting/editing/posted), `scheduledDate`, `reminderAt` (optional),
`notes`. Every post belongs to a `user`.

## Key routes
| Method | Route | Purpose |
|---|---|---|
| `GET /api/posts` | List posts, optional `?from=&to=` range filter |
| `POST /api/posts` | Create a post |
| `PATCH /api/posts/:id` | Update any field |
| `PATCH /api/posts/:id/move-date` | Drag-drop on the calendar |
| `PATCH /api/posts/:id/move-status` | Drag-drop on the board |
| `GET /api/posts/reminders` | Posts with a reminder in the next 24h |
| `DELETE /api/posts/:id` | Delete a post |

## Extending this for production
- Reminders currently only surface inside the app (a banner on the Board
  view). Wire `reminderAt` up to a cron job + email/push service (e.g.
  node-cron + Nodemailer, or a queue like BullMQ) to actually notify users.
- Add per-platform post metadata (captions, hashtags, thumbnail upload) —
  the schema has room via the `notes` field today, but dedicated fields
  would scale better.
- Add team/workspace support (multiple users on one calendar) by adding a
  `workspace` reference instead of scoping everything to a single `user`.
