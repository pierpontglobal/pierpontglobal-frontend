import React from 'react';
import Tab from './Tab/Tab';
import DealerTab from './DealerTab/DealerTab';
import FundTab from './FundTab/FundTab';
import Container from '../styles/Container/Container';
import axios from 'axios';
import { ApiServer } from '../../Defaults';

export default class AccountPanel extends React.Component {
    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            selected: '',
            token: cookies.get('token'),
            funds: 0
        }

        this.signOut = this.signOut.bind(this);
        this.getFunds = this.getFunds.bind(this);
    }

    markSelected = (selected) => this.setState({selected});

    async signOut() {
        let config = {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          }
        }
        await axios.post(`${ApiServer}/api/v1/user/invalidate`, {}, config)
        this.props.cookies.remove('token')
        window.location.href = "/";
    }

    componentDidMount(){
        this.getFunds();
    }

  async getFunds() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    const responseFunds = (await axios.get(`${ApiServer}/api/v1/user/funds`, config)).data;
    this.setState({
      funds: responseFunds.balance,
    });
  }
    
    render() {
        const { selected } = this.state;
        const { dealer, funds } = this.props;
        return (
            <Container
                className="d-flex flex-column justify-content-between h-100"
                backgroundColor="#fafafa"
                boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
            >
                    <div>
                        <DealerTab dealer={dealer} />
                        <Tab
                            searchKey="purchase"
                            name="Purchases"
                            icon="fas fa-shopping-cart"
                            onClick={() => {window.location.href = "/user/purchase"}} 
                        />
                        <Tab
                            searchKey="pending"
                            name="Pending"
                            icon="fas fa-sync-alt"
                            notification={0}
                            onClick={this.markSelected}
                            onClick={() => {window.location.href = "/user/pending"}}
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
                            onClick={() => {window.location.href = "/user/financial"}} 
                        />
                        <Tab
                            searchKey="subscription"
                            name="Subscription"
                            icon="far fa-newspaper"
                            onClick={() => {window.location.href = "/user/subscription"}} 
                        />
                        <Tab
                            searchKey="transactions"
                            name="Transactions"
                            icon="fas fa-file-invoice-dollar"
                            onClick={() => {window.location.href = "/user/transactions"}} 
                        />
                        <Tab
                            name="Sign Out"
                            icon="fas fa-sign-out-alt"
                            onClick={this.signOut} 
                        />
                    </div>
                    <div>
                        <FundTab funds={{remaining: this.state.funds, total: '10 000'}} />
                        <Tab
                            searchKey="user"
                            name="Settings"
                            icon="fas fa-cog"
                            selected={selected}
                            className="border-top pt-2"
                            onClick={() => {window.location.href = "/user"}} 
                        />
                    </div>
            </Container>
        );
    }
}
