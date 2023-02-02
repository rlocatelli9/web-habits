import React from "react";
import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { AuthStatus, RequireAuth } from "./hooks/useAuth";
import { Home } from "./pages/Home";
import { Login as LoginPage} from "./pages/Login";

export function App() {
  return (
    <AuthProvider>      
      <Routes>
        <Route element={<InitialPage />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Route>
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