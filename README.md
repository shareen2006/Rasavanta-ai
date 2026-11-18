# 🍲 RASAVANTA AI — Rooted in Taste. Powered by Intelligence.

> **An Intelligent Culinary Platform for Smarter Cooking, Recipe Discovery & Sustainable Kitchens**

\<p align="center">
&#x20; \<a href="[https://rasavanta-ai.vercel.app/](https://rasavanta-ai.vercel.app/)">Live Demo\</a> ·
&#x20; \<a href="[https://github.com/shareen2006/Rasavanta-ai](https://github.com/shareen2006/Rasavanta-ai)">GitHub Repository\</a>
\</p>

\<p align="center">
&#x20; \<img src="[https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react&logoColor=white](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react\&logoColor=white)" alt="React 19">
&#x20; \<img src="[https://img.shields.io/badge/Build-Vite%206-646CFF?logo=vite&logoColor=white](https://img.shields.io/badge/Build-Vite%206-646CFF?logo=vite\&logoColor=white)" alt="Vite">
&#x20; \<img src="[https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs&logoColor=white](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs\&logoColor=white)" alt="Node.js">
&#x20; \<img src="[https://img.shields.io/badge/API-Express.js-000000?logo=express&logoColor=white](https://img.shields.io/badge/API-Express.js-000000?logo=express\&logoColor=white)" alt="Express">
&#x20; \<img src="[https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb\&logoColor=white)" alt="MongoDB">
&#x20; \<img src="[https://img.shields.io/badge/AI-Google%20Gemini-8E75B2?logo=googlegemini&logoColor=white](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2?logo=googlegemini\&logoColor=white)" alt="Google Gemini">
&#x20; \<img src="[https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?logo=tailwindcss\&logoColor=white)" alt="Tailwind CSS">
\</p>

---

## 📖 Project Overview

**RASAVANTA AI** is an AI-powered culinary intelligence platform designed to transform everyday cooking into a smarter, more personalized, and sustainable experience.

The platform helps users discover recipes using available ingredients, explore regional cuisines, manage kitchen inventory, understand nutritional information, and reduce household food waste.

Powered by modern web technologies and Google Gemini AI integration, RASAVANTA AI brings culinary knowledge, intelligent assistance, and sustainable kitchen management together in one platform.

### The Meaning Behind RASAVANTA

- **Rasa (రస / रस):** Taste, essence, flavour, and culinary experience.
- **Vanta (వంట):** Cooking, inspired by the Telugu language.

**Our Vision:** Connecting traditional culinary knowledge with modern artificial intelligence.

---

## 🌟 Key Features

| Feature                         | Description                                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 🤖 **RasaBot AI**               | Conversational culinary assistant for cooking questions, recipes, ingredient substitutions, and kitchen guidance. |
| 🍳 **AI Kitchen — RasaGen**     | Generate personalized recipe suggestions using available ingredients and cooking preferences.                     |
| 🔍 **Recipe Discovery**         | Explore recipes by ingredients, cuisine, dietary preferences, difficulty, and cooking time.                       |
| 🌍 **Multilingual Experience**  | Accessible interface supporting nine Indian languages.                                                            |
| 🥬 **Smart Pantry**             | Manage kitchen inventory, quantities, storage locations, and expiry dates.                                        |
| ♻️ **Zero-Waste Cooking**       | Identify ingredients nearing expiry and discover ways to use them.                                                |
| 📖 **Digital Cookbook**         | Save recipes, manage favorites, and organize personal cooking collections.                                        |
| ⏱️ **Interactive Cooking Mode** | Follow step-by-step cooking instructions with timers and progress tracking.                                       |
| 📊 **Nutrition Dashboard**      | Explore nutritional information, cooking activity, and pantry health analytics.                                   |
| 🔐 **User Authentication**      | Account registration, login, and personalized application access.                                                 |

---

## 🤖 AI-Powered Culinary Intelligence

RASAVANTA AI integrates artificial intelligence into everyday kitchen activities.

### RasaBot — AI Culinary Assistant

RasaBot is designed as a conversational cooking companion that helps users:

- Discover recipes and cooking methods.
- Understand ingredient combinations.
- Find alternatives for unavailable ingredients.
- Troubleshoot common cooking problems.
- Explore regional culinary knowledge.
- Receive multilingual culinary assistance.

### RasaGen — Intelligent Recipe Generation

The AI Kitchen provides a personalized recipe discovery experience using:

- Available ingredients.
- Regional cuisine preferences.
- Dietary requirements.
- Allergies and ingredient dislikes.
- Cooking time and serving preferences.
- Preferred output language.

Google Gemini API integration powers AI capabilities through the backend.

---

## 🌐 Multilingual Support

RASAVANTA AI is designed to make culinary knowledge accessible across nine Indian languages.

| Language           | Code |
| ------------------ | ---- |
| English            | `en` |
| తెలుగు — Telugu    | `te` |
| हिन्दी — Hindi     | `hi` |
| தமிழ் — Tamil      | `ta` |
| ಕನ್ನಡ — Kannada    | `kn` |
| മലയാളം — Malayalam | `ml` |
| বাংলা — Bengali    | `bn` |
| ગુજરાતી — Gujarati | `gu` |
| मराठी — Marathi    | `mr` |

Language preferences are managed using `i18next` and `react-i18next`.

---

## 🏗️ Technical Architecture

```text
RASAVANTA AI/
│
├── client/
│   ├── public/
│   │   └── brand/
│   │       └── rasavanta-logo.png
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── i18n/
│   │   ├── locales/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── README.md
└── package.json
```

*The backend tree is a conceptual overview; update directory names to match the actual repository.*

---

## ⚙️ Technology Stack

### Frontend

- React 19
- Vite 6
- JavaScript (ES6+)
- Tailwind CSS
- React Router DOM
- Framer Motion

### Backend

- Node.js
- Express.js
- REST API

### Database

- MongoDB

### Artificial Intelligence

- Google Gemini API

### Libraries & Tools

- Axios
- Recharts
- Embla Carousel
- i18next
- React Hot Toast
- Canvas Confetti
- Git & GitHub
- Vercel
- Render

---

## 🚀 Quickstart & Setup Guide

### Prerequisites

- Node.js 18 or later
- npm
- MongoDB connection
- Google Gemini API key for AI-powered features

### 1. Clone the Repository

```bash
git clone https://github.com/shareen2006/Rasavanta-ai.git

cd Rasavanta-ai
```

### 2. Install Dependencies

```bash
npm install
```

If the frontend has a separate package configuration:

```bash
cd client
npm install
```

### 3. Configure Environment Variables

Create the required `.env` files based on your project configuration.

**Frontend — `client/.env`**

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

**Backend — `server/.env`**

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
```

Use the actual environment variable names required by your backend configuration.

**Security:** Never commit API keys, database credentials, JWT secrets, or private environment files to GitHub.

### 4. Start the Backend

```bash
cd server
npm install
npm run dev
```

### 5. Start the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

---

## 🧪 Build & Verification

### Frontend Production Build

```bash
cd client
npm run build
```

### Development Server

```bash
npm run dev
```

Run backend tests using the test command configured in the server's `package.json`.

---

## ☁️ Deployment

RASAVANTA AI is deployed using cloud-based application services.

| Component        | Platform          |
| ---------------- | ----------------- |
| Frontend Hosting | Vercel            |
| Backend Hosting  | Render            |
| Database         | MongoDB           |
| AI Integration   | Google Gemini API |

\<details>
\<summary>\<strong>Application Links\</strong>\</summary>

- **Live Application:** [https://rasavanta-ai.vercel.app/](https://rasavanta-ai.vercel.app/)
- **GitHub Repository:** [https://github.com/shareen2006/Rasavanta-ai](https://github.com/shareen2006/Rasavanta-ai)

\</details>

---

## 🔮 Future Enhancements

- More personalized AI-powered meal recommendations.
- Improved context-aware culinary conversations.
- Voice-enabled cooking assistance.
- Ingredient recognition using food images.
- Personalized nutrition and meal planning.
- Expanded regional recipe knowledge.
- Enhanced food waste tracking and sustainability insights.

---

## 👩‍💻 Author

**Shaik Shareen**

Artificial Intelligence & Machine Learning Student

- **GitHub:** [@shareen2006](https://github.com/shareen2006)
- **LinkedIn:** [Shaik Shareen](https://linkedin.com/in/shaikshareen12)

---

## 📄 License

Add the project's chosen open-source license here once it has been selected and included in the repository.

---

\<p align="center">   \<strong>RASAVANTA AI\</strong>   \<br>   \<em>Rooted in Taste. Powered by Intelligence.\</em>   \<br>\<br>   Made with ❤️ for smarter and more sustainable cooking. \</p>
