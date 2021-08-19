import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// TODO: wrap everything in Auth0
//Done with it
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-royce79-creator.us.auth0.com"
      clientId="LSBPnWLveilVZJ6CR0Tq5beyqnlnKQnZ"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
