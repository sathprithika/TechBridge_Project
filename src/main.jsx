import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain="dev-z2yi34ld63oonr6k.us.auth0.com"
    clientId="ezFGgviP99FotzF5krq6AfWCSL0NkxJ5"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
   
  </StrictMode>,
)
