import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import MarketPlacePage from './components/pages/MarketPlacePage/MarketPlacePage';
import LandingPage from './components/pages/LandingPage/LandingPage';
import NotfoundPage from './components/pages/NotFoundPage/NotFoundPage';
import RegistrationPage from './components/pages/RegistrationPage/RegistrationPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';

/* const car = {
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
}; */

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

/* const depositStatus = {
  deficientAmount: '$2 359',
  necessaryAmount: '$3 359',
  availableAmount: '$1 000',
}; */


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => (<LandingPage cookies={this.props.cookies} />)} />
            <Route exact path="/marketplace" render={() => (<MarketPlacePage cookies={this.props.cookies} location={window.location} />)} />

            <Route path="/user" render={() => (<ProfilePage cookies={this.props.cookies} />)} />
            <Route exact path="/user/confirm" render={() => (<RegistrationPage cookies={this.props.cookies} />)} />

            <Route render={() => (<NotfoundPage cookies={this.props.cookies} />)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withCookies(App);
