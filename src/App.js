import { Provider } from 'react-redux';
import PracticePage from './pages/PracticePage';
import store from './store/store';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          redirectUri={window.location.origin}
          cacheLocation="localstorage"
        >
          <Routes>
            <Route path="/practice" exact element={<PracticePage />} />
            <Route path="/" exact element={<LandingPage />} />
          </Routes>
        </Auth0Provider>
      </HashRouter>
    </Provider>
  );
};

export default App;
