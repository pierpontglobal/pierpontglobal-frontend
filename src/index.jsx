import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import WhatsApp from './components/Modal/WhatsApp/WhatsApp';
import {IntlProvider} from "react-intl";
import { addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_es from 'react-intl/locale-data/es';
import messages_es from "./translations/es.json";
import messages_en from "./translations/en.json";

addLocaleData([...locale_en, ...locale_es]);

const messages = {
    'es': messages_es,
    'en': messages_en
};
const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <CookiesProvider>
      <App />
      <WhatsApp />
    </CookiesProvider>
  </IntlProvider>, document.getElementById('root'),
);
