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

function AppContextProvider(props:any) {
  const [loginMsg, setLoginMsg] = useState<string>('');
  let history = useHistory();

  const appSetLoginMsg = (msg:string) => {
    setLoginMsg(msg);
  }

  return (
    // <AppContext.Provider value={{ appSetLoginMsg }} {...props} />
    <AppContext.Provider value={{ appSetLoginMsg, loginMsg }} {...props} />
  );
}

const AppContext = createContext<any>({});
const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext }
