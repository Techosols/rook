 
# Contexts

This folder contains all React Context providers for global state management in the Rook platform. Each context encapsulates a specific domain of application state and exposes it via a custom provider and hook.

---

## Available Contexts

- **Auth Context**
	- Provides authentication state and methods using Auth0.
	- Handles login, logout, registration, profile completion, and user state.
	- See: `AuthContext.jsx`, `AuthProvider.jsx`, and detailed usage in `Auth/README.md`.

- **Tab Context**
	- Manages the active tab, available tabs, and tab switching logic.
	- Persists the user's last active tab in localStorage.
	- See: `TabContext.jsx`, `TabProvider.jsx`.

- **Theme Context**
	- Manages dark/light theme state and system preference detection.
	- Provides methods to toggle or set the theme.
	- See: `ThemeContext.jsx`, `ThemeProvider.jsx`.

---

## Usage

Wrap your app with all providers in `src/Providers.jsx`:

```jsx
import Providers from './Providers';

<Providers>
	<App />
</Providers>
```

Access context values and methods using the corresponding custom hooks (`useAuth`, `useTab`, `useTheme`) in your components.

---