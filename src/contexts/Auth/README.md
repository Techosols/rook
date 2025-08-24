# Authentication Context

The Authentication Context provides comprehensive authentication functionality for the Rook dating platform, integrating Auth0 with custom user profile management.

## Features

### 🔐 Authentication States
- **isLoggedIn**: Boolean indicating if user is fully authenticated and has completed profile
- **isAuthenticated**: Auth0 authentication state
- **isLoading**: Loading state for authentication operations
- **isProfileComplete**: Whether user has completed their profile setup
- **needsProfileCompletion**: Helper flag indicating user needs to complete profile
- **user**: Auth0 user object
- **userProfile**: Custom user profile data from API
- **accessToken**: Auth0 access token for API calls
- **error**: Authentication error messages

### 🚀 Authentication Methods

#### Login Methods
- **login()**: Redirect-based login flow
- **loginWithPopup()**: Popup-based login (better UX)
- **register()**: Redirect-based registration
- **registerWithPopup()**: Popup-based registration

#### Profile Management
- **createUserProfile(profileData)**: Create initial user profile
- **updateUserProfile(profileData)**: Update existing profile
- **checkProfileCompletion()**: Verify if profile is complete

#### Utility Methods
- **logout()**: Complete logout with cleanup
- **refreshAuth()**: Refresh authentication state
- **getUserData()**: Get combined Auth0 and profile data

## Usage Examples

### Basic Authentication Check
```jsx
import useAuth from '../hooks/useAuth';

function MyComponent() {
  const { isLoggedIn, isLoading, login } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  if (!isLoggedIn) {
    return <button onClick={login}>Login</button>;
  }
  
  return <div>Welcome!</div>;
}
```

### Profile Completion Flow
```jsx
import useAuth from '../hooks/useAuth';

function ProfileSetup() {
  const { 
    needsProfileCompletion, 
    createUserProfile, 
    user 
  } = useAuth();
  
  const handleSubmit = async (formData) => {
    try {
      await createUserProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: user.email,
        // ... other fields
      });
      // User is now fully authenticated
    } catch (error) {
      console.error('Profile creation failed:', error);
    }
  };
  
  if (!needsProfileCompletion) return null;
  
  return <ProfileForm onSubmit={handleSubmit} />;
}
```

### Protected Route
```jsx
import useAuth from '../hooks/useAuth';

function ProtectedComponent() {
  const { isLoggedIn, isLoading, login } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  if (!isLoggedIn) {
    return (
      <div>
        <p>Please log in to access this feature</p>
        <button onClick={login}>Login</button>
      </div>
    );
  }
  
  return <div>Protected content here</div>;
}
```

### Registration with Profile
```jsx
import useAuth from '../hooks/useAuth';

function Registration() {
  const { registerWithPopup, createUserProfile, needsProfileCompletion } = useAuth();
  
  const handleRegister = async () => {
    try {
      await registerWithPopup();
      // After successful registration, user will need to complete profile
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  
  return <button onClick={handleRegister}>Sign Up</button>;
}
```

## Authentication Flow

### Initial State
1. User visits app
2. `AuthProvider` initializes
3. Checks Auth0 authentication status
4. If authenticated, verifies profile completion

### Login Flow
1. User clicks login
2. Redirected to Auth0 or popup opens
3. User authenticates with Google/other provider
4. Returns to app with Auth0 token
5. `AuthProvider` gets access token
6. Checks if user profile exists
7. Sets appropriate authentication state

### Registration Flow
1. User clicks register
2. Auth0 signup flow (same as login)
3. After Auth0 authentication, `needsProfileCompletion` = true
4. User completes profile form
5. `createUserProfile()` called
6. Profile saved to API
7. `isLoggedIn` = true, user fully authenticated

### Logout Flow
1. User clicks logout
2. Local state cleared
3. Auth0 logout called
4. User redirected to home page

## API Integration

The authentication context automatically:
- Sets `Authorization: Bearer {token}` header for all API calls
- Handles token refresh
- Clears authorization on logout
- Provides error handling for API calls

## Error Handling

All authentication methods include comprehensive error handling:
- Auth0 errors are captured and displayed
- API errors are handled with appropriate user messages
- Network errors are handled gracefully
- Toast notifications inform users of success/failure

## State Persistence

- Authentication state is managed by Auth0
- Profile completion state is checked on app initialization
- Callback URLs and steps are preserved during auth flows
- Local storage used for temporary state during redirects

## Dependencies

- `@auth0/auth0-react`: OAuth authentication
- `react-toastify`: User notifications
- `axios`: API communication (via services/api.js)

## Security Considerations

- Access tokens are stored securely by Auth0
- API calls use Bearer token authentication
- Tokens are automatically refreshed by Auth0
- Logout clears all authentication state
- HTTPS required for production use
