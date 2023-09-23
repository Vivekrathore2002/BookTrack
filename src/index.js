import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Provider as ReduxProvidwer } from 'react-redux';
import Store from './Redux/Store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId="265138882452-nf2305mar7cnl84oqdpeno5ncq9kcpcn.apps.googleusercontent.com">
      <ReduxProvidwer store={Store}>
        <ChakraProvider theme={theme}>
          <ColorModeScript />
          <App />
        </ChakraProvider>
      </ReduxProvidwer>
    </GoogleOAuthProvider>
  </StrictMode>
);
