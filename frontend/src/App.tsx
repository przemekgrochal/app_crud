import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import React from 'react';
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
import './dx-styles.scss';
import LoadPanel from 'devextreme-react/load-panel';
import { AppContextProvider, useAppContext } from './contexts/AppContext';
import { NavigationProvider } from './contexts/navigation';
import { AuthProvider, useAuth } from './contexts/auth';
import { useScreenSizeClass } from './utils/media-query';
import Content from './Content';
import UnauthenticatedContent from './UnauthenticatedContent';

function App() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadPanel visible={true} />;
  }

  if (user) {
    return <Content />;
  }

  return <UnauthenticatedContent />;

}

export default function () {
  const screenSizeClass = useScreenSizeClass();

  return (
    <Router>
      <AppContextProvider>
        <AuthProvider>
          <NavigationProvider>
            <div className={`app ${screenSizeClass}`}>
              <App />
            </div>
          </NavigationProvider>
        </AuthProvider>
      </AppContextProvider>
    </Router>
  );
}
