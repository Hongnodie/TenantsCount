import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SCP } from './context/dispatchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
//  APPLY dispatcher through the app
root.render(
  <React.StrictMode>
    <SCP>
      <App />
    </SCP>
  </React.StrictMode>
);
