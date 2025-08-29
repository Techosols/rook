git clone <https://github.com/Techosols/rook.git>
src/
├── components/          # Reusable UI components
│   ├── join/           # Join flow specific components
│   ├── Banner.jsx      # Landing page banner
│   ├── Header.jsx      # Navigation header
│   ├── Tab.jsx         # Tab navigation component
│   └── ...
├── contexts/           # React Context providers
│   ├── Auth/          # Authentication context
│   ├── Tab/           # Tab navigation context
│   └── Theme/         # Theme context
├── hooks/             # Custom React hooks
├── pages/             # Page components
│   └── Tabs/          # Tab content components
├── services/          # API services
└── utils/             # Utility functions
```

# Rook - Dating & Matching Platform

A modern, full-featured dating and matching platform built with React, Vite, and Auth0. Rook offers a secure, multi-step onboarding process, dynamic tab-based navigation, and a beautiful, responsive UI.

---

## ✨ Features

### 🔐 Authentication System
- **Google OAuth via Auth0**: Secure, industry-standard authentication.
- **Two-Stage Registration**: 
  1. Google sign-in
  2. Profile completion for full access
- **Callback URL Handling**: Seamless step/tab restoration after authentication.

### 📱 Tab-Based Navigation
- **Dynamic Tabs**: Different tabs for authenticated and non-authenticated users.
- **State Persistence**: Remembers your last active tab and onboarding step.

### 👤 User Onboarding
- **Multi-Step Join Process**:
  1. Terms & Agreement
  2. Signup Options (Google OAuth)
  3. Profile Information
  4. Payment Processing
- **Profile Form**: Collects legal name, date of birth, preferences, and matching criteria.

### 🎨 UI/UX
- **Dark/Light Theme**: System preference detection.
- **Responsive Design**: Mobile-first with TailwindCSS.
- **Material-UI Components**: Enhanced user experience.
- **Custom Branding**: Rook logo and theme colors.

---

## 🛠️ Tech Stack

- **React 19**: Modern React features.
- **Vite**: Fast build tool and dev server.
- **TailwindCSS 4**: Utility-first CSS.
- **Material-UI (MUI)**: Component library.
- **Lucide React**: Icon library.
- **Auth0**: Secure authentication.
- **React Context**: State management.
- **React Query**: Server state management.
- **Axios**: API client.
- **React Router DOM**: Routing.
- **ESLint**: Linting and formatting.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Auth0 account

### Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_SERVER_BASE_URL=https://user-intake-service.rook.love/v2/
VITE_SERVER_API_KEY=your_api_key_here

VITE_AUTH0_CLIENT_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

### Installation

```bash
git clone https://github.com/Techosols/rook.git
cd rook
npm install
npm run dev
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🏗️ Architecture

### Project Structure

```
src/
├── components/    # Reusable UI components (join flow, banner, header, tab, etc.)
├── contexts/      # React Context providers (Auth, Tab, Theme)
├── hooks/         # Custom React hooks
├── pages/         # Page components (Tabs, Home, etc.)
├── services/      # API services (user, api)
└── utils/         # Utility functions
```

### Authentication Flow

1. User sees non-authenticated tabs.
2. Clicks "Sign up with Google" → Auth0.
3. Auth0 callback returns with token.
4. User completes profile.
5. Registration complete → authenticated tabs/features.

### State Management

- **Auth0**: OAuth authentication.
- **Auth Context**: Tracks registration and profile completion.
- **Tab Context**: Manages active/available tabs.
- **Theme Context**: Dark/light mode.

---

## 🔧 Configuration

### Auth0 Setup

1. Create Auth0 application.
2. Configure callback URLs:
   - Dev: `http://localhost:5173`
   - Prod: `https://yourdomain.com`
3. Enable Google social connection.
4. Set environment variables.

### API Integration

- Base URL: `VITE_SERVER_BASE_URL`
- API Key: `VITE_SERVER_API_KEY`
- Axios interceptors for request/response.
- Handles authentication, errors, and offline fallback.

---

## 🚢 Deployment

```bash
npm run build
```

- Set all environment variables in production.
- Configure Auth0 callback URLs for your domain.
- Set up CORS for API endpoints.

---


