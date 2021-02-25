import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { getUser, signIn as sendSignInRequest } from '../api/auth';
import { Auth } from "../auth/Auth";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";

function AuthProvider(props:any) {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<any>(true);
  let history = useHistory();


  useEffect(() => {
    Auth.checkAuth().then(
      (res) => {
        if(res !== false) 
        {
          setUser({
            id: res.json.user.id,
            role: res.json.user.role,
            email: res.json.user.email,
            avatarUrl: "",
          });
        }
        setLoading(false);
      }
    )
  }, []);

  const signIn = useCallback(async (email, password) => {
    const result = await sendSignInRequest(email, password);
    if (result.isOk) {
      setUser(result.data);
    }

    return result;
  }, []);

  // const signOut = useCallback(async () => {
  //   await Auth.logOut();
  //   setUser(null);
  // }, []);

  const signOut = async () => {
    await Auth.logOut();
    setUser(null);
  }

  const logIn = (email:any, password:any) => {
    Auth.logIn(email, password).then(
      (res) => {
        setUser(res.json);
        history.push('/home');
    });
  };


  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut, logIn, loading }} {...props} />
  );
}

const AuthContext = createContext<any>({});
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }
