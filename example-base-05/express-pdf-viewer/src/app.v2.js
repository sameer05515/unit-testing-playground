require('dotenv').config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const { PORT, NODE_ENV, ALLOWED_ORIGINS, MAX_REQUEST_SIZE, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } = require("./common/constants");
const errorHandler = require("./middleware/errorHandler");
const performanceMiddleware = require("./middleware/performance");
const swaggerUi = require("swagger-ui-express");
const redoc = require("redoc-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// Security middleware - must be first
// Configure CSP to allow trusted CDNs while maintaining security
const helmetConfig = NODE_ENV === 'development' 
  ? {
      // Less strict CSP for development
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'", // Required for Tailwind Play CDN
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com",
            "https://cdn.tailwindcss.com",
            "https://unpkg.com"
          ],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com",
            "https://cdn.tailwindcss.com"
          ],
          connectSrc: [
            "'self'",
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com"
          ],
          fontSrc: [
            "'self'",
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com"
          ],
          imgSrc: ["'self'", "data:", "https:"],
          objectSrc: ["'none'"],
        },
      },
    }
  : {
      // Stricter CSP for production
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'", // Still needed for some inline scripts
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com",
            "https://cdn.tailwindcss.com",
            "https://unpkg.com"
          ],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com",
            "https://cdn.tailwindcss.com"
          ],
          connectSrc: [
            "'self'",
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com"
          ],
          fontSrc: [
            "'self'",
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com"
          ],
          imgSrc: ["'self'", "data:", "https:"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
    };

app.use(helmet(helmetConfig));

// Compression middleware
app.use(compression());

// Performance monitoring middleware
app.use(performanceMiddleware);

// Request logging
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// CORS configuration
const corsOptions = {
  origin: ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser with size limits
app.use(bodyParser.json({ limit: MAX_REQUEST_SIZE || '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: MAX_REQUEST_SIZE || '10mb' }));

// Rate limiting for API routes
const limiter = rateLimit({
  windowMs: parseInt(RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use('/api/', limiter);

// Serve static files (CSS, Bootstrap)
app.use(express.static(path.join(__dirname, "../public")));

// Set EJS as view engine and views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// API Documentation - OpenAPI JSON endpoint
app.get('/api-docs/openapi.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Swagger UI API documentation (backward compatible route)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Express PDF Viewer API Documentation',
}));

// Swagger UI API documentation (alternative route)
app.use('/api-docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Express PDF Viewer API Documentation',
}));

// ReDoc API documentation
app.get(
  '/api-docs/redoc',
  redoc({
    title: 'Express PDF Viewer API Documentation',
    specUrl: '/api-docs/openapi.json',
  })
);

// Routes
const v2Routes = require("./routes/index.v2");
app.use("", v2Routes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start Server
app.listen(PORT || 3000, () => {
  console.log(`Server running at http://localhost:${PORT || 3000}`);
  console.log(`Environment: ${NODE_ENV}`);
});
