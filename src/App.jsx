import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { withCookies } from "react-cookie";
import axios from "axios";
import { MuiThemeProvider } from "@material-ui/core";
import styled from "styled-components";
import {
  IntlProvider,
  FormattedMessage,
  addLocaleData,
  injectIntl
} from "react-intl";
import MediaQuery from "react-responsive";
import CollectionMuiIcon from "@material-ui/icons/CollectionsBookmark";
import locale_en from "react-intl/locale-data/en";
import locale_es from "react-intl/locale-data/es";
import SavedCarsDrawer from "./components/SavedCars/SavedCarsDrawer";
import messages_es from "./translations/es.json";
import messages_en from "./translations/en.json";
import MarketPlacePage from "./components/pages/MarketPlacePage/MarketPlacePage";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import NotfoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import RegistrationPage from "./components/pages/RegistrationPage/RegistrationPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import CarPage from "./components/pages/CarBidPage/CarBidPage";
import ContactPage from "./components/pages/ContactPage/ContactPage";
import NotificationPage from "./components/pages/NotificationPage/NotificationPage";
import "./styles.css";
import AppNav from "./components/AppNav/AppNav";
import { DefaultTheme, OneSignalKey, ApiServer } from "./Defaults";
import OauthPage from "./components/pages/OauthPage/OauthPage";
import WhatsApp from "./components/Modal/WhatsApp/WhatsApp";
import SupportPage from "./components/pages/SupportPage/SupportPage.jsx";
import SignInPage from "./components/pages/SignInPage/SignInPage";
import ApplicationRoutes from "./constants/Routes";

addLocaleData([...locale_en, ...locale_es]);

const messages = {
  es: messages_es,
  en: messages_en
};

const car = {
  year: "2017",
  make: "Hyundai",
  model: "Santa Fe",
  trimLevel: "Limited",
  odometer: "9 440 mi",
  fuelType: "Gasoline",
  engine: "6 cylinder",
  displacement: "3.3 L",
  transmission: "Automatic",
  interiorColor: "black",
  exteriorColor: "white",
  vin: "L974FFH73523GSB353Z0",
  bodyStyle: "MPV",
  doors: "Not Available",
  vehicleType: "SUV",
  score: "4.3",
  price: "$ 21 975",
  saleDate: "01/ 20 / 2017 (Cutoff) 9:00 AM ET",
  images: [
    "https://static.cargurus.com/images/site/2015/05/29/11/43/2015_hyundai_santa_fe_2_0t_sport-pic-4662568588414365370-640x480.jpeg",
    "https://static.cargurus.com/images/site/2018/08/12/15/45/2015_hyundai_santa_fe_sport_2_4l_fwd-pic-1449050980195395017-640x480.jpeg",
    "https://static.cargurus.com/images/site/2015/03/17/18/44/2015_hyundai_santa_fe_sport-pic-3111940996015372984-640x480.jpeg"
  ],
  title: () => `${car.year} ${car.make} ${car.model} ${car.trimLevel}`
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
  margin-top: ${props => (props.isInSignInPage ? "0px" : "58px")};
  height: ${props =>
    props.isInSignInPage ? "100%" : "-moz-calc(100% - 58px)"};
  height: ${props =>
    props.isInSignInPage ? "100%" : "-webkit-calc(100% - 58px)"};
  height: ${props => (props.isInSignInPage ? "100%" : "calc(100% - 58px)")};

  > div {
    height: 100%;
    overflow: auto;
  }
`;

const SavedCarsIconWrapper = styled(CollectionMuiIcon)`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 5000;
  color: #32619a;
  cursor: pointer;
  &:hover {
    color: #3e78c0;
  }
`;
class App extends React.Component {
  constructor(props) {
    clearTimeout(window.fallbackReload);
    super(props);
    const { cookies } = this.props;

    this.state = {
      showSavedCarsPanel: false,
      showWhastapp: true,
      userSignedIn: false,
      dealer: {
        image: null,
        name: null,
        address: null,
        email: null,
        number: null
      },
      languages: [
        {
          abr: "es",
          name: <FormattedMessage id="lang.spanish" />,
          active: false
        },
        {
          abr: "en",
          name: <FormattedMessage id="lang.english" />,
          active: true
        }
        // {
        //   abr: "fr",
        //   name: <FormattedMessage id="lang.french" />,
        //   active: false
        // },
      ],
      language: this.getBrowserLocale()
    };

    axios.interceptors.request.use(
      config => {
        config.headers = { Authorization: `Bearer ${cookies.get("token")}` };
        config.params = { lang: this.state.language };

        return config;
      },
      error => Promise.reject(error)
    );

    this.verifyUserLoggedIn = this.verifyUserLoggedIn.bind(this);

    this.marketplaceRef = React.createRef();
  }

  getBrowserLocale = () => navigator.language.split(/[-_]/)[0];

  setDealer = dealer => {
    this.setState({
      dealer
    });
  };

  componentDidMount() {
    const { cookies } = this.props;

    this.verifyUserLoggedIn();

    this.setDefaultLanguage();

    this.OneSignal = window.OneSignal || [];

    this.OneSignal.push(() => {
      this.OneSignal.init({
        appId: OneSignalKey,
        allowLocalhostAsSecureOrigin: true
      });

      this.OneSignal.on("subscriptionChange", isSubscribed => {
        // console.log(`The user subscription status is: ${isSubscribed}`);
        this.OneSignal.getUserId(id => {
          if (isSubscribed) {
            if (cookies.get("token", { path: "/" })) {
              axios.post(`${ApiServer}/api/v1/user/notifier`, {
                one_signal_uuid: id
              });
            }
            cookies.set("one_signal_uuid", id, {
              expires: new Date(
                new Date().setFullYear(new Date().getFullYear() + 5)
              )
            });
          } else {
            if (cookies.get("token", { path: "/" })) {
              axios.delete(
                `${ApiServer}/api/v1/user/notifier?one_signal_uuid=${id}`
              );
            }
            cookies.remove("one_signal_uuid", { path: "/" });
          }
        });
      });
    });
  }

  verifyUserLoggedIn() {
    const { cookies } = this.props;
    if (cookies.get("token", { path: "/" })) {
      return true;
    }
    return false;
  }

  setLanguage = lang => {
    const { languages } = this.state;
    const langs = [...languages];

    const { cookies } = this.props;
    cookies.set("language", lang.abr, { path: "/" });

    langs.forEach(lg => {
      if (lg.abr === lang.abr) {
        lg.active = true;
      } else {
        lg.active = false;
      }
    });
    this.setState({
      languages: langs,
      language: lang.abr
    });
  };

  setDefaultLanguage = () => {
    const { languages } = this.state;
    const langs = [...languages];
    const { cookies } = this.props;

    // Set default to Spanish
    const defaultLang = cookies.get("language") || "en";
    langs.forEach(lg => {
      if (lg.abr.toLowerCase() === defaultLang.toLowerCase()) {
        lg.active = true;
      } else {
        lg.active = false;
      }
    });

    this.setState({
      languages: langs,
      language: defaultLang
    });
  };

  toggleSavedCarsPanel = () => {
    this.setState(
      (prevState, props) => ({
        showSavedCarsPanel: !prevState.showSavedCarsPanel
      }),
      () => {
        // this.showHideWhatsapp();
      }
    );
  };

  showHideWhatsapp = () => {
    // if (this.state.showSavedCarsPanel) {
    //   this.setState({ showWhastapp: false });
    // } else {
    //   this.setState({ showWhastapp: true });
    // }
  };

  removedBookmarkedCar = carVin => {
    this.marketplaceRef.current.toggleBookmarkedCar(carVin);
  };

  showSavedCars = () => {
    this.setState({
      showSavedCarsPanel: true
    });
  };

  render() {
    const { cookies } = this.props;
    const { dealer, languages, language } = this.state;

    const userSignedIn = this.verifyUserLoggedIn();

    return (
      <IntlProvider locale={language || "en"} messages={messages[language]}>
        <MuiThemeProvider theme={DefaultTheme}>
          <div>
            <Router>
              <div
                style={{
                  position: "fixed",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {!userSignedIn ? null : (
                  <>
                    <AppNav
                      showSavedCars={this.showSavedCars}
                      languages={languages}
                      setLang={this.setLanguage}
                      cookies={cookies}
                      openModal={this.openModal}
                      dealer={dealer}
                      verifyUserLoggedIn={this.verifyUserLoggedIn}
                    />
                    {!this.verifyUserLoggedIn() ? null : (
                      <>
                        <MediaQuery minDeviceWidth={768}>
                          <SavedCarsIconWrapper
                            onClick={() => this.toggleSavedCarsPanel()}
                          />
                        </MediaQuery>
                        <SavedCarsDrawer
                          removedBookmarkedCar={this.removedBookmarkedCar}
                          open={this.state.showSavedCarsPanel}
                          handleClose={() => this.toggleSavedCarsPanel()}
                        />
                      </>
                    )}
                  </>
                )}
                <PageHolder isInSignInPage={!userSignedIn}>
                  <Switch>
                    <Route
                      exact
                      path={ApplicationRoutes.oauthPage}
                      render={() => <OauthPage />}
                    />
                    <Route
                      exact
                      path={ApplicationRoutes.home}
                      render={() =>
                        this.verifyUserLoggedIn() ? (
                          <Redirect to="/user" />
                        ) : (
                          <SignInPage cookies={cookies} />
                        )
                      }
                    />
                    <Route
                      exact
                      path={ApplicationRoutes.marketplace}
                      render={() => (
                        <MarketPlacePage
                          ref={this.marketplaceRef}
                          cookies={cookies}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={ApplicationRoutes.carPage}
                      render={() => <CarPage cookies={cookies} car={car} />}
                    />

                    <Route
                      exact
                      path={ApplicationRoutes.registrationPage}
                      render={() => <RegistrationPage cookies={cookies} />}
                    />
                    <Route
                      path={ApplicationRoutes.profilePage.default}
                      render={() =>
                        this.verifyUserLoggedIn() ? (
                          <ProfilePage
                            setDealer={this.setDealer}
                            cookies={cookies}
                          />
                        ) : (
                          <Redirect to="/" />
                        )
                      }
                    />
                    <Route
                      exact
                      path={ApplicationRoutes.notificationPage}
                      render={() =>
                        this.verifyUserLoggedIn() ? (
                          <NotificationPage cookies={cookies} />
                        ) : (
                          <Redirect to="/" />
                        )
                      }
                    />

                    <Route
                      exact
                      path={ApplicationRoutes.contactPage}
                      render={() => <ContactPage cookies={cookies} />}
                    />
                    <Route
                      exact
                      path={ApplicationRoutes.supportPage}
                      render={() => <SupportPage />}
                    />
                    <Route
                      exact
                      path={ApplicationRoutes.supportPageTutorial}
                      render={() => <SupportPage />}
                    />

                    <Route render={() => <NotfoundPage cookies={cookies} />} />
                  </Switch>
                </PageHolder>
              </div>
            </Router>
          </div>
          <WhatsApp shown={this.state.showWhastapp} />
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

export default injectIntl(withCookies(App));
