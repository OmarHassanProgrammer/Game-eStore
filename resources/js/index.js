/*import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </React.StrictMode>
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
  */
import '../assets/fonts/walsheim/GTWalsheimPro-Medium.ttf';
import '../assets/fonts/walsheim/GTWalsheimPro-Regular.ttf';
import '../assets/fonts/walsheim/GTWalsheimPro-Light.ttf';
import '../assets/fonts/walsheim/GTWalsheimPro-Bold.ttf';

import "./Containers/Home/Home";
import "./Containers/Browse/Browse";
import "./Containers/GamePage/GamePage";
import "./Containers/Login/Login";
import "./Containers/Signup/Signup";
import "./Containers/ListItem/ListItem";
import "./Containers/Profile/Profile";
import "./Containers/Settings/Settings";
import "./Containers/Checkout/Checkout";