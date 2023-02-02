import React from 'react'
import { fakeAuthProvider } from '../hooks/useAuth';
import { IAuthContext, IUser } from '../interfaces';

let AuthContext = React.createContext<IAuthContext>(null!)

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<IUser|null>(null!);

  let signin = (newUser: IUser, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null!);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export {AuthContext, AuthProvider}