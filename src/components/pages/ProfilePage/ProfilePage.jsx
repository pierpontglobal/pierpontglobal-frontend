import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import AccountPanel from '../../AccountPanel/AccountPanel';
import { ApiServer } from '../../../Defaults';
import DealerCreator from './DealerCreator/DealerCreator';
import SettingSide from './SettingSide/SettingSide';
import SubscriptionSide from './SubscriptionSide/SubscriptionSide';
import PurchaseSide from './PurchaseSide/PurchaseSide';
import PendingSide from './PendingSide/PendingSide';
import FinancialSide from './FinancialSide/FinancialSide';
import TransactionsSide from './TransactionsSide/TransactionsSide';
import NotificationTypes from '../../../constants/NotificationTypes';
import IssueTypes from '../../../constants/IssueTypes';
import './styles.css';

const dealerExample = {
  image: null,
  name: '',
  address: '',
  email: '',
  number: '',
};

const Wrapper = styled.div`
  background-color: #dedede;
  width: 100%;
  height: 100%;
`;

const AccountPanelWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 300px;
  left: 0;
  top: 0;
  padding-top: 55px;
  display: none;
  @media only screen and (min-width: 768px) {
    display: inherit;
  }
`;

const RouterWrapper = styled.div`
  margin-bottom: 50px;
  @media only screen and (min-width: 768px) {
    margin-left: 300px;
  }
`;
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasDealer: true,
      hasPaymentMethod: true,
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
      }, () => {
        const { dealer } = this.state;
        const { setDealer } = this.props;
        if (setDealer) {
          setDealer(dealer);
        }
      });
    }
  }

  getPaymentMethod = () => {

    axios.get(`${ApiServer}/api/v1/user/subscriptions`).then((data) => {

    }, (err) => {
      if (err.response.status === 404) {
        this.openDealerCreator();
      }
      if (err.response.status === 503) {
        this.props.history.push('/');
      }
    });
  }

  sendNotification = (notificationDto) => {
    axios.post(`${ApiServer}/api/v1/notification`, { ...notificationDto });
  }

  checkNotifications = async () => {
    const { intl } = this.props;

    const subscriptions = (await axios.get(`${ApiServer}/api/v1/user/subscriptions`)).data;
    const cards = (await axios.get(`${ApiServer}/api/v1/user/cards/default`)).data;

    const messages = {
      accountIncomplete: intl.formatMessage({ id: 'profile.account-incomplete' }),
      subsText: intl.formatMessage({ id: 'profile.account-incomplete-subscription-text' }),
      cardsText: intl.formatMessage({ id: 'profiel.account-incomplete-cards-text' }),
    };

    const notificationDto = {
      title: messages.accountIncomplete,
      message: messages.subsText,
      payload: subscriptions,
      type: NotificationTypes.alert,
      issue_id: undefined,
    };

    if (subscriptions === null || subscriptions === undefined) {
      this.sendNotification(notificationDto);
    } else if (!!subscriptions && !subscriptions.active) {
      this.sendNotification(notificationDto);
    }

    if (cards === null || cards === undefined) {
      notificationDto.payload = cards;
      notificationDto.message = messages.cardsText;
      notificationDto.issue_id = IssueTypes.CARD_INFORMATION_MISSING;
      this.sendNotification(notificationDto);
    }
  }

  openDealerCreator() {
    this.setState({
      hasDealer: false,
    });
  }

  render() {
    const {
      hasDealer,
      dealer,
      hasPaymentMethod,
    } = this.state;
    const { cookies } = this.props;

    return (
      <Wrapper>
        <DealerCreator show={!hasDealer || !hasPaymentMethod} hasDealer={hasDealer} />
        <AccountPanelWrapper>
          <AccountPanel dealer={dealer || dealerExample} />
        </AccountPanelWrapper>
        <RouterWrapper>
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
        </RouterWrapper>
      </Wrapper>
    );
  }
}

ProfilePage.defaultProps = {
  cookies: {},
};

export default withRouter(injectIntl(ProfilePage));
