# FreshCart Backend (Spring Boot)

## Overview
This is the backend for the FreshCart grocery system, built with Spring Boot, Java, and H2 in-memory database. It provides secure RESTful APIs for user, product, order, category, review, and cart management.

---

## Features
- Secure authentication with JWT
- Password hashing (BCrypt)
- Input validation and error handling
- Centralized logging in controllers and services (SLF4J)
- H2 in-memory database (easy to switch to other DBs)
- Clean, maintainable code with comments
- Ready for production security best practices

---

## Prerequisites
- Java 21+
- Maven 3.8+

---

## Setup & Run
1. **Clone the repository**
2. **Navigate to the backend directory**
3. **Build the project:**
   ```
   mvn clean install
   ```
4. **Run the application:**
   ```
   mvn spring-boot:run
   ```
5. **Access the API:**
   - Base URL: `http://localhost:8080/api`
   - H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:freshcart`)

---

## API Endpoints
- `/api/users` - User registration, login, profile
- `/api/products` - Product CRUD
- `/api/orders` - Order CRUD
- `/api/categories` - Category CRUD
- `/api/reviews` - Review CRUD
- `/api/cart-items` - Cart CRUD

All endpoints support standard HTTP methods (GET, POST, PUT, DELETE). See code comments for details.

---

## Security Notes
- Passwords are hashed with BCrypt before storage.
- JWT tokens are used for authentication. Keep your secret key safe!
- Input validation is enforced on all endpoints (see entity annotations and controller usage of `@Valid`).
- Global error handling provides user-friendly error messages (see `GlobalExceptionHandler`).
- Role-based access control is enforced using `@PreAuthorize` annotations.
- H2 is for development/testing. For production, use PostgreSQL/MySQL.

---

## Logging & Error Handling
- All controllers and services use SLF4J for logging key actions, warnings, and errors.
- Logs include registration, login, profile updates, password changes, and error events.
- Centralized global exception handler returns structured error responses for validation and server errors.
- For troubleshooting, check the logs for detailed error messages.

---

## Customization
- Change database settings in `src/main/resources/application.yml`.
- Update JWT secret and expiration in the same file.
- Add more business logic in the service layer as needed.

---

## Troubleshooting
- If you see validation errors, check your request body matches the entity constraints.
- If you change dependencies, run `mvn clean install` again.
- For any issues, check the logs in `logs/freshcart-backend.log`.

---

## Contributing
- Code is commented for easy understanding.
- PRs and suggestions are welcome!

---

## License
MIT 