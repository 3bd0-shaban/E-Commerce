import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux';
import {  Store } from './Redux/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
