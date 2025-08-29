
# Custom Hooks

This folder contains reusable React hooks for accessing and managing application-wide state via React Context. Each hook provides a simple interface to the corresponding context provider.

---

## Available Hooks

- **useAuth**  
	Access authentication state and methods from the Auth context.  
	_Usage:_  
	```js
	import useAuth from './useAuth';
	const { user, isAuthenticated, login, logout } = useAuth();
	```

- **useTab**  
	Access the current tab, tab list, and tab switching methods from the Tab context.  
	_Usage:_  
	```js
	import useTab from './useTab';
	const { activeTab, setActiveTab, tabs } = useTab();
	```

- **useTheme**  
	Access and update the current theme (dark/light) from the Theme context.  
	_Usage:_  
	```js
	import useTheme from './useTheme';
	const { theme, setTheme } = useTheme();
	```

---

## Best Practices

- Always use these hooks inside their respective context providers (`AuthProvider`, `TabProvider`, `ThemeProvider`).
- Do not use hooks inside service or utility files—use them only in React components or other hooks.

---