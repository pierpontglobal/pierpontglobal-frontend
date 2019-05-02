import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { IntlProvider } from 'react-intl';
import App from './App';

ReactDOM.render(
  <IntlProvider locale="en">
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </IntlProvider>, document.getElementById('root'),
);
