import React from "react";
import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { AuthStatus, RequireAuth } from "./hooks/useAuth";
import { Home as HomePage } from "./pages/Home";
import { Login as LoginPage} from "./pages/Login";
import { SignUp as SignUpPage} from "./pages/SignUp";

export function App() {
  return (
    <AuthProvider>      
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
          path="/app"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
          <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </AuthProvider>
  );
}

function InitialPage() {
  return (
    <>
      <AuthStatus />
      <Outlet />
    </>
  );
}


function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}