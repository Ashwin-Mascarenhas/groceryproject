# FreshCart Frontend (Angular)

## Overview
This is the frontend for the FreshCart grocery system, built with Angular 15.2.7 and SCSS. It provides a modern, responsive UI for users and admins to manage products, orders, cart, and profiles.

---

## Features
- Modern Angular 15+ SPA
- Lazy-loaded feature modules (admin, cart, login, orders, products, profile, register, success)
- Reactive forms with validation and user-friendly error messages
- Centralized HTTP error handling and feedback
- JWT authentication and route guards for security
- Admin dashboard and user management
- Responsive design with SCSS

---

## Prerequisites
- Node.js 18+
- npm 9+
- Angular CLI 15.2.7+

---

## Setup & Run
1. **Install dependencies:**
   ```
   npm install
   ```
2. **Start the development server:**
   ```
   ng serve
   ```
3. **Access the app:**
   - URL: `http://localhost:4200/`

---

## Project Structure
- `src/app/admin` - Admin dashboard and management
- `src/app/cart` - Cart and checkout
- `src/app/login` - Login page
- `src/app/orders` - Order history and details
- `src/app/products` - Product listing and details
- `src/app/profile` - User profile and edit
- `src/app/register` - Registration page
- `src/app/success` - Order success/confirmation
- `src/app/services` - API and business logic services
- `src/app/guards` - Route guards
- `src/app/interceptors` - HTTP interceptors
- `src/app/shared` - Shared UI components (navbar, etc.)

---

## Security Notes
- JWT tokens are used for authentication and stored securely.
- Route guards protect authenticated and admin-only routes.
- All forms use Angular validation to prevent invalid input.
- Error interceptor provides user-friendly error messages.

---

## Customization
- Update API endpoints in the services as needed.
- Modify SCSS for custom branding and styles.
- Add new features by generating modules/components with Angular CLI.

---

## Testing
- Run `ng test` for unit tests.
- Run `ng e2e` for end-to-end tests (after configuring e2e setup).

---

## License
MIT
