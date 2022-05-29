import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { SerachOptionProvider } from './context/dispatchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
//  APPLY context through the app
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SerachOptionProvider>
        <App />
      </SerachOptionProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
