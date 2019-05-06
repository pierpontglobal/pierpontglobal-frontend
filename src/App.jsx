import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { MuiThemeProvider } from '@material-ui/core';
import styled from 'styled-components';
import {
  IntlProvider, FormattedMessage, addLocaleData, injectIntl,
} from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_es from 'react-intl/locale-data/es';
import messages_es from './translations/es.json';
import messages_en from './translations/en.json';
import MarketPlacePage from './components/pages/MarketPlacePage/MarketPlacePage';
import LandingPage from './components/pages/LandingPage/LandingPage';
import NotfoundPage from './components/pages/NotFoundPage/NotFoundPage';
import RegistrationPage from './components/pages/RegistrationPage/RegistrationPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import CarPage from './components/pages/CarBidPage/CarBidPage';
import ContactPage from './components/pages/ContactPage/ContactPage';
import NotificationPage from './components/pages/NotificationPage/NotificationPage';
import './styles.css';
import AppNav from './components/AppNav/AppNav';
import { DefaultTheme, OneSignalKey, ApiServer } from './Defaults';
import OauthPage from './components/pages/OauthPage/OauthPage';
import WhatsApp from './components/Modal/WhatsApp/WhatsApp';

addLocaleData([...locale_en, ...locale_es]);

// TODO: This switch was on porpuse for testing ONLY purposes!!!
const messages = {
  es: messages_es,
  en: messages_en,
};

const car = {
  year: '2017',
  make: 'Hyundai',
  model: 'Santa Fe',
  trimLevel: 'Limited',
  odometer: '9 440 mi',
  fuelType: 'Gasoline',
  engine: '6 cylinder',
  displacement: '3.3 L',
  transmission: 'Automatic',
  interiorColor: 'black',
  exteriorColor: 'white',
  vin: 'L974FFH73523GSB353Z0',
  bodyStyle: 'MPV',
  doors: 'Not Available',
  vehicleType: 'SUV',
  score: '4.3',
  price: '$ 21 975',
  saleDate: '01/ 20 / 2017 (Cutoff) 9:00 AM ET',
  images: [
    'https://static.cargurus.com/images/site/2015/05/29/11/43/2015_hyundai_santa_fe_2_0t_sport-pic-4662568588414365370-640x480.jpeg',
    'https://static.cargurus.com/images/site/2018/08/12/15/45/2015_hyundai_santa_fe_sport_2_4l_fwd-pic-1449050980195395017-640x480.jpeg',
    'https://static.cargurus.com/images/site/2015/03/17/18/44/2015_hyundai_santa_fe_sport-pic-3111940996015372984-640x480.jpeg',
  ],
  title: () => `${car.year} ${car.make} ${car.model} ${car.trimLevel}`,
};

/* const invoice = {
  unitCost: '$22 900',
  taxes: '$7000',
  shipping: '$600',
  fee: '$695',
  proccessing: '$1 245',
  transport: '$1 155',
  requiredDeposit: '$3 359',
  estimatedTotal: '$33 595',
}; */

const PageHolder = styled.div`
  margin-top: 58px;
  height: -moz-calc(100% - 58px);
  height: -webkit-calc(100% - 58px);
  height: calc(100% - 58px);

  > div {
    height: 100%;
    overflow: auto;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;

    this.state = {
      dealer: {
        image: null,
        name: null,
        address: null,
        email: null,
        number: null,
      },
      languages: [
        {
          abr: 'es',
          name: <FormattedMessage id="lang.spanish" />,
          active: false,
        },
        {
          abr: 'en',
          name: <FormattedMessage id="lang.english" />,
          active: true,
        },
        // {
        //   abr: "fr",
        //   name: <FormattedMessage id="lang.french" />,
        //   active: false
        // },
      ],
      language: navigator.language.split(/[-_]/)[0],
    };

    axios.interceptors.request.use((config) => {
      config.headers = { Authorization: `Bearer ${cookies.get('token')}` };
      config.params = { lang: this.state.language };

      return config;
    }, error => Promise.reject(error));

    axios.interceptors.response.use(response => response,
      (error) => {
        if (error.response.request.responseURL.includes('oauth/token')) {
          return error.response;
        } if (error.response.status === 401) {
          cookies.remove('token');
          window.location.href = '/?signIn=true';
        }
        return Promise.reject(error);
      });

    this.verifyUserLoggedIn = this.verifyUserLoggedIn.bind(this);
  }

  setDealer = (dealer) => {
    this.setState({
      dealer,
    });
  }

  componentDidMount() {
    const { cookies } = this.props;

    this.setDefaultLanguage();

    this.OneSignal = window.OneSignal || [];

    console.log(this.OneSignal);

    this.OneSignal.push(() => {
      this.OneSignal.init({
        appId: OneSignalKey,
        allowLocalhostAsSecureOrigin: true,
      });

      this.OneSignal.on('subscriptionChange', (isSubscribed) => {
        // console.log(`The user subscription status is: ${isSubscribed}`);
        this.OneSignal.getUserId((id) => {
          if (isSubscribed) {
            if (cookies.get('token', { path: '/' })) {
              axios.post(`${ApiServer}/api/v1/user/notifier`, {
                one_signal_uuid: id,
              });
            }
            cookies.set('one_signal_uuid', id, { expires: new Date(new Date().setFullYear(new Date().getFullYear() + 5)) });
          } else {
            if (cookies.get('token', { path: '/' })) {
              axios.delete(`${ApiServer}/api/v1/user/notifier?one_signal_uuid=${id}`);
            }
            cookies.remove('one_signal_uuid', { path: '/' });
          }
        });
      });
    });
  }

  verifyUserLoggedIn() {
    const { cookies } = this.props;
    if (cookies.get('token', { path: '/' })) {
      return true;
    }
    return false;
  }

  setLanguage = (lang) => {
    const { languages } = this.state;
    const langs = [...languages];

    langs.forEach((lg) => {
      if (lg.abr === lang.abr) {
        lg.active = true;
      } else {
        lg.active = false;
      }
    });
    this.setState({
      languages: langs,
      language: lang.abr,
    }, () => {
      console.log(this.state);
    });
  }

  setDefaultLanguage = () => {
    const { languages } = this.state;
    const langs = [...languages];

    // Set default to Spanish
    const defaultLang = 'es';
    langs.forEach((lg) => {
      if (lg.abr.toLowerCase() === defaultLang.toLowerCase()) {
        lg.active = true;
      } else {
        lg.active = false;
      }
    });

    this.setState({
      languages: langs,
      language: defaultLang,
    });
  }

  render() {
    const { cookies } = this.props;
    const { dealer, languages, language } = this.state;
    return (
      <IntlProvider locale={language || 'en'} messages={messages[language]}>
        <MuiThemeProvider theme={DefaultTheme}>
          <div>
            <Router>
              <div style={{
                position: 'fixed',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              >
                <AppNav languages={languages} setLang={this.setLanguage} cookies={cookies} openModal={this.openModal} dealer={dealer} verifyUserLoggedIn={this.verifyUserLoggedIn} />
                <PageHolder>
                  <Switch>
                    <Route exact path="/oauth/login" render={() => <OauthPage />} />
                    <Route exact path="/" render={() => (<LandingPage cookies={cookies} />)} />
                    <Route exact path="/marketplace" render={() => (<MarketPlacePage cookies={cookies} />)} />
                    <Route exact path="/marketplace/car" render={() => (<CarPage cookies={cookies} car={car} />)} />

                    <Route exact path="/user/confirm" render={() => (<RegistrationPage cookies={cookies} />)} />
                    <Route path="/user" render={() => ((this.verifyUserLoggedIn()) ? <ProfilePage setDealer={this.setDealer} cookies={cookies} /> : <Redirect to="/" />)} />
                    <Route exact path="/user/notifications" render={() => ((this.verifyUserLoggedIn()) ? (<NotificationPage cookies={cookies} />) : <Redirect to="/" />)} />

                    <Route exact path="/contact-us" render={() => (<ContactPage cookies={cookies} />)} />

                    <Route render={() => (<NotfoundPage cookies={cookies} />)} />
                  </Switch>
                </PageHolder>
              </div>
            </Router>
          </div>
          <WhatsApp />
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

export default injectIntl(withCookies(App));
