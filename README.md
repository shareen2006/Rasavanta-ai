<div align="center">

<img src="client/public/brand/rasavanta-logo.png" alt="RASAVANTA AI Logo" width="120" />

# RASAVANTA AI

### *Rooted in Taste. Powered by Intelligence.*

**An Intelligent Culinary Platform for Smarter Cooking, Recipe Discovery & Sustainable Kitchens**

<br/>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-rasavanta--ai.vercel.app-6C63FF?style=for-the-badge&logo=vercel&logoColor=white)](https://rasavanta-ai.vercel.app/)
[![Backend API](https://img.shields.io/badge/Backend%20API-Render-00979D?style=for-the-badge&logo=render&logoColor=white)](https://rasavanta-ai.onrender.com/api/health)
[![GitHub](https://img.shields.io/badge/GitHub-shareen2006-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shareen2006/Rasavanta-ai)

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Nodemailer](https://img.shields.io/badge/Email-Gmail%20SMTP%20%2B%20Resend-22B573?style=flat-square&logo=gmail&logoColor=white)](https://nodemailer.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![JWT](https://img.shields.io/badge/Auth-JWT%20%2B%20bcrypt-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%204-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Our Solution](#our-solution)
- [Key Features](#key-features)
- [Application Modules](#application-modules)
- [AI Integration](#ai-integration--intelligence)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Database Design](#database-design--mongodb-integration)
- [Authentication & Security](#authentication--security)
- [Email Verification & Multi-Provider Architecture](#email-verification--multi-provider-architecture)
- [Google Gemini AI Integration](#google-gemini-ai-integration)
- [Project Structure](#project-folder-structure)
- [Application Screenshots](#application-screenshots)
- [Installation & Setup](#installation--local-setup)
- [Environment Variables](#environment-variables-configuration)
- [Running the Application](#running-the-application)
- [Automated Testing & Security Suites](#automated-testing--security-suites)
- [Troubleshooting & FAQs](#troubleshooting--faqs)
- [API Documentation](#api-documentation)
- [Deployment](#deployment-architecture)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing-guidelines)
- [License](#license)
- [Developer](#developer--contact)

---

## 🌿 Project Overview

**RASAVANTA AI** is a full-stack, AI-powered culinary intelligence platform built for the modern Indian kitchen. It bridges the gap between traditional Indian cooking wisdom and cutting-edge artificial intelligence — enabling users to discover recipes, manage their pantry, plan meals, and receive real-time culinary guidance, all within a seamless, multilingual experience.

The platform serves as a smart kitchen companion: understanding what ingredients a user has, suggesting contextually relevant dishes, generating brand-new recipes on demand, tracking nutrition, managing shopping, and offering conversational support through an AI-powered chef assistant — in any of 9 Indian languages.

---

## 🔍 Problem Statement

Indian home cooks face several persistent challenges:

- **Ingredient waste** due to no visibility of what is in the pantry and what is about to expire.
- **Recipe decision fatigue** — knowing which dishes can be made with the ingredients on hand.
- **Nutritional blind spots** — difficulty tracking macronutrient and micronutrient intake across meals.
- **Lack of multilingual culinary resources** — mainstream apps rarely support regional Indian languages.
- **Disconnected tools** — pantry, shopping list, meal planning, and recipe apps are all separate.
- **Unverified accounts & spam** — security vulnerability without email identity verification and abuse-resistant authentication.
- **No personalized AI guidance** — existing recipe apps are static; they cannot answer follow-up questions, adapt to user constraints, or troubleshoot cooking in real-time.

---

## 💡 Our Solution

RASAVANTA AI is a unified, intelligent culinary ecosystem that solves every one of these problems:

| Challenge | RASAVANTA AI Solution |
|---|---|
| Ingredient waste | Smart Pantry with expiry tracking and alerts |
| Recipe discovery | Pan-India recipe database with AI-powered filtering |
| AI-generated recipes | RasaGen synthesizes recipes from user pantry ingredients |
| Nutritional awareness | NutriSense dashboard with macro/micro nutrient tracking |
| Multilingual support | Full i18n in 9 Indian languages |
| Conversational cooking help | RasaBot — Gemini-powered AI chef assistant |
| Shopping management | Smart Basket with JWT-secured per-user data |
| Meal planning | Dedicated interactive meal planner module |
| Account integrity | Cryptographic email verification with 24h tokens and resend cooldowns |
| Sustainable cooking | Pantry-first recipe suggestions to reduce food waste |

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **RasaBot AI Chef** | Multi-turn conversational AI assistant powered by Google Gemini with 12-turn memory |
| 🧑‍🍳 **RasaGen Recipe Synthesis** | AI-generated recipes with full nutritional schema from pantry ingredients |
| 🧊 **Smart Pantry** | CRUD pantry manager with per-user data isolation and expiry tracking |
| 🛒 **Smart Basket** | JWT-protected shopping list with server-side user identity enforcement |
| 📊 **NutriSense Dashboard** | Interactive recharts visualization of macro and micronutrient intake |
| 📧 **Email Verification** | Dual-provider verification (Gmail SMTP / Resend) with 24h tokens and 60s cooldown |
| 📚 **Digital Cookbook** | Save, organize, and revisit favorite and AI-generated recipes |
| 🗓️ **Meal Planner** | Weekly meal planning interface |
| 🌐 **Multilingual (i18n)** | 9 Indian languages: Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, Marathi, Gujarati, English |
| 🎥 **YouTube Tutorial Integration** | Embedded cooking tutorials linked to recipe pages |
| 🔐 **Production Security** | JWT + bcrypt authentication with strict per-user ownership enforcement |
| 🌍 **Google Sign-In** | OAuth 2.0 Google authentication via `google-auth-library` |
| 📱 **Responsive Design** | Mobile-first adaptive layout with Framer Motion animations |
| 🎨 **3D Cooking Studio** | Interactive Three.js 3D cooking environment |

---

## 🧩 Application Modules

### 🤖 RasaBot — AI Culinary Companion
An intelligent multi-turn conversational assistant that understands Indian cooking deeply. RasaBot can suggest recipes from available ingredients, troubleshoot dishes, explain food science, provide substitutions, scale portions, and respond fluently in 9 Indian languages.

### 🧑‍🍳 RasaGen — AI Kitchen
An AI recipe synthesizer that takes a user's available pantry ingredients, cuisine preference, dietary restrictions, meal type, and time constraints, then generates a complete, authentic, production-quality recipe with full nutritional data, substitutions, and chef tips.

### 🧊 Smart Pantry
A per-user pantry management system. Users can add, update, and delete pantry items with quantities, units, locations, and expiry dates. The pantry context powers RasaBot and RasaGen with live ingredient awareness.

### 🛒 Smart Basket
A JWT-secured shopping list module. User identity is derived exclusively from the verified JWT token — never from client-supplied parameters — preventing all IDOR attacks.

### 📊 NutriSense
An interactive nutrition analytics dashboard built with Recharts: macro distribution (donut), weekly calorie/protein trends (line), micronutrient target vs. actual (bar), pantry health status (donut), and cooking activity (bar).

### 📧 Email Verification Center
A dedicated verification workflow (`/verify-email`) and dashboard banner ensuring genuine user identity. Handles token validation, single-use guarantees, expiration checks, and throttled resend requests.

### 📚 Digital Cookbook
A personal recipe collection page where users can browse, save, and manage their favorite and AI-generated recipes.

### 🗓️ Meal Planner
A weekly meal planning interface for organizing breakfast, lunch, and dinner across the week.

### 🌐 Explore Recipes
A filterable, searchable recipe database featuring Pan-India dishes with cuisine filters, dietary filters, difficulty levels, and YouTube tutorial links.

---

## 🧠 AI Integration & Intelligence

RASAVANTA AI deeply integrates **Google Gemini AI** (`gemini-3.5-flash-lite`) via the official `@google/genai` SDK:

### RasaBot Intelligence
- **Multi-turn memory**: Maintains up to 12 conversation turns in native Gemini contents format
- **Contextual awareness**: Receives user's current pantry ingredients and dietary preferences
- **Dynamic suggestions**: Generates contextual follow-up suggestions per conversation state
- **Recipe card linking**: Automatically matches conversation output to catalog recipes
- **Rate-limit protection**: 400ms minimum request spacing with exponential backoff on 429/503
- **Timeout guard**: 45-second timeout wrapper on all Gemini API calls

### RasaGen Intelligence
- **Structured JSON output**: Returns `responseMimeType: 'application/json'` for guaranteed schema
- **Nutrition sourcing**: ICMR-NIN Indian Food Composition Tables (IFCT) & USDA FoodData Central
- **Native language titles**: Recipes returned with Telugu, Hindi, and Tamil native name fields
- **Allergen & dietary classification**: Vegan, gluten-free, Jain-friendly flags included
- **Image prompt synthesis**: Generates photorealistic food photography prompts for each dish

### Language Support
RasaBot detects and responds in: **Telugu · Hindi · Tamil · Kannada · Malayalam · Bengali · Marathi · Gujarati · English**

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client["Frontend — React 19 + Vite 6 (Vercel)"]
        A["React 19 App"] --> B["React Router v7"]
        B --> C1["RasaBot Chat UI"]
        B --> C2["RasaGen Kitchen"]
        B --> C3["Smart Pantry"]
        B --> C4["Smart Basket"]
        B --> C5["NutriSense Dashboard"]
        B --> C6["Explore Recipes"]
        B --> C7["Verify Email Page"]
        A --> D["AuthContext + JWT Storage"]
        A --> E["i18next — 9 Languages"]
        A --> F["Framer Motion + Three.js Studio"]
    end

    subgraph API["REST API — Express.js 4 (Render)"]
        G["Auth Routes — /api/v1/auth"]
        H["JWT Middleware (protect)"]
        I["Recipe Routes — /api/v1/recipes"]
        J["Pantry Routes — /api/v1/pantry"]
        K["Basket Routes — /api/v1/basket"]
        L["RasaBot Routes — /api/v1/rasabot"]
        M["Controllers (auth, pantry, basket, recipes, rasabot)"]
        EMAIL["emailService (Dual-Provider Dispatch)"]
        
        G -- "GET /me (protected)" --> H
        G -- "POST /login, /register, /google" --> M
        G -- "POST, GET /verify-email, /resend-verification" --> M
        J -- "router.use(protect)" --> H
        K -- "router.use(protect)" --> H
        H --> M
        I --> M
        L --> M
        M --> EMAIL
    end

    subgraph DB["MongoDB Atlas"]
        N["User Collection (bcrypt + tokens)"]
        O["Recipe Collection"]
        P["PantryItem Collection"]
        Q["ShoppingList Collection"]
    end

    subgraph EmailProviders["Transactional Email Dispatch"]
        EP1["Gmail SMTP (Nodemailer + STARTTLS)"]
        EP2["Resend API (HTTPS REST)"]
        EMAIL --> EP1
        EMAIL --> EP2
    end

    subgraph AI["Google Gemini AI"]
        R["gemini-3.5-flash-lite"]
        S["Multi-turn Chat — RasaBot"]
        T["JSON Recipe Generation — RasaGen"]
        R --> S
        R --> T
    end

    Client -- "HTTPS + Bearer Token" --> API
    M --> DB
    M -- "chat()" --> S
    M -- "generateRecipe()" --> T
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.0 | UI framework |
| Vite | 6.1 | Build tool and dev server |
| Tailwind CSS | 4.0 | Utility-first CSS framework |
| Framer Motion | 12.4 | Animations and transitions |
| React Router DOM | 7.1 | Client-side routing |
| Recharts | 2.15 | Data visualization charts |
| Three.js | 0.187 | 3D interactive cooking studio |
| Lucide React | 0.475 | Icon library |
| react-i18next | 15.4 | Internationalization (9 languages) |
| i18next | 24.2 | i18n core |
| Axios | 1.7 | HTTP client |
| react-hot-toast | 2.5 | Toast notifications |
| Embla Carousel | 8.5 | Carousel component |
| canvas-confetti | 1.9 | Celebration animations |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | LTS | Runtime |
| Express.js | 4.19 | Web framework |
| Mongoose | 8.4 | MongoDB ODM |
| Nodemailer | 10.6 | Gmail SMTP & STARTTLS email transport |
| Resend | 6.38 | Alternative cloud email API provider |
| @google/genai | 3.5 | Official Google Gemini SDK |
| jsonwebtoken | 9.0 | JWT signing and verification |
| bcryptjs | 3.0 | Password hashing (10 salt rounds) |
| google-auth-library | 11.3 | Google OAuth 2.0 |
| cors | 2.8 | Cross-Origin Resource Sharing |
| morgan | 1.10 | HTTP request logging |
| dotenv | 16.4 | Environment variable management |
| axios | 1.21 | Server-side HTTP requests |
| nodemon | 3.1 | Development hot reload |

### Infrastructure & External Services
| Service | Purpose |
|---|---|
| MongoDB Atlas | Cloud-hosted NoSQL database |
| Vercel | Frontend hosting and CDN |
| Render | Backend API hosting |
| Gmail SMTP (`smtp.gmail.com:587`) | Direct SMTP email delivery with STARTTLS |
| Resend API | Alternative transactional email API |
| Google Gemini API | AI language model (`gemini-3.5-flash-lite`) |

---

## 🎨 Frontend Architecture

The React frontend follows a **context-based state management** pattern:

```
client/src/
├── context/
│   ├── AuthContext.jsx         # JWT auth state, login/logout/register, verification toasts
│   ├── NavigationContext.jsx   # Active route & navigation tracking
│   ├── PantryContext.jsx       # Per-user pantry state and stats
│   └── RecipeContext.jsx       # Recipe catalog, favorites, saved
├── pages/
│   ├── Home.jsx                # Landing page
│   ├── Explore.jsx             # Recipe discovery and filtering
│   ├── RecipeDetails.jsx       # Individual recipe view + YouTube
│   ├── AIKitchen.jsx           # RasaGen recipe generation
│   ├── SmartPantry.jsx         # Pantry CRUD management
│   ├── MyCookbook.jsx          # Saved recipe collection
│   ├── MealPlanner.jsx         # Weekly meal planning
│   ├── SmartBasketPage.jsx     # Shopping list
│   ├── NutriSensePage.jsx      # Nutrition analytics
│   ├── RasaBotPage.jsx         # AI chat interface
│   ├── Dashboard.jsx           # Analytics overview with charts & verification banner
│   ├── VerifyEmail.jsx         # Dedicated email verification & resend screen
│   ├── Login.jsx               # Auth — login
│   └── Register.jsx            # Auth — registration
├── services/
│   ├── api.js                  # Axios client with Bearer injection & 401 token purge
│   └── authService.js          # Authentication, verifyEmail & resendVerification API calls
└── components/                 # Shared UI components
```

**Routing** is handled by React Router DOM v7 with the following public and protected routes:

| Path | Page | Auth Required | Description |
|---|---|---|---|
| `/` | Home | No | Landing page |
| `/recipes` | Explore Recipes | No | Recipe discovery and filtering |
| `/recipes/:id` | Recipe Details | No | Full recipe view with ingredients & video |
| `/ai-kitchen` | RasaGen AI Kitchen | No | AI recipe generator |
| `/rasabot` | RasaBot Chat | No | Conversational AI chef |
| `/verify-email` | Verify Email | No | Email token verification & resend trigger |
| `/pantry` | Smart Pantry | Yes | Per-user pantry inventory |
| `/basket` / `/smart-basket` | Smart Basket | Yes | JWT-secured shopping list |
| `/cookbook` | My Cookbook | Yes | Saved favorites |
| `/meal-planner` | Meal Planner | Yes | Weekly planning calendar |
| `/nutrisense` | NutriSense | Yes | Nutrient charts & metrics |
| `/dashboard` | Dashboard | Yes | User analytics & account status |
| `/login` | Login | No | User authentication |
| `/register` | Register | No | User registration |

---

## ⚙️ Backend Architecture

The Express.js backend follows an **MVC pattern** with layered middleware:

```
server/src/
├── app.js                      # Express app, CORS, middleware, route mounting
├── server.js                   # Entry point — DB connect, port listen
├── config/
│   └── db.js                   # MongoDB Atlas connection with Mongoose
├── middleware/
│   └── authMiddleware.js       # JWT verification (HS256, fail-secure, protect & optionalAuth)
├── controllers/
│   ├── authController.js       # Register, login, /me, verifyEmail, resendVerification, Google OAuth
│   ├── pantryController.js     # Pantry CRUD with per-user isolation
│   ├── shoppingListController.js  # Basket with JWT-enforced ownership
│   ├── recipeController.js     # Recipe listing, filtering, AI generation
│   └── rasabotController.js    # RasaBot chat endpoint
├── models/
│   ├── User.js                 # User schema (bcrypt hash, verificationToken, isVerified)
│   ├── PantryItem.js           # Pantry item with userId ownership
│   ├── Recipe.js               # Recipe catalog schema
│   └── ShoppingList.js         # Shopping list with userId
├── routes/
│   ├── authRoutes.js           # /api/v1/auth/* (auth & verification routes)
│   ├── pantryRoutes.js         # /api/v1/pantry/* (protected)
│   ├── shoppingListRoutes.js   # /api/v1/basket/* (protected)
│   ├── recipeRoutes.js         # /api/v1/recipes/* (public)
│   └── rasabotRoutes.js        # /api/v1/rasabot/* (public)
├── services/
│   ├── emailService.js         # Dual-provider email service (Gmail SMTP + Resend)
│   ├── geminiService.js        # Google Gemini SDK wrapper
│   └── recipeImageService.js   # Recipe image resolution
├── scripts/
│   └── migrate_passwords.js    # Dry-run password migration helper
├── seed/
│   ├── seedData.json           # Pan-India recipe catalog
│   └── seedRecipes.js          # Database seeding script
├── testEmailVerification.js    # Automated multi-provider email & auth test suite (54 checks)
└── testSecuritySuite.js        # Automated security & data isolation test suite (30 checks)
```

---

## 🗄️ Database Design & MongoDB Integration

RASAVANTA AI uses **MongoDB Atlas** (`cluster0.sd4gg6y.mongodb.net`) with the `rasavanta_ai` database.

### Collections

#### User (`models/User.js`)
```js
{
  id: String,                         // Unique slug (e.g., 'usr-1740540000000', indexed)
  name: String,                       // Full user name (required)
  email: String,                      // Unique, lowercase, indexed
  password: String,                   // bcrypt hash (10 salt rounds; required for 'local')
  googleId: String,                   // Google OAuth subject ID (sparse index)
  authProvider: String,               // 'local' | 'google'
  role: String,                       // Default: 'Home Chef'
  avatar: String,                     // Profile image URL
  favoriteRecipes: [String],          // Array of saved recipe slug IDs
  preferences: {
    cuisine: String,                  // Default: 'All'
    diet: String,                     // Default: 'All'
    language: String                  // Default: 'en'
  },
  isVerified: Boolean,                // Verification state (default: false, indexed)
  verificationToken: String,          // Cryptographic single-use token (sparse index)
  verificationTokenExpiresAt: Date,   // 24-hour expiration timestamp
  lastVerificationSentAt: Date,       // Timestamp for 60s resend cooldown enforcement
  createdAt: Date,                    // Mongoose timestamps
  updatedAt: Date
}
```

#### PantryItem (`models/PantryItem.js`)
```js
{
  id: String,                  // Unique item slug (indexed)
  userId: String,              // Owner reference strictly enforced (indexed)
  name: String,                // Ingredient name (e.g., 'Malai Paneer', indexed)
  category: String,            // 'Vegetables' | 'Dairy' | 'Lentils' | etc.
  quantity: Number,            // Item quantity (default: 1)
  unit: String,                // 'kg', 'g', 'bunch', 'portion', etc.
  purchaseDate: String,        // YYYY-MM-DD
  expiryDate: String,          // YYYY-MM-DD (indexed for freshness queries)
  location: String,            // 'Refrigerator' | 'Freezer' | 'Pantry Shelf' | 'Countertop' | 'Spice Rack'
  createdAt: Date,             // Mongoose timestamps
  updatedAt: Date
}
```

#### ShoppingList (`models/ShoppingList.js`)
```js
{
  id: String,                  // Unique basket slug (indexed)
  userId: String,              // JWT-derived user identity (indexed)
  name: String,                // Default: 'Smart Basket'
  items: [{
    id: String,                // Item slug
    name: String,              // Item name
    quantity: String,          // Quantity string (e.g., '250', '2')
    unit: String,              // 'g', 'kg', 'portion', etc.
    category: String,          // 'Produce', 'Pantry Staples', etc.
    checked: Boolean,          // Completion toggle (default: false)
    inPantry: Boolean,         // Whether present in user's pantry
    sourceRecipes: [String]    // Recipe IDs that generated this item
  }],
  createdAt: Date,             // Mongoose timestamps
  updatedAt: Date
}
```

#### Recipe (`models/Recipe.js`)
```js
{
  id: String,                  // Slug identifier
  title: String,
  description: String,
  cuisine: String,
  region: String,
  diet: String,
  mealType: String,
  prepTime: Number,
  cookTime: Number,
  servings: Number,
  calories: Number,
  nutrition: Object,
  ingredients: Array,
  instructions: Array,
  image: String,
  rating: Number,
  tags: Array
}
```

---

## 🔐 Authentication & Security

RASAVANTA AI implements a production-grade security layer with the following measures:

### Authentication & Verification Flow

```
Register → bcrypt hash (10 rounds) → generate 32-byte token → save user (isVerified: false)
         → dispatch verification email (Gmail SMTP / Resend) with Vercel link
Login    → bcrypt compare → sign JWT (HS256, 7d expiry) → return token
Verify   → token validate → check 24h expiry → set isVerified: true → delete token
Request  → Bearer token → JWT verify → req.user → controller
```

### Security Implementation

| Control | Implementation |
|---|---|
| **Password hashing** | bcryptjs with 10 salt rounds |
| **JWT signing** | HS256 algorithm, 7-day expiry, subject = userId |
| **Secret validation** | Server refuses to start if `JWT_SECRET` < 32 chars |
| **Email verification tokens** | 32-byte cryptographic random hex strings (`crypto.randomBytes`) |
| **Token expiration** | Strictly expires after 24 hours (`verificationTokenExpiresAt`) |
| **Single-use guarantee** | Verification tokens purged upon consumption to prevent replay attacks |
| **Resend abuse guard** | 60-second cooldown per account (`HTTP 429 RESEND_COOLDOWN`) |
| **Credential scrubbing** | Error logs sanitize and redact passwords, App Passwords, and API keys |
| **Middleware enforcement** | `protect` middleware on all pantry, basket, and user routes |
| **Ownership enforcement** | All queries filter by `userId` from verified JWT |
| **IDOR prevention** | Server never trusts client-supplied userId |
| **Google OAuth** | `google-auth-library` token verification with email verification check |
| **Legacy migration** | JIT bcrypt upgrade on first login for old plain-text passwords |

---

## 📧 Email Verification & Multi-Provider Architecture

RASAVANTA AI features a resilient, multi-provider email architecture capable of sending branded verification and transactional emails.

### Verification Workflow

```
[User Registration]
        │
        ▼
Generate 32-byte Hex Token (Expires in 24 Hours)
        │
        ▼
Build Canonical Verification Link:
${CLIENT_URL}/verify-email?token=${token}
        │
        ▼
Dispatch Branded HTML & Text Email (Gmail SMTP / Resend)
        │
        ▼
[User Clicks Email Link] ──▶ React Frontend (/verify-email)
                                    │
                                    ▼
                          POST /api/v1/auth/verify-email
                                    │
                         ┌──────────┴──────────┐
                         │ Valid & < 24 Hours  │
                         ▼                     ▼
                  Set isVerified: true    Invalid/Expired:
                  Purge token fields      Return HTTP 400
                  Return 200 OK           Offer 60s Resend
```

1. **Registration**: Upon registration, an unverified account is created (`isVerified: false`). A secure cryptographic token is generated with a strict 24-hour expiration window.
2. **Canonical URL Dispatch**: The server generates links using `CLIENT_URL` (e.g., `https://rasavanta-ai.vercel.app/verify-email?token=...`), avoiding localhost leaks in production.
3. **Branded HTML Template**: Features RASAVANTA AI styling with emerald green (`#244B39`) and turmeric gold (`#D99A38`), personalized greetings, call-to-action buttons, explicit fallback links, and plain-text alternatives.
4. **Single-Use Enforcement**: Once verified, the token is permanently removed from the user document, preventing token re-use.
5. **Cooldown Guard (60s)**: Resend requests are throttled with a 60-second cooldown timer. Attempting an immediate resend returns `HTTP 429` with `retryAfterSeconds`.

---

### Dual Email Provider Architecture

The email layer (`server/src/services/emailService.js`) abstracts delivery behind a unified interface:

```
                      ┌───────────────────────────┐
                      │    emailService.js        │
                      └─────────────┬─────────────┘
                                    │
               ┌────────────────────┴────────────────────┐
               ▼                                         ▼
   EMAIL_PROVIDER = 'gmail'                  EMAIL_PROVIDER = 'resend'
   Nodemailer (STARTTLS :587)                Resend SDK (HTTPS API)
   smtp.gmail.com                            api.resend.com
   Authenticated via App Password            Authenticated via RESEND_API_KEY
```

- **Gmail SMTP (Nodemailer)**:
  - Transport: `smtp.gmail.com` on Port `587` with explicit STARTTLS (`requireTLS: true`, TLS v1.2+).
  - Authentication: Google Account App Password (16 characters).
  - Sender: `RASAVANTA AI <rasavantaai@gmail.com>`.
- **Resend API**:
  - Transport: REST API via `@resend/resend` SDK over HTTPS (Port 443).
  - Authentication: `RESEND_API_KEY`.
  - Sender: Custom verified domain or test domain `onboarding@resend.dev`.
- **Provider Switching**:
  Set `EMAIL_PROVIDER=gmail` or `EMAIL_PROVIDER=resend`. If omitted, the service auto-detects configured credentials.

---

### Cloud Hosting & Outbound SMTP Port Restrictions

> [!WARNING]
> **Render Free Plan Outbound SMTP Port Block**:
> Cloud hosting providers — notably **Render's Free Tier** — block outbound traffic on standard SMTP ports (`25`, `465`, and `587`) across all free web services to prevent automated email spam.
> 
> - If you configure `EMAIL_PROVIDER=gmail` on a **Render Free** instance, direct SMTP socket connections to `smtp.gmail.com:587` will fail with network errors such as `getaddrinfo ENOTFOUND smtp.gmail.com` or `ETIMEDOUT`.
> - **Solution for Render Free**: Set `EMAIL_PROVIDER=resend`. Because Resend communicates over standard outbound HTTPS (Port 443), it is **never blocked** by Render.
> - **For Self-Hosted / Paid Render**: Gmail SMTP works smoothly on VPS, paid instances, and local development environments where outbound port 587 is unrestricted.

#### Architectural Roadmap: Google Apps Script HTTPS Mail Relay (Planned)
To allow zero-cost Gmail delivery from port-restricted hosts like Render Free without requiring a paid instance or third-party email quota:
- An HTTPS mail relay using a **Google Apps Script Web App** is currently **under evaluation as a future enhancement**.
- *Status*: **Not yet implemented**. Current production deployments should use `EMAIL_PROVIDER=resend` on Render Free or Gmail SMTP on environments with open port 587.

---

## 🤖 Google Gemini AI Integration

RASAVANTA AI integrates Google Gemini AI via the **official `@google/genai` SDK v3.5**.

### Model Configuration
- **Primary model**: `gemini-3.5-flash-lite`
- **Timeout**: 45 seconds per request
- **Rate limiting**: 400ms minimum spacing between requests
- **Retry logic**: 2 attempts per model with exponential backoff on 429/503

### RasaBot Chat API

```
POST /api/v1/rasabot/chat
GET  /api/v1/rasabot/status

Request body:
{
  "message": "How do I make tomato rasam?",
  "messages": [ ...conversation history ],
  "language": "te",
  "pantryIngredients": ["tomato", "tamarind", "pepper"],
  "dietaryPreferences": "Vegetarian"
}
```

### RasaGen Recipe API

```
POST /api/v1/recipes/generate

Request body:
{
  "ingredients": ["paneer", "tomato", "capsicum"],
  "cuisine": "North Indian",
  "diet": "Vegetarian",
  "servings": 4,
  "maxTime": 45,
  "mealType": "Dinner",
  "language": "en"
}
```

---

## 📁 Project Folder Structure

```
Rasavanta AI/
├── client/                          # React frontend
│   ├── public/
│   │   ├── brand/
│   │   │   ├── rasavanta-logo.jpg
│   │   │   └── rasavanta-logo.png
│   │   └── images/
│   │       └── recipes/             # Recipe food photography
│   ├── src/
│   │   ├── context/                 # AuthContext, NavigationContext, PantryContext, RecipeContext
│   │   ├── pages/                   # All application pages including VerifyEmail.jsx
│   │   ├── components/              # Shared UI components & 3D Studio
│   │   ├── services/                # api.js, authService.js, pantryService.js, etc.
│   │   └── main.jsx                 # App entry point
│   ├── vercel.json                  # Vercel SPA rewrite config
│   └── package.json
│
├── server/                          # Node.js Express backend
│   ├── src/
│   │   ├── config/                  # db.js — MongoDB connection
│   │   ├── controllers/             # authController, pantryController, etc.
│   │   ├── middleware/              # authMiddleware.js (JWT protect & optionalAuth)
│   │   ├── models/                  # Mongoose schemas (User, PantryItem, ShoppingList, Recipe)
│   │   ├── routes/                  # Express route definitions (auth, pantry, basket, recipes, rasabot)
│   │   ├── services/                # emailService.js, geminiService.js, recipeImageService.js
│   │   ├── scripts/                 # migrate_passwords.js
│   │   ├── seed/                    # seedData.json, seedRecipes.js
│   │   ├── app.js                   # Express app configuration
│   │   ├── server.js                # Entry point
│   │   ├── testEmailVerification.js # Automated email & auth test suite
│   │   └── testSecuritySuite.js     # Automated security test suite
│   ├── .env.example                 # Sanitized environment template
│   └── package.json
│
├── .gitignore                       # Excludes .env files, node_modules, and build artifacts
└── README.md
```

---

## 📸 Application Screenshots

> _Recipe food imagery included with the project:_

| Dish | Preview |
|---|---|
| Hyderabadi Dum Biryani | `client/public/images/recipes/hyderabadi-dum-biryani.jpg` |
| Masala Dosa | `client/public/images/recipes/masala-dosa.jpg` |
| Paneer Butter Masala | `client/public/images/recipes/paneer-butter-masala.jpg` |
| Idli Sambar | `client/public/images/recipes/idli-sambar.jpg` |
| Gulab Jamun | `client/public/images/recipes/gulab-jamun.jpg` |
| Gutti Vankaya Koora | `client/public/images/recipes/gutti-vankaya-koora.jpg` |
| Vegetable Pulao | `client/public/images/recipes/vegetable-pulao.jpg` |
| South Indian Thali | `client/public/images/recipes/south-indian-thali.jpg` |

🌐 **[View the live application →](https://rasavanta-ai.vercel.app/)**

---

## 🚀 Installation & Local Setup

### Prerequisites

- **Node.js** v18 or higher (LTS recommended)
- **npm** v9 or higher
- **MongoDB Atlas** account (or local MongoDB)
- **Google Gemini API key** — [Get one at Google AI Studio](https://ai.google.dev/)
- **Gmail Account + App Password** (for Gmail SMTP) or **Resend API key** (for Resend)
- **Google Cloud OAuth credentials** (optional, for Google Sign-In)

### 1. Clone the Repository

```bash
git clone https://github.com/shareen2006/Rasavanta-ai.git
cd "Rasavanta-ai"
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

Create your local `.env` files using the templates provided below in the [Environment Variables](#environment-variables-configuration) section.

### 5. Seed the Recipe Database (Optional)

```bash
cd ../server
npm run seed
```

---

## 🔑 Environment Variables Configuration

> [!CAUTION]
> Never commit real credentials to Git. All `.env` files are ignored via `.gitignore` and must contain placeholder values only in public repositories.

### Backend — `server/.env`

Create a file named `server/.env` based on `server/.env.example`:

```env
# Server Port & Mode
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Google OAuth 2.0 Client ID (optional)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# JWT Secret for Session Signing (Minimum 32 characters required)
JWT_SECRET=your_jwt_secret_key_minimum_32_characters

# Client Frontend URLs (Used for CORS and verification links)
CLIENT_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173

# ==============================================================================
# EMAIL SERVICE CONFIGURATION (Multi-Provider: Gmail SMTP & Resend)
# ==============================================================================
# Active provider: 'gmail' or 'resend'
EMAIL_PROVIDER=gmail

# Provider 1: Gmail SMTP (via Nodemailer with STARTTLS)
# Obtain a 16-character App Password at: https://myaccount.google.com/apppasswords
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_character_gmail_app_password
EMAIL_FROM=RASAVANTA AI <your_email@gmail.com>

# Provider 2: Resend API (Alternative Provider)
# Obtain API key at: https://resend.com/api-keys
RESEND_API_KEY=re_your_resend_api_key

# Optional YouTube Data API v3 (for on-demand tutorial video search)
YOUTUBE_API_KEY=your_youtube_data_api_key_here
```

### Frontend — `client/.env`

```env
# Backend API base URL — MUST include /api/v1
# Defaults to http://localhost:5000/api/v1 locally or https://rasavanta-ai.onrender.com/api/v1 in production
VITE_API_BASE_URL=http://localhost:5000/api/v1

# Google OAuth Client ID (optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

---

## ▶️ Running the Application

### Development Mode

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Server starts at http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Frontend starts at http://localhost:5173
```

### Production Build (Frontend)

```bash
cd client
npm run build
# Compiles to client/dist/
```

### Available Scripts

#### Backend (`server/`)

| Command | Description |
|---|---|
| `npm start` | Start production Express server |
| `npm run dev` | Start development server with nodemon hot reload |
| `npm run seed` | Seed MongoDB with regional recipe catalog |
| `npm test` | Run comprehensive end-to-end integration tests |
| `npm run test:db` | Test MongoDB Atlas CRUD operations |
| `npm run test:gemini` | Test Google Gemini API integration |
| `npm run test:security` | Run 30 security, auth, and data isolation assertions |
| `npm run migrate:passwords` | Dry-run bcrypt password migration helper |

#### Frontend (`client/`)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build optimized production bundles |
| `npm run preview` | Preview production build locally |

---

## 🧪 Automated Testing & Security Suites

RASAVANTA AI includes automated test suites covering authentication, data isolation, and multi-provider email verification:

### 1. Multi-Provider Email & Auth Suite (`server/src/testEmailVerification.js`)
Tests email provider switching, STARTTLS transport, canonical URL generation, token consumption, single-use guards, and resend rate limits with zero outbound email traffic via a mock JSON transport.

```bash
node server/src/testEmailVerification.js
```

**Verified Test Results:**
- ✅ **54 / 54 PASSED** (0 failed)
- Covers: Provider switching (`gmail` vs `resend`), canonical URL generation (`${CLIENT_URL}/verify-email?token=...`), 24h expiration, single-use token invalidation, 60s resend cooldown, missing credential error handling, and API key sanitization.

### 2. Core Security & Data Isolation Suite (`server/src/testSecuritySuite.js`)
Validates password hashing, JWT signing and tamper rejection, route protection, and Broken Object Level Authorization (BOLA/IDOR) defense.

```bash
node server/src/testSecuritySuite.js
```

**Verified Test Results:**
- ✅ **30 / 30 PASSED** (0 failed)
- Covers: Input validation, bcrypt hashing, JWT issuance, `/auth/me` identity resolution, forged token rejection, and strict cross-user data isolation on Pantry and Smart Basket collections.

---

## 🛠️ Troubleshooting & FAQs

### 1. Render Free Outbound SMTP Failure (`getaddrinfo ENOTFOUND smtp.gmail.com` or `ETIMEDOUT`)
- **Cause**: Render Free blocks outbound TCP connections on SMTP ports 25, 465, and 587.
- **Solution**: In Render Dashboard → Environment, change `EMAIL_PROVIDER` to `resend` and supply `RESEND_API_KEY`. Resend connects over standard HTTPS port 443 and will never be blocked.

### 2. Gmail SMTP Authentication Failure (`535-5.7.8 Username and Password not accepted`)
- **Cause**: Using your normal Google account password instead of an App Password, or 2-Step Verification is disabled.
- **Solution**:
  1. Enable 2-Step Verification on your Google Account: [https://myaccount.google.com/security](https://myaccount.google.com/security)
  2. Generate a 16-character App Password at: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
  3. Paste the 16-character string into `SMTP_PASS` in `server/.env`.

### 3. Verification Link Shows "Expired" (`TOKEN_EXPIRED`)
- **Cause**: Verification tokens have a strict 24-hour lifetime for security.
- **Solution**: Navigate to `/verify-email` in the app, enter your registered email address, and click "Resend Verification Email" to receive a fresh token.

### 4. Resend Rate Limit (`RESEND_COOLDOWN` / HTTP 429)
- **Cause**: Attempting to resend a verification email within 60 seconds of the previous dispatch.
- **Solution**: The UI will display a live countdown timer. Wait until the 60-second window elapses before triggering another resend.

---

## 📡 API Documentation

### Base URL
- **Local**: `http://localhost:5000/api/v1`
- **Production**: `https://rasavanta-ai.onrender.com/api/v1`

### Health Check

```
GET /api/health
```
Returns server status, MongoDB Atlas connectivity, and Gemini AI status. No authentication required.

---

### Authentication & Verification — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | No | Register new user and dispatch verification email |
| `POST` | `/api/v1/auth/login` | No | Login and receive JWT |
| `POST` | `/api/v1/auth/google` | No | Google OAuth sign-in |
| `GET` | `/api/v1/auth/me` | ✅ Required | Get authenticated user profile |
| `POST` | `/api/v1/auth/verify-email` | No | Verify account using token (`{ "token": "..." }`) |
| `GET` | `/api/v1/auth/verify-email` | No | Verify account via email click (`?token=...`) |
| `POST` | `/api/v1/auth/resend-verification` | Optional | Resend verification email with 60s cooldown |

**Register Request:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "SecurePassword123"
}
```

**Register Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr-1740540000000",
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "role": "Home Chef",
    "isVerified": false
  },
  "emailSent": true,
  "source": "mongodb"
}
```

**Verify Email Request:**
```json
{
  "token": "c0ffee1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
}
```

**Verify Email Response (200 OK):**
```json
{
  "success": true,
  "message": "Email address verified successfully! Your account is active.",
  "user": {
    "id": "usr-1740540000000",
    "email": "priya@example.com",
    "isVerified": true
  }
}
```

**Resend Verification Request:**
```json
{
  "email": "priya@example.com"
}
```

---

### Pantry — `/api/v1/pantry`

> All routes require `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/pantry` | Get authenticated user's pantry items |
| `POST` | `/api/v1/pantry` | Add a new pantry item |
| `PUT` | `/api/v1/pantry/:id` | Update a pantry item |
| `DELETE` | `/api/v1/pantry/:id` | Delete a pantry item |

---

### Shopping Basket — `/api/v1/basket`

> All routes require `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/basket` | Get authenticated user's basket |
| `POST` | `/api/v1/basket` | Update basket items |

Also accessible at `/api/v1/shopping-list` (alias).

---

### Recipes — `/api/v1/recipes`

> Public endpoints — no authentication required

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/recipes` | List all recipes with optional filters |
| `GET` | `/api/v1/recipes/categories` | Get available cuisine/diet categories |
| `GET` | `/api/v1/recipes/tutorials/youtube` | Get YouTube tutorial links |
| `GET` | `/api/v1/recipes/:id` | Get a single recipe by ID |
| `POST` | `/api/v1/recipes/:id/favorite` | Toggle recipe favorite |
| `POST` | `/api/v1/recipes/generate` | Generate a new AI recipe (RasaGen) |

---

### RasaBot — `/api/v1/rasabot`

> Public endpoints — no authentication required

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/rasabot/chat` | Send a message to RasaBot |
| `GET` | `/api/v1/rasabot/status` | Check Gemini API configuration status |

---

## ☁️ Deployment Architecture

```
User Browser
    │
    ▼
Vercel CDN (rasavanta-ai.vercel.app)
    │  React SPA — served from client/dist/
    │  SPA rewrites via vercel.json → index.html
    │
    ▼
Render (rasavanta-ai.onrender.com)
    │  Node.js + Express server
    │  Environment variables configured in Render Dashboard
    │
    ├──▶ MongoDB Atlas (cluster0.sd4gg6y.mongodb.net)
    │     rasavanta_ai database
    │
    ├──▶ Transactional Email Dispatch:
    │     • Resend API (HTTPS port 443 — Recommended for Render Free)
    │     • Gmail SMTP (STARTTLS port 587 — Paid Render / Dedicated host)
    │
    └──▶ Google Gemini API (ai.google.dev)
          gemini-3.5-flash-lite
```

### Deployment Configuration Matrix

| Platform | Variable | Recommended Production Value | Description |
|---|---|---|---|
| **Vercel** | `VITE_API_BASE_URL` | `https://rasavanta-ai.onrender.com/api/v1` | Points frontend Axios client to live Render API |
| **Render** | `NODE_ENV` | `production` | Enables production security optimizations |
| **Render** | `CLIENT_URL` | `https://rasavanta-ai.vercel.app` | Canonical URL for email verification links |
| **Render** | `FRONTEND_URL` | `https://rasavanta-ai.vercel.app` | CORS allowed origin |
| **Render** | `JWT_SECRET` | *(Random 32+ char secret)* | Signs and validates user session tokens |
| **Render** | `EMAIL_PROVIDER` | `resend` (on Render Free) or `gmail` | Email provider selector |
| **Render** | `RESEND_API_KEY` | `re_...` | Required if `EMAIL_PROVIDER=resend` |
| **Render** | `SMTP_PASS` | *(16-char App Password)* | Required if `EMAIL_PROVIDER=gmail` |

---

## 🔮 Future Enhancements

| Feature | Description |
|---|---|
| 📮 **Google Apps Script HTTPS Mail Relay** | Zero-cost Gmail delivery over HTTPS (port 443) for hosts blocking SMTP sockets |
| 📷 **Ingredient Visual Recognition** | Camera-based pantry item identification using AI vision |
| 🧬 **Personalized Nutrition Profiling** | Health-condition-aware dietary recommendations |
| 🛍️ **Smart Shopping Suggestions** | AI-suggested shopping list based on pantry gaps and meal plan |
| 🔔 **Expiry Notifications** | Push alerts for pantry items nearing expiry |
| 📱 **Progressive Web App (PWA)** | Offline recipe access and push notifications |
| 🏪 **Grocery API Integration** | Real-time local grocery pricing and availability |
| 👥 **Community Recipes** | User-contributed recipe submissions with ratings |
| 📲 **Mobile App** | React Native companion app for iOS and Android |
| 🎯 **Meal Plan Automation** | AI-generated weekly meal plans based on pantry inventory |
| 🌡️ **IoT Kitchen Integration** | Smart device connectivity for cooking assistance |

---

## 🤝 Contributing Guidelines

Contributions are welcome! Here is how to contribute:

### Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/Rasavanta-ai.git
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Make your changes with clear, focused commits.
5. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** against the `main` branch.

### Code Standards

- Follow existing code style and naming conventions.
- Keep controllers thin — business logic belongs in services.
- All new backend routes that handle user data must use the `protect` middleware.
- Never commit `.env` files or hardcode credentials.
- Write descriptive commit messages.

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Shaik Shareen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👩‍💻 Developer & Contact

<div align="center">

### Shaik Shareen

**AI & Machine Learning Student | Full-Stack Developer**

[![GitHub](https://img.shields.io/badge/GitHub-shareen2006-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shareen2006)

<br/>

*RASAVANTA AI — Rooted in Taste. Powered by Intelligence.*

Built with ❤️ and a deep love for Indian cuisine and intelligent technology.

</div>

---

<div align="center">

**[⬆ Back to Top](#rasavanta-ai)**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-rasavanta--ai.vercel.app-6C63FF?style=for-the-badge)](https://rasavanta-ai.vercel.app/)

</div>
