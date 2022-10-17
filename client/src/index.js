import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { persistor, Store } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
        <CookiesProvider/>
          <App />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
