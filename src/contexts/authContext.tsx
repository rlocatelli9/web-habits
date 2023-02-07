import React from 'react'
import axios from "axios";
import Endpoints from '../api/Endpoints';
import { fakeAuthProvider } from '../hooks/useAuth';
import { IAuthContext, IUser } from '../interfaces';

let AuthContext = React.createContext<IAuthContext>(null!)

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<IUser|undefined>(undefined!);

  let signin = (newUser: IUser, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signup = async (newUser: IUser, callback: VoidFunction) => {
    try {
      await Endpoints.Signup(newUser);
      return callback();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response?.data
      }
      return error
    }
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(undefined!);
      callback();
    });
  };

  let value = { user, signin, signout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export {AuthContext, AuthProvider}