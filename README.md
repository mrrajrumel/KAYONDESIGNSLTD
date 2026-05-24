# KAYON DESIGNS LTD - Custom SaaS-Grade Website System

## 1. Full Project Overview
Kayon Designs Ltd is a professional, modern, and high-performance custom website system. Originally generated as a static UI, it has been fully rebuilt into a robust, production-ready full-stack architecture featuring a Vite + React frontend and a scalable Laravel API backend. The system includes a highly secure, private Admin Dashboard allowing full visual customization of pages, menus, sections, and site settings.

## 2. Full Stack Explanation
The architecture relies on a decoupled Client-Server model:
- **Frontend (Client):** Built with React 18 and Vite. It utilizes Tailwind CSS for rapid, scalable styling and React Router DOM for client-side navigation. It consumes the backend via Axios.
- **Backend (Server):** Built with Laravel 11 (PHP 8.4+). It acts as a stateless RESTful API, handling business logic, database transactions, and RBAC (Role-Based Access Control).
- **Database:** MySQL, perfectly compatible with Hostinger shared and VPS environments.

## 3. Features List
- **Responsive UI/UX:** Fully optimized for mobile, tablet, desktop, and large screens.
- **Admin Dashboard:** Secure private portal (`/secure-admin-panel-login`) to manage content.
- **Visual Page Builder:** Live preview editing for homepage widgets, headers, footers, and dynamic sections.
- **Dynamic Routing:** Add and manage custom pages and slugs dynamically from the database.
- **Contact Form Management:** Receive, read, and export contact submissions directly in the admin panel.
- **Media Manager:** Upload, organize, compress, and reuse assets seamlessly.
- **Modern Animations:** Premium aesthetic built with Tailwind CSS and Framer Motion logic.

## 4. Folder Structure
```text
KAYONDESIGNSLTD/
│
├── backend/                  # Laravel API
│   ├── app/Models/           # Database Models
│   ├── app/Http/Controllers/ # REST API Controllers
│   ├── database/migrations/  # Database Schemas
│   └── routes/api.php        # API Routing
│
├── public/                   # Static public assets
├── src/                      # React Frontend
│   ├── components/           # Reusable UI widgets
│   ├── pages/                # Page components (Home, Admin, etc.)
│   ├── layouts/              # Layout wrappers
│   ├── hooks/                # Custom React hooks
│   ├── services/             # Axios API services
│   ├── utils/                # Helper functions
│   └── context/              # Global state management
│
├── vite.config.ts            # Vite Configuration
├── tailwind.config.js        # Tailwind settings
└── package.json              # Frontend dependencies
```

## 5. Installation Guide
1. Clone the repository: `git clone <repository_url>`
2. Follow the setup steps below for both Frontend and Backend environments.

## 6. Frontend Setup
1. Open the root directory: `cd KAYONDESIGNSLTD`
2. Install dependencies: `npm install`
3. Set up the `.env` file for the frontend (see section 9).
4. Run the development server: `npm run dev`

## 7. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install PHP dependencies: `composer install`
3. Copy `.env.example` to `.env`: `cp .env.example .env`
4. Generate the application key: `php artisan key:generate`
5. Serve the API locally: `php artisan serve`

## 8. Database Setup
1. Create a MySQL database (via Hostinger hPanel or local phpMyAdmin).
2. Update the `backend/.env` with your database credentials.
3. Run migrations and seeders: `php artisan migrate --seed`

## 9. Environment Variables
### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:8000/api
```
### Backend (`backend/.env`)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kayondesigns
DB_USERNAME=root
DB_PASSWORD=your_password
```

## 10. Hostinger Deployment Guide
1. **Frontend:** Run `npm run build`. Upload the contents of the `dist/` folder to the `public_html` directory of your Hostinger hosting.
2. **Backend:** 
   - Upload the `backend` folder to your Hostinger file manager (preferably outside `public_html`, e.g., `/domains/yourdomain.com/backend`).
   - Create a symlink or route requests from `public_html/api` to `backend/public`.
   - Update `.htaccess` in `public_html` to handle React Router and API requests.
3. Import your MySQL database via phpMyAdmin in hPanel.
4. Ensure SSL is activated (Let's Encrypt via Hostinger).

## 11. Production Deployment Guide
1. Set `VITE_API_BASE_URL=https://yourdomain.com/api` before running `npm run build`.
2. Clear Laravel caches in production: `php artisan route:cache && php artisan config:cache && php artisan view:cache`.
3. Set `APP_ENV=production` and `APP_DEBUG=false` in the backend `.env`.

## 12. Admin URL
- **Secure Admin Portal:** `https://yourdomain.com/secure-admin-panel-login`
- *Note: This URL is deliberately obfuscated to prevent automated brute-force attacks on standard paths like `/admin` or `/login`.*

## 13. Admin Setup Instructions
- **How to create the first admin:** Run `php artisan db:seed --class=AdminSeeder` in the backend directory. This will generate the primary Super Admin account.
- **Future Admins:** Must be created *exclusively* from within the backend dashboard by the Super Admin. There is no public registration page for admins.

## 14. Role Permission System
The system utilizes a strict RBAC (Role-Based Access Control) architecture:
- **Super Admin:** Full access to all modules, including creating other admins and assigning permissions.
- **Admin:** Access to content management, media, and settings. Cannot create users.
- **Editor:** Can create and edit pages and sections. Cannot delete pages or change global settings.
- **Content Manager:** Can only manage media and view contact forms.

## 15. API Documentation
- `POST /api/auth/login` - Authenticate admin & receive Sanctum token.
- `POST /api/auth/logout` - Revoke token.
- `GET /api/pages` - Fetch public dynamic pages.
- `GET /api/pages/{slug}` - Fetch a specific page with its sections.
- `POST /api/contact` - Submit a contact form.
- *Protected routes require a `Bearer {token}` authorization header.*

## 16. Security Notes
- Admin routes are protected via JWT/Token middleware (Laravel Sanctum).
- All form submissions are sanitized to prevent XSS (Cross-Site Scripting).
- SQL Injection protection is guaranteed via Laravel's Eloquent ORM.
- CSRF protection is active.
- Rate throttling is applied to all API endpoints.
- The `.env` file is heavily protected and must **never** be committed to version control.

## 17. Troubleshooting
- **CORS Errors:** Ensure your `backend/config/cors.php` is configured to allow requests from your frontend origin (`allowed_origins`).
- **404 on React Pages (Hostinger):** Ensure your `.htaccess` redirects all non-API requests to `index.html`.
- **Database Connection Refused:** Verify your Hostinger database user privileges and `.env` credentials. Check if the database host should be `localhost` instead of `127.0.0.1`.

## 18. Performance Optimization Notes
- **Lazy Loading:** Implemented for React components to ensure the initial JS bundle is extremely small.
- **Code Splitting:** Configured automatically by Vite.
- **Image Optimization:** Media manager handles file compression before saving to storage.
- **Caching:** Ensure Laravel route and config caching are enabled in production to reduce TTFB (Time To First Byte).
