import React from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import Tab from './Tab/Tab';
import DealerTab from './DealerTab/DealerTab';
import FundTab from './FundTab/FundTab';
import Container from '../styles/Container/Container';
import { ApiServer } from '../../Defaults';

class AccountPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      funds: 0,
    };

    this.signOut = this.signOut.bind(this);
    this.getFunds = this.getFunds.bind(this);
    this.markSelected = this.markSelected.bind(this);
  }

  componentDidMount() {
    this.getFunds();
  }

  async getFunds() {
    const responseFunds = (await axios.get(`${ApiServer}/api/v1/user/funds`)).data;
    this.setState({
      funds: responseFunds.balance,
    });
  }

  markSelected(selected) {
    this.setState({ selected });
  }

  async signOut() {
    await axios.post(`${ApiServer}/api/v1/user/invalidate`, {
      one_signal_uuid: this.props.cookies.get('one_signal_uuid'),
    });
    this.props.cookies.remove('token', { path: '/' });
    window.location.href = '/';
  }

  render() {
    const { selected } = this.state;
    const { dealer, inner } = this.props;
    return (
      <Container
        className="d-flex flex-column justify-content-between h-100"
        backgroundColor="#fafafa"
        style={{
          overflow: 'auto',
        }}
        boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
      >
        <div>
          <DealerTab dealer={dealer} />

          { inner
            ? (
              <div>
                {inner}
                <hr />
              </div>
            )
            : ''
          }

          <Tab
            searchKey="purchase"
            name="Purchases"
            icon="fas fa-shopping-cart"
            onClick={() => { window.location.href = '/user/purchase'; }}
          />
          <Tab
            searchKey="pending"
            name="Pending"
            icon="fas fa-sync-alt"
            notification={0}
            onClick={() => { window.location.href = '/user/pending'; }}
          />
          <Tab
            name="Documents"
            icon="fas fa-file"
            onClick={this.markSelected}
          />
          <Tab
            searchKey="financial"
            name="Financial Analysis"
            icon="fas fa-dollar-sign"
            onClick={() => { window.location.href = '/user/financial'; }}
          />
          <Tab
            searchKey="subscription"
            name="Subscription"
            icon="far fa-newspaper"
            onClick={() => { window.location.href = '/user/subscription'; }}
          />
          <Tab
            searchKey="transactions"
            name="Transactions"
            icon="fas fa-file-invoice-dollar"
            onClick={() => { window.location.href = '/user/transactions'; }}
          />
          <Tab
            name="Sign Out"
            icon="fas fa-sign-out-alt"
            onClick={this.signOut}
          />
        </div>
        <div>
          <FundTab funds={{ remaining: this.state.funds, total: '10 000' }} />
          <Tab
            searchKey="user"
            name="Settings"
            icon="fas fa-cog"
            selected={selected}
            className="border-top pt-2"
            onClick={() => { window.location.href = '/user'; }}
          />
        </div>
      </Container>
    );
  }
}

AccountPanel.propTypes = {
  cookies: PropTypes.object,
  dealer: PropTypes.object,
};

AccountPanel.defaultProps = {
  cookies: {},
  dealer: {},
};

export default withCookies(AccountPanel);
