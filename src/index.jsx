import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from "react-redux";
import App from './App';
import configureStore from './modules/store';
import AppInitialState from './modules/appInitialState';

const PPGStore = configureStore(AppInitialState);

ReactDOM.render(
  <IntlProvider locale="en">
    <CookiesProvider>
      <ReduxProvider store={PPGStore}>
        <App />
      </ReduxProvider>
    </CookiesProvider>
  </IntlProvider>, document.getElementById('root'),
);
