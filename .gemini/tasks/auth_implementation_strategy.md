### 1. Understanding the Goal

My objective is to devise a strategic plan for implementing a robust authentication system within the existing React application. This involves:

1.  **Creating a `.env` file** to securely store the base URL for the backend API.
2.  **Developing a login page** that communicates with the backend to authenticate users.
3.  **Implementing a system to manage authentication tokens** (access and refresh tokens) received from the backend.
4.  **Creating protected routes** that check for user authentication on every request.
5.  **Redirecting unauthenticated users** to the login page.
6.  **Integrating the authentication state** throughout the application to ensure a seamless user experience.

### 2. Investigation & Analysis

Before proposing a strategy, a thorough investigation of the current codebase is necessary to ensure the new implementation aligns with existing patterns and conventions.

1.  **Analyze Existing Authentication Components:**
    *   **File:** `src/pages/Login.tsx`
    *   **File:** `src/components/login-form.tsx`
    *   **Objective:** Understand the current implementation of the login page and form. Determine if they are functional or placeholders. Assess the existing UI and logic to see what can be reused.

2.  **Examine Routing Configuration:**
    *   **File:** `src/App.tsx`
    *   **Objective:** Analyze the current routing setup. Identify how routes are defined and rendered. This is crucial for planning the implementation of protected routes.

3.  **Review State Management:**
    *   **File:** `src/App.tsx`
    *   **Objective:** The project description mentions that the root `App` component manages the login state. I need to understand how this state is currently managed and determine if it's sufficient for the new authentication system or if a more robust solution like React Context is needed.

4.  **Investigate API Calls:**
    *   **Search:** Look for instances of `fetch` or a third-party library like `axios` throughout the `src` directory.
    *   **Objective:** Understand how API calls are currently being made. This will inform the creation of a centralized API client that can automatically attach authentication tokens to requests.

5.  **Environment Variable Setup:**
    *   **File:** `vite.config.ts`
    *   **File:** `package.json`
    *   **Objective:** Review the Vite configuration to understand how environment variables are loaded. Vite uses a specific prefix (`VITE_`) for environment variables to be exposed to the client-side code. This needs to be factored into the plan.

### 3. Proposed Strategic Approach

The implementation will be broken down into the following phases to ensure a modular and maintainable solution.

#### Phase 1: Environment and Configuration

1.  **Create `.env` file:**
    *   Create a `.env` file in the project root.
    *   Add the `VITE_BASE_URL` variable with the appropriate backend URL (e.g., `VITE_BASE_URL=http://localhost:8000/`).
2.  **Update `.gitignore`:**
    *   Add `.env` to the `.gitignore` file to prevent it from being committed to version control.

#### Phase 2: Authentication Service

1.  **Create an Authentication Service:**
    *   Create a new file: `src/services/authService.ts`.
    *   This service will encapsulate all authentication-related logic.
    *   **Functions to implement:**
        *   `login(credentials)`: Sends a POST request to `VITE_BASE_URL/auth/user/login/` with user credentials.
        *   `storeTokens(tokens)`: Stores the access and refresh tokens in a secure client-side storage (e.g., `localStorage` or `sessionStorage`).
        *   `getAccessToken()`: Retrieves the access token from storage.
        *   `getRefreshToken()`: Retrieves the refresh token from storage.
        *   `logout()`: Clears the tokens from storage.
        *   `isLoggedIn()`: Checks if a valid access token exists.

#### Phase 3: API Client with Authentication

1.  **Create a Centralized API Client:**
    *   Create a new file: `src/api/apiClient.ts`.
    *   Use a library like `axios` to create an API client instance.
    *   **Configure Axios Interceptors:**
        *   **Request Interceptor:** On every request, attach the access token to the `Authorization` header.
        *   **Response Interceptor:** If a request fails with a 401 (Unauthorized) error, use the refresh token to request a new access token. If successful, retry the original request with the new token. If the refresh token is also invalid, log the user out.

#### Phase 4: Protected Routes and Authentication Context

1.  **Create an Authentication Context:**
    *   Create a new file: `src/context/AuthContext.tsx`.
    *   This context will provide the authentication state (`isAuthenticated`, `user`) and the `login`/`logout` functions to the entire application.
2.  **Create a Protected Route Component:**
    *   Create a new component: `src/components/ProtectedRoute.tsx`.
    *   This component will wrap routes that require authentication.
    *   It will use the `AuthContext` to check if the user is authenticated. If not, it will redirect them to the `/login` page.
3.  **Update `App.tsx`:**
    *   Wrap the entire application with the `AuthProvider`.
    *   Use the `ProtectedRoute` component to protect the dashboard and other sensitive routes.

#### Phase 5: Login Page Integration

1.  **Update `src/pages/Login.tsx`:**
    *   Use the `useAuth` hook from the `AuthContext` to access the `login` function.
    *   On form submission, call the `login` function with the user's credentials.
    *   Handle loading and error states.
    *   Upon successful login, the `AuthContext` will update the state, and the user will be automatically redirected to the protected routes.

This strategic approach ensures a clean separation of concerns, making the authentication logic reusable, maintainable, and scalable. It also leverages best practices like using interceptors for token management and React Context for state sharing.