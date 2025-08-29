
# Services Directory

This folder contains all API integrations and service modules for the Rook platform. Services are responsible for communicating with backend APIs, handling authentication tokens, and providing reusable business logic for the application.

---

## Structure

- **api.js**  
	Centralized Axios instance with environment-based configuration, request/response interceptors, and API key support. Handles authentication headers and error responses globally.

- **user.js**  
	User-related API service. Handles:
	- PII verification and duplicate prevention
	- User status checks and error handling
	- User registration and profile updates
	- Existence checks by email
	- Status updates (active, paused, etc.)
	- Displays user-friendly toast notifications for all API errors

---

## Usage

Import the relevant service in your component or context:

```js
import userService from '../services/user';

// Example: Register a new user
await userService.registerNewUser(formData);
```

All service methods return Promises and handle errors with toast notifications for a better user experience.

---

## Best Practices

- Do not use React hooks inside service files.
- Keep all API logic and error handling in services for separation of concerns.
- Use the exported service objects (e.g., `userService`) in your React components, hooks, or contexts.

---
