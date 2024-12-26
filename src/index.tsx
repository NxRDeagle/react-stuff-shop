import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './features/store';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import './global.css';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
