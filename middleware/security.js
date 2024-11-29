const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const { body, validationResult } = require("express-validator");

// Middleware for input validation and sanitization
const validateAndSanitizeInput = {
  // User registration validation
  register: [
    body("username")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be 3-20 characters")
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage(
        "Username can only contain letters, numbers, and underscores"
      )
      .escape(), // Prevents XSS by escaping HTML special characters

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
      .withMessage(
        "Password must include uppercase, lowercase, number, and special character"
      ),
  ],

  // Middleware to check validation results
  checkValidation: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
};

// Application-wide security middleware
const applySecurityMiddleware = (app) => {
  // Helmet for setting various security-related HTTP headers
  app.use(helmet());

  // Prevent MongoDB Operator Injection (e.g., malicious operators like $ or .)
  app.use(
    mongoSanitize({
      // Replace malicious characters with an underscore (_) to neutralize the threat
      replaceWith: "_",
      // Log a warning when potentially malicious input is detected
      onSanitize: ({ req, key }) => {
        console.warn(`Potentially malicious query detected in ${key}`);
      },
    })
  );

  // XSS Protection to prevent malicious scripts from being injected into the app
  app.use(xss());

  // Additional Content Security Policy (CSP) to control what resources can load
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        // Default: Allow resources only from the app's own domain
        defaultSrc: ["'self'"],
        // Scripts: Allow scripts from the app's domain and inline scripts
        scriptSrc: ["'self'", "'unsafe-inline'"],
        // Styles: Allow styles from the app's domain and inline styles
        styleSrc: ["'self'", "'unsafe-inline'"],
        // Images: Allow images from the app's domain and data URIs
        imgSrc: ["'self'", "data:"],
      },
    })
  );

  // Prevent clickjacking by blocking the app from being displayed in iframes
  app.use(helmet.frameguard({ action: "deny" }));

  // Set the Referrer Policy to limit information shared with external sites
  app.use(
    helmet.referrerPolicy({
      // Share only the origin (e.g., domain) when visiting external sites, but full URL on your site
      policy: "strict-origin-when-cross-origin",
    })
  );
};

module.exports = {
  validateAndSanitizeInput,
  applySecurityMiddleware,
};
