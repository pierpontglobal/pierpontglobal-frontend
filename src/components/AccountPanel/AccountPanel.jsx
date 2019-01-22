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
            token: cookies.get('token')
        }

        this.signOut = this.signOut.bind(this);
    }

    markSelected = (selected) => this.setState({selected});

    async signOut() {
        let config = {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          }
        }
        await axios.post(`${ApiServer}/api/v1/user/invalidate`, {}, config)
        window.location.href = "/";
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
                            name="Purchases"
                            icon="fas fa-shopping-cart"
                            onClick={this.markSelected}
                        />
                        <Tab
                            name="Pending"
                            icon="fas fa-sync-alt"
                            notification={0}
                            onClick={this.markSelected} 
                        />
                        <Tab
                            name="Documents"
                            icon="fas fa-file"
                            onClick={this.markSelected} 
                        />
                        <Tab
                            name="Financial Analysis"
                            icon="fas fa-dollar-sign"
                            onClick={this.markSelected} 
                        />
                        <Tab
                            searchKey="subscription"
                            name="Subscription"
                            icon="far fa-newspaper"
                            onClick={() => {window.location.href = "/user/subscription"}} 
                        />
                        <Tab
                            name="Sign Out"
                            icon="fas fa-sign-out-alt"
                            onClick={this.signOut} 
                        />
                    </div>
                    <div>
                        <FundTab funds={{remaining: funds, total: '10 000'}} />
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
