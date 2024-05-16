import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { persistor }  from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { PersistGate } from "redux-persist/integration/react";

/* if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mock/browser');
  worker.start({
    onUnhandledRequest: "bypass",
  });
} */

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
