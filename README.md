# KAYON DESIGNS LTD - Custom CMS Website

A fully custom, SaaS-grade Content Management System built specifically for Kayon Designs Ltd. This project replaces the previous AI-generated frontend with a production-ready, highly optimized, and secure architecture.

## A. Project Overview
This project is a decoupled modern web application. It features a React (Vite) frontend with a dynamic Page Builder and a robust Laravel REST API backend. It is designed to be hosted on Hostinger (Shared or VPS).

## B. Features List
- **Visual Page Builder:** Admin can dynamically add, edit, and reorder sections via the secure dashboard.
- **Dynamic Menus:** Header and footer navigations are fully controllable from the backend.
- **Secure Admin Dashboard:** Protected routes, token-based authentication (Laravel Sanctum).
- **SEO Optimized:** React Helmet integration with Open Graph support.
- **Media Manager:** Centralized visual dashboard for uploading and managing images.
- **Contact Submissions:** Live form routing to the admin dashboard with read/unread statuses.
- **Responsive UI/UX:** Mobile-first, sleek typography, and glossy Material 3 inspired components.

## C. Tech Stack
**Frontend:**
- React 18
- Vite
- Tailwind CSS v3
- Zustand (State Management)
- Axios
- React Router DOM v7

**Backend:**
- Laravel 11.x
- PHP 8.2+
- MySQL
- Laravel Sanctum (Auth)

## D. Installation Steps
1. Clone the repository.
2. Ensure you have Node.js (v18+) and PHP (v8.2+) installed.
3. Install dependencies for both frontend and backend.

## E. Frontend Setup
```bash
npm install
cp .env.example .env
npm run dev
```

## F. Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

## G. MySQL Setup
1. Create a MySQL database (e.g., `kayon_db`).
2. Update the `backend/.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kayon_db
DB_USERNAME=root
DB_PASSWORD=
```
3. Run migrations and seeders:
```bash
php artisan migrate:fresh --seed
```

## H. Environment Variables
**Frontend (.env):**
`VITE_API_BASE_URL=http://localhost:8000/api`

**Backend (.env):**
`APP_URL=http://localhost:8000`
`FRONTEND_URL=http://localhost:5173`
`SANCTUM_STATEFUL_DOMAINS=localhost:5173`

## I. Hostinger Deployment Guide
### 1. Backend (Laravel) Deployment
- Zip the `backend` folder and upload to `domains/yourdomain.com/backend`
- Point the Hostinger Document Root to `domains/yourdomain.com/backend/public`
- Create a MySQL Database in Hostinger hPanel and update the `.env` file.
- SSH into your Hostinger account and run:
  `php artisan migrate --force`
  `php artisan db:seed --force`
  `php artisan optimize:clear`
  `php artisan storage:link`

### 2. Frontend (React) Deployment
- Change `VITE_API_BASE_URL` in `.env` to `https://yourdomain.com/api` (if hosting API on same domain)
- Run `npm run build` locally.
- Upload the contents of the `dist` folder to your public-facing folder (or subdomain).
- Add a `.htaccess` in the frontend root to handle React routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## J. Build Commands
- `npm run build` - Generates the production-ready React bundle in `/dist`.

## K. NPM Commands
- `npm run dev` - Starts the Vite development server.
- `npm run preview` - Previews the production build locally.

## L. Laravel Commands
- `php artisan serve` - Starts the local PHP server.
- `php artisan migrate` - Runs database migrations.
- `php artisan db:seed` - Seeds the database with default admin and pages.
- `php artisan optimize` - Caches config, routes, and views for production.

## M. Troubleshooting
- **CORS Errors:** Ensure `FRONTEND_URL` in the Laravel `.env` matches your React URL exactly (no trailing slash).
- **404 on API Routes:** Check if Apache/Nginx is allowing `Authorization` headers. Add `CGIPassAuth On` to `.htaccess` if necessary.

## N. Admin Login Setup
Upon running `php artisan db:seed`, the default Super Admin is created:
- **URL:** `/secure-admin-panel-login`
- **Email:** `Rajrum3l@gmail.com`
- **Password:** `password` (Please change immediately in production).

## O. Production Build Guide
Always run `npm run build` for the frontend and `php artisan optimize` for the backend before going live. Do not leave `APP_DEBUG=true` in production.

## P. API Documentation
All endpoints are prefixed with `/api`.
- `GET /homepage` - Retrieves homepage data and sections.
- `GET /pages/{slug}` - Retrieves dynamic page content.
- `GET /menus/{location}` - Retrieves header/footer menus.
- `POST /contact` - Submits a contact form.
Protected routes require a Bearer token (`Authorization: Bearer <token>`).

## Q. Folder Structure
- `/src` - React frontend code.
- `/src/components/DynamicSections` - Visual Builder section templates.
- `/src/pages/Admin` - Secure Dashboard views.
- `/backend/app/Http/Controllers` - API Logic.
- `/backend/database/migrations` - Database Schema.

## R. Security Notes
- CSRF protection is active.
- API is protected against XSS.
- Ensure SSL (HTTPS) is forced on Hostinger to protect authentication tokens.
