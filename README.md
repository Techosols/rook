# Rook - Dating & Matching Platform

A modern React-based dating and matching platform built with Vite, featuring tab-based navigation, secure authentication, and comprehensive user onboarding.

## ✨ Features

### 🔐 Authentication System
- **Google OAuth Integration** via Auth0
- **Two-Stage Authentication Flow**:
  - Stage 1: Google sign-in authentication
  - Stage 2: Profile completion for full registration
- **Callback URL Handling** with tab/step restoration after authentication

### 📱 Tab-Based Navigation
- **Dynamic Tab System** with different tabs for authenticated vs. non-authenticated users
- **Non-Authenticated Tabs**: Background Checks, Pricing, Filters, Pictures, Community, Stats, Join
- **Authenticated Tabs**: Matches, You, Filters, Messages
- **State Persistence** across authentication flows

### 👤 User Onboarding
- **Multi-Step Join Process**:
  1. Terms & Agreement
  2. Signup Options (Google OAuth)
  3. Profile Information Collection
  4. Payment Processing
- **Profile Form** with legal name, date of birth, preferences, and matching criteria

### 🎨 UI/UX
- **Dark/Light Theme Support** with system preference detection
- **Responsive Design** with mobile-first approach using TailwindCSS
- **Material-UI Components** for enhanced user experience
- **Custom Branding** with Rook logo and theme colors

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **TailwindCSS 4** - Utility-first CSS framework
- **Material-UI (MUI)** - React component library
- **Lucide React** - Beautiful icon library

### Authentication & State Management
- **Auth0** - Secure authentication service
- **React Context** - Custom auth state management
- **React Query (TanStack Query)** - Server state management
- **Local Storage** - Client-side state persistence

### Development Tools
- **ESLint** - Code linting and formatting
- **Axios** - HTTP client for API calls
- **React Router DOM** - Client-side routing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Auth0 account for authentication

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
# Clone the repository
git clone https://github.com/Techosols/rook.git
cd rook

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🏗️ Architecture

### Project Structure
```
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

### Authentication Flow

1. **Initial State**: User sees non-authenticated tabs
2. **Google Sign-in**: User clicks "Sign up with Google" → redirects to Auth0
3. **Auth0 Callback**: Returns to app with authentication token
4. **Profile Step**: User automatically moved to profile completion
5. **Registration Complete**: After profile submission, user is fully authenticated
6. **Authenticated UI**: User sees authenticated tabs and features

### State Management

- **Auth0 State**: Handles OAuth authentication with Google
- **Custom Auth Context**: Tracks full registration completion
- **Tab Context**: Manages active tab and available tabs
- **Theme Context**: Handles dark/light mode preferences

## 🔧 Configuration

### Auth0 Setup
1. Create Auth0 application
2. Configure callback URLs:
   - Development: `http://localhost:5173`
   - Production: `https://yourdomain.com`
3. Enable Google social connection
4. Configure environment variables

### API Integration
- Base URL configured via `VITE_SERVER_BASE_URL`
- API key authentication via `VITE_SERVER_API_KEY`
- Axios interceptors for request/response handling
- Graceful fallback for offline development

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Environment Considerations
- Ensure all environment variables are set in production
- Configure Auth0 callback URLs for production domain
- Set up proper CORS policies for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@rook.love or join our community discussions.

---

