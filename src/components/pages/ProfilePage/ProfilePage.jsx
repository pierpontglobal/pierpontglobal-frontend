import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccountPanel from '../../AccountPanel/AccountPanel';
import { ApiServer } from '../../../Defaults';
import DealerCreator from './DealerCreator/DealerCreator';
import SettingSide from './SettingSide/SettingSide';
import SubscriptionSide from './SubscriptionSide/SubscriptionSide';
import AlertNotification from './Components/AlertNotification';
import PurchaseSide from './PurchaseSide/PurchaseSide';
import PendingSide from './PendingSide/PendingSide';
import FinancialSide from './FinancialSide/FinancialSide';
import TransactionsSide from './TransactionsSide/TransactionsSide';

import './styles.css';

const dealerExample = {
  image: null,
  name: 'Dealer name',
  address: 'Address...',
  email: 'dealer@example.com',
  number: '+1 (809) 123-5555',
};

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasDealer: true,
      hasPaymentMethod: true,
      notifications: [],
    };

    this.getDealer = this.getDealer.bind(this);
    this.openDealerCreator = this.openDealerCreator.bind(this);
    this.checkNotifications = this.checkNotifications.bind(this);
    this.getDealer();
    this.getPaymentMethod();
  }

  componentDidMount() {
    // this.checkNotifications();
  }

  async getDealer() {
    const responseDealer = await axios.get(`${ApiServer}/api/v1/user/dealers`);
    const responseUser = await axios.get(`${ApiServer}/api/v1/user`);

    if (responseDealer.data === null) {
      this.openDealerCreator();
    } else {
      this.setState({
        dealer: {
          name: responseDealer.data.name,
          address: responseDealer.data.address1,
          number: responseDealer.data.phone_number,
          email: responseUser.data.email,
        },
      });
    }
  }

  async getPaymentMethod() {
    try {
      await axios.get(`${ApiServer}/api/v1/user/subscriptions`);
    } catch (e) {
      this.setState({
        hasPaymentMethod: false,
      });
    }
  }

  openDealerCreator() {
    this.setState({
      hasDealer: false,
    });
  }

  async checkNotifications() {
    const notifications = [];

    try {
      await axios.get(`${ApiServer}/api/v1/user/subscriptions`);
    } catch (e) {
      notifications.push(
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
        </AlertNotification>,
      );
    }

    try {
      await axios.get(`${ApiServer}/api/v1/user/cards/default`);
    } catch (e) {
      notifications.push(
        <AlertNotification removable level={2}>
          <p style={{ margin: 0 }}>
            You don't have an associated payment method, please
            {' '}
            <a href="/user">Go to settings</a>
            {' '}
            to solve this issue.
          </p>
        </AlertNotification>,
      );
    }

    this.setState({ notifications });
  }

  render() {
    const {
      notifications,
      hasDealer,
      dealer,
      hasPaymentMethod,
    } = this.state;
    const { cookies } = this.props;

    return (
      <div>
        <div style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#dedede',
        }}
        />
        <DealerCreator show={!hasDealer || !hasPaymentMethod} hasDealer={hasDealer} />
        <div className="pannel-container">
          <AccountPanel dealer={dealer || dealerExample} />
        </div>

        <div style={{
          marginLeft: '300px',
          marginBottom: '200px',
        }}
        >

          {notifications}

          <Router>
            <Switch>
              <Route exact path="/user" render={() => (<SettingSide cookies={cookies} />)} />
              <Route exact path="/user/purchase" render={() => (<PurchaseSide cookies={cookies} />)} />
              <Route exact path="/user/pending" render={() => (<PendingSide cookies={cookies} />)} />
              <Route exact path="/user/financial" render={() => (<FinancialSide cookies={cookies} />)} />
              <Route
                exact
                path="/user/subscription"
                render={() => (
                  <SubscriptionSide cookies={cookies} />
                )}
              />
              <Route exact path="/user/transactions" render={() => (<TransactionsSide cookies={cookies} />)} />
            </Switch>
          </Router>


        </div>
      </div>
    );
  }
}

export default ProfilePage;
