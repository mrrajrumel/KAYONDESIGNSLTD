# KAYON DESIGNS LTD - Full Stack SaaS CMS

## 1. Project Overview
Kayon Designs Ltd is a modern, decoupled Client-Server web application. It features a scalable Laravel 11 API backend and a lightning-fast React 18 + Vite frontend. It includes a completely dynamic Admin Dashboard allowing the client to modify Pages, Sections, Widgets, Menus, Media, SEO, and the Work Showcase portfolio.

## 2. Architecture & Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Zustand, React Helmet Async, Axios.
- **Backend:** Laravel 11, PHP 8.4+, MySQL.
- **Security:** Laravel Sanctum (Token Auth), strict CORS, Form Request Validation, SQL Injection & XSS protection.
- **Performance:** Vite Code Splitting, React Lazy Loading, Eloquent optimized queries.

## 3. Core Features Completed
- **Dynamic SEO:** Fully manageable via `SeoSetting` morphology. React Helmet renders tags dynamically.
- **Media Manager:** Drag and drop UI to manage assets locally or via CDN.
- **Work Showcase System:** Dynamic filtering, category relationships, and responsive grid.
- **Visual Page Builder Foundation:** `Page`, `Section`, and `Widget` models ready to construct modular layouts.
- **Contact Management:** Messages are captured securely and readable via the Admin Dashboard.
- **Role-Based Access Control:** Secure Admin generation via seeders.

## 4. Setup & Deployment (Hostinger)
### Backend
1. `cd backend`
2. `composer install`
3. `cp .env.example .env` (Add MySQL details)
4. `php artisan key:generate`
5. `php artisan migrate:fresh --seed`
*(Serve on a subdomain like `api.kayondesigns.com`)*

### Frontend
1. `npm install`
2. `npm run build`
*(Deploy the `dist/` folder to `public_html`)*

## 5. Security & Default Credentials
- **Admin Portal URL:** `/secure-admin-panel-login` (Obfuscated route).
- **Default Super Admin:**
  - Email: `Rajrum3l@gmail.com`
  - Password: `123456`
*Generated exclusively via `php artisan db:seed --class=AdminSeeder`.*
