import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import App from './App';
import { IntlProvider, addLocaleData } from "react-intl";

ReactDOM.render(
  <IntlProvider>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </IntlProvider>, document.getElementById('root'),
);
