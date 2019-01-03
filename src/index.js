import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import WhatsApp from './components/Modal/WhatsApp/WhatsApp';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
    <App />
    <WhatsApp />
  </CookiesProvider>, document.getElementById('root'),
);
