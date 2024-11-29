# Library Management System

## Project Overview

The Library Management System is a secure and scalable Node.js application designed to handle library operations such as managing books and users. The system incorporates features like authentication, role-based access control (RBAC), and robust security practices to ensure a safe environment for managing resources.

## How to use

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB installed and running

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/07ronak/Library-Management-System.git
   ```

2. **Navigate to Project Directory**

   ```bash
   cd library-management-system
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Initialize Database**
   Navigate to the `data` folder and seed initial data:
   ```bash
   cd data
   node init.js
   ```
   This step populates the database with initial users and book entries.

### Configuration

1. **Environment Variables**
   - Create a `.env` file in the root directory
   - Add the following configurations:
     ```
     JWT_SECRET=your_jwt_secret_key (add anything you like)
     PORT=3000
     ```

### Running the Application

**Development Mode**

```bash
npm run dev
```

## 🚀 Key Features

### 🔒 Authentication and Security

- Secure user registration, login and logout mechanisms.
- JWT-based authentication with token blacklisting.
- Password hashing with advanced complexity requirements to sanitize inputs.
- Comprehensive protection against web vulnerabilities (XSS, MongoDB injection)

### 👥 Role-Based Access Control (RBAC)

The system implements a sophisticated Role-Based Access Control system with three distinct user roles:

- **User**: Basic access to book browsing
- **Moderator**: Ability to update book information
- **Admin**: Full system administration rights.

### 📚 Core Functionalities

- User registration and authentication
- Book management (add, view, update, delete)
- Granular role-based access control
- Secure token-based authentication

## 🌐 API Endpoints

### Authentication Endpoints

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/register` | Register a new user        |
| POST   | `/api/auth/login`    | Login and get a JWT        |
| POST   | `/api/auth/logout`   | Logout and destroy session |

### Book Management Endpoints

| Method | Endpoint         | Description               | Access Level    |
| ------ | ---------------- | ------------------------- | --------------- |
| GET    | `/api/books`     | Get all books             | All Users       |
| GET    | `/api/books/:id` | Get a specific book by ID | All Users       |
| POST   | `/api/books`     | Add a new book            | Admin Only      |
| PUT    | `/api/books/:id` | Update a book             | Admin/Moderator |
| DELETE | `/api/books/:id` | Delete a book             | Admin Only      |

### User Management Endpoint

| Method | Endpoint          | Description      | Access Level |
| ------ | ----------------- | ---------------- | ------------ |
| GET    | `/api/users`      | Get all users    | Admin Only   |
| PATCH  | `/api/users/role` | Update user role | Admin Only   |

## 🛡️ Security Implementations

### 🔐 Authentication Mechanisms

- Secure password hashing using bcrypt
- JWT token generation with 1-hour expiration
- Token blacklisting for secure logout
- Flexible token extraction from headers or cookies

### 🧐 Input Validation and Sanitization

- Comprehensive input validation:
  - Username: 3-20 characters, alphanumeric with underscores
  - Password: Minimum 8 characters with complexity requirements
- Advanced input sanitization to prevent injection attacks
- Automatic escaping of HTML special characters

### 🔬 Security Middleware

- Helmet for secure HTTP headers configuration
- Cross-Site Scripting (XSS) protection
- MongoDB injection prevention
- Robust Content Security Policy
- Strict referrer policy
- Iframe loading restrictions

## 🖥️ Technical Architecture

### 🔧 Technologies

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- Bcrypt
- Helmet
- Xss-clean
- Express-mongo-sanitize
- Express-validator
- Express-rate-limit

### 📁 Project Structure

```
library-management-system/
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── userController.js
│
├── models/
│   ├── User.js
│   ├── Book.js
│   └── BlackList.js
│
├── middleware/
│   ├── auth.js
│   └── security.js
│
├── routes/
│   └── auth.js
│   └── book.js
│   └── user.js
│
├── data/
│   └── booksData.js
│   └── init.js
│   └── usersData.js
│
├── utils/
│   └── ExpressError.js
│   └── wrapAsync.js
│
├── app.js
├── package.json
├── package-lock.json
├── README.md
```

## 🔄 Authorization Workflow

1. User registers with username and password
2. Input validation and sanitization
3. Default 'User' role assignment
4. JWT token generation upon login
5. Token includes user ID and role
6. Middleware validates token and user permissions

## 🌟 Security Highlights

- Granular role-based access control
- Implemented rate limiting on login attempts.
- Secure token management
- Detailed error handling
- Input Validation and Sanitization
  - Prevents SQL injection, XSS attacks, and other malicious activities using `express-validator`, `xss-clean`, and `express-mongo-sanitize`.
- Password Policies
  -Ensures strong passwords with uppercase, lowercase, numbers, and special characters.
- Secure HTTP header
  - `helmet` is used to set secure HTTP headers, prevent clickjacking, enforce CSP, and more.
- Content Security Policy (CSP)
  -Controls the sources for scripts, styles, and other content.

## 🚧 Future work - Featrues

- Add password reset functionality.
- Add review system for each book.
- Audio logs for activity tracking
- Allow users to borrow books with a time limit.
- Track borrow date, return due date & fine for late return.
- Add Genres and Tags to books
- Email for successful registration & reminds for due return.
- Admin can generate reports
  - Most borrowed books
  - Active users
  - Overdue books & fine collected

## 🛡️ Future work - Security

- Include email verification for registration
- Regularly update dependencies
- Use HTTPS in production
- Use a personal salt to password before hashing

## 🤝 Contributions

Contributions are welcome. Please adhere to existing code structure and security guidelines.

## 📄 License

Ronak Hingonia

---

**Developed with 💻 Security and 📚 Efficiency in Mind**
