import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";

import ThemeProvider from "./contexts/Theme/ThemeProvider";
import TabProvider from "./contexts/Tab/TabProvider";
import AuthProvider from "./contexts/Auth/AuthProvider";

const queryClient = new QueryClient();
const Providers = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_CLIENT_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <TabProvider>{children}</TabProvider>
        </AuthProvider>
      </ThemeProvider>
    </Auth0Provider>
  </QueryClientProvider>
);

export default Providers;
