import React from "react";
import { 
  useLocation,
  Navigate, 
  useNavigate
} from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user?.username) {
    return null
  }

  return (
    <p>
      Welcome {auth.user.username}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/login"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export { useAuth, RequireAuth, fakeAuthProvider, AuthStatus };

