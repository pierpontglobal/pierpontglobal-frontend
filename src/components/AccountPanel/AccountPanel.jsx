import React from 'react';
import Tab from './Tab/Tab';
import DealerTab from './DealerTab/DealerTab';
import FundTab from './FundTab/FundTab';
import Container from '../styles/Container/Container';

export default class AccountPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        }
    }

    markSelected = (selected) => this.setState({selected});
    
    render() {
        const {selected } = this.state;
        const { dealer, funds } = this.props;
        return (
            <Container
                className="d-flex flex-column justify-content-between h-100"
                backgroundColor="#fafafa"
                boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
                maxHeight="708px"
            >
                    <div>
                        <DealerTab dealer={dealer} />
                        <Tab
                            name="Purchases"
                            icon="fas fa-shopping-cart"
                            selected={selected}
                            onClick={this.markSelected}
                        />
                        <Tab
                            name="Pending"
                            icon="fas fa-sync-alt"
                            selected={selected}
                            notification={22}
                            onClick={this.markSelected} 
                        />
                        <Tab
                            name="Documents"
                            icon="fas fa-file"
                            selected={selected}
                            onClick={this.markSelected} 
                        />
                        <Tab
                            name="Financial Analysis"
                            icon="fas fa-dollar-sign"
                            selected={selected}
                            onClick={this.markSelected} 
                        />
                    </div>
                    <div>
                        <FundTab funds={{remaining: funds, total: '10 000'}} />
                        <Tab
                            name="Settings"
                            icon="fas fa-cog"
                            selected={selected}
                            className="border-top pt-2"
                            onClick={this.markSelected} 
                        />
                    </div>
            </Container>
        );
    }
}
