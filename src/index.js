import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// TODO: wrap everything in Auth0
//Done with it
ReactDOM.render(
  <Auth0Provider
    domain="dev-royce79-creator.us.auth0.com"
    clientId="LSBPnWLveilVZJ6CR0Tq5beyqnlnKQnZ"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Auth0Provider>,
  document.getElementById('root')
);
