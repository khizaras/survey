# Internal Polling Application

This project is an advanced internal polling application for organizations, featuring SSO authentication, real-time poll management, analytics, and a modern UI using React and Ant Design.

## Features

- SSO authentication
- Create, update, delete polls (image/text, single/multi-choice)
- Real-time voting and results
- Admin dashboard with analytics (Highcharts)
- Responsive, accessible, and modern UI

## Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── App.js
│   ├── public/
├── backend/
│   ├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
├── node_modules/
├── package.json
├── webpack.dev.js
├── webpack.prod.js
├── database.sql
└── README.md
```

## Scripts

- `npm run dev` - Run frontend and backend concurrently (development)
- `npm run build` - Build frontend for production
- `npm run start` - Start backend server (production)

## Setup

1. Install dependencies: `npm install`
2. Set up MySQL using `database.sql`
3. Configure environment variables in `backend/config/.env`
4. Run development: `npm run dev`

---

See `requirment.md` for full PRD and requirements.
