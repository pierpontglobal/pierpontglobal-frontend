import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNav from '../../AppNav/AppNav';
import AccountPanel from '../../AccountPanel/AccountPanel';
import { ApiServer } from '../../../Defaults';
import DealerCreator from './DealerCreator/DealerCreator';
import SettingSide from './SettingSide/SettingSide';
import SubscriptionSide from './SubscriptionSide/SubscriptionSide';
import AlertNotification from './Components/AlertNotification';

import './styles.css';

const dealerExample = {
  image: null,
  name: 'Dealer name',
  address: 'Address...',
  email: 'dealer@example.com',
  number: '+1 (809) 123-5555',
};

const subscription = {
  endDate: '10/01/2020',
};

const paymentMethods = [
  /* {
    id: 'card_1DsYSNIEJdJD3Ee3YJMA6BxK',
    object: 'card',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: null,
    address_zip_check: null,
    brand: 'Visa',
    country: 'US',
    customer: 'cus_ELEwxL9cp3NlIF',
    cvc_check: null,
    dynamic_last4: null,
    exp_month: 8,
    exp_year: 2020,
    fingerprint: 'EqKRfTysXwByRoEH',
    funding: 'credit',
    last4: '4242',
    metadata: {
    },
    name: null,
    tokenization_method: null,
  }, */
];

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      hasDealer: true,
      token: cookies.get('token'),
      notifications: [],
    };

    if (this.state.token === undefined) {
      window.location.href = '/';
    }

    this.getDealer = this.getDealer.bind(this);
    this.openDealerCreator = this.openDealerCreator.bind(this);
    this.checkNotifications = this.checkNotifications.bind(this);
    this.getDealer();
  }

  componentDidMount() {
    this.checkNotifications();
  }

  openDealerCreator() {
    this.setState({
      hasDealer: false,
    });
  }

  async getDealer() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };
    const response_dealer = await axios.get(`${ApiServer}/api/v1/user/dealers`, config);
    const response_user = await axios.get(`${ApiServer}/api/v1/user`, config);
    if (response_dealer.data === null) {
      this.openDealerCreator();
    } else {
      this.setState({
        dealer: {
          name: response_dealer.data.name,
          address: response_dealer.data.address1,
          number: response_dealer.data.phone_number,
          email: response_user.data.email,
        },
      });
    }
  }

  async checkNotifications() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };


    const subscriptionData = (await axios.get(`${ApiServer}/api/v1/user/subscriptions`, config)).data;
    if (!subscriptionData.active) {
      this.setState({
        notifications:
      (
        <div>
          {this.state.notifications}
          <AlertNotification removable level={3}>
            <p style={{ margin: 0 }}>
            Your account isn't activate pay your yearly subscription or your account will be disabled on
              {' '}
              {30}
              {' '}
            days.
              Click
              {' '}
              <a href="/user/subscription">Pay subscription</a>
              {' '}
              to solve this issue.
            </p>
          </AlertNotification>
        </div>),
      });
    }

    const defaultCard = (await axios.get(`${ApiServer}/api/v1/user/cards/default`, config)).data;
    if (defaultCard === null) {
      this.setState({
        notifications:
      (
        <div>
          {this.state.notifications}
          <AlertNotification removable level={2}>
            <p style={{ margin: 0 }}>
              You don't have an associated payment method, please
              {' '}
              <a href="/user">Go to settings</a>
              {' '}
              to solve this issue.
            </p>
          </AlertNotification>
        </div>
      ),
      });
    }
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <DealerCreator cookies={this.props.cookies} show={!this.state.hasDealer} />
        <div className="pannel-container">
          <AccountPanel cookies={this.props.cookies} dealer={this.state.dealer || dealerExample} />
        </div>
        <AppNav cookies={this.props.cookies} openModal={this.openModal} notSearchable />

        <div style={{
          marginLeft: '300px',
          marginBottom: '200px',
        }}
        >

          {this.state.notifications}

          <Router>
            <Switch>
              <Route exact path="/user" render={() => (<SettingSide cookies={this.props.cookies} />)} />
              <Route
                exact
                path="/user/subscription"
                render={() => (
                  <SubscriptionSide
                    cookies={this.props.cookies}
                    subscription={subscription}
                  />
                )}
              />
            </Switch>
          </Router>


        </div>
      </div>
    );
  }
}

export default ProfilePage;
