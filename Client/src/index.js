import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SerachOptionProvider } from './context/dispatchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
//  APPLY context through the app
root.render(
  <React.StrictMode>
    <SerachOptionProvider>
      <App />
    </SerachOptionProvider>
  </React.StrictMode>
);
