import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const domain='dev-7u3pjz14xqsboar7.us.auth0.com';
const clientId='SvH3KW9gUHpCEmoB8T9dtRPMEYYtTbHI';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider 
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>
);
reportWebVitals();
