import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import NotificationTypes from '../../../constants/NotificationTypes';
import IssueTypes from '../../../constants/IssueTypes';
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
    this.getDealer();
    this.getPaymentMethod();
  }

  componentDidMount() {
    this.checkNotifications();
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

  sendNotification = (notificationDto) => {
    axios.post(`${ApiServer}/api/v1/notification`, {...notificationDto});
  }

  checkNotifications = async () => {

    let subscriptions = (await axios.get(`${ApiServer}/api/v1/user/subscriptions`)).data;
    let cards = (await axios.get(`${ApiServer}/api/v1/user/cards/default`)).data;

    let notificationDto = {
      title: 'Account incomplete',
      message: `Please, add a subscription to this account. You won't be able to place bids until its complete.`,
      payload: subscriptions,
      type: NotificationTypes.alert,
      issue_id: undefined
    }

    if (subscriptions == undefined) {
      console.log('Sent sub noti');
      this.sendNotification(notificationDto);
    } else if (!!subscriptions && !subscriptions.active) {
      console.log('Sent sub noti');
      this.sendNotification(notificationDto);
    }

    if (cards == undefined) {
      console.log('Sent card noti');
      notificationDto.payload = cards;
      notificationDto.message = `Please, add your card information to your account. You won't be able to process any payment before its complete.`;
      notificationDto.issue_id = IssueTypes.CARD_INFORMATION_MISSING;
      this.sendNotification(notificationDto);
    }

    console.log('PROFILE PAGE AFTER CHECK NOTIFICARTIONS....');
    console.log(subscriptions, cards);
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
        <DealerCreator history={this.props.history} show={!hasDealer || !hasPaymentMethod} hasDealer={hasDealer} />
        <div className="pannel-container desktop-only">
          <AccountPanel dealer={dealer || dealerExample} />
        </div>

        <div className="user-page-content-container">

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

ProfilePage.propTypes = {
  cookies: PropTypes.object,
};

ProfilePage.defaultProps = {
  cookies: {},
};

export default ProfilePage;
