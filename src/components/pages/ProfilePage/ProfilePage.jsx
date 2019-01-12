import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNav from '../../AppNav/AppNav';
import AccountPanel from '../../AccountPanel/AccountPanel';
import { ApiServer } from '../../../Defaults';
import DealerCreator from './DealerCreator/DealerCreator';
import SettingSide from './SettingSide/SettingSide';

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

    const { cookies } = props;

    this.state = {
      hasDealer: true,
      token: cookies.get('token'),
    };

    if (this.state.token === undefined) {
      window.location.href = '/';
    }

    this.getDealer = this.getDealer.bind(this);
    this.openDealerCreator = this.openDealerCreator.bind(this);
    this.getDealer();
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
    const response_dealer = await axios.get(`${ApiServer}/api/v1/user/dealer`, config);
    const response_user = await axios.get(`${ApiServer}/api/v1/user/me`, config);
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
        }}
        >


          <Router>
            <Switch>
              <Route exact path="/user" render={() => (<SettingSide cookies={this.props.cookies} />)} />
            </Switch>
          </Router>


        </div>
      </div>
    );
  }
}

export default ProfilePage;
