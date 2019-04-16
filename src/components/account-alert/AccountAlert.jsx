import React, { Component } from 'react';
import styled from 'styled-components';
import Close from '@material-ui/icons/Close';
import { IconButton, Button } from '@material-ui/core';
import Warning from '@material-ui/icons/Warning';

const AccountAlertWrapper = styled.div`
  width: 80%;
  height: 80%;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  margin: 0 auto;
  top: 5%;
  position: relative;
  @media only screen and (min-width: 600px) {
    width: 60%;
    height: 60%;
  }
`;

const Header = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  background-color: #ff8080;
`;

const Title = styled.div`
  display: flex;
  margin-left: 8px;
  padding: 8px;
  justify-content: flex-start;
  align-items: center;
`;

const AlertCount = styled.div`
  border-radius: 8px;
  background-color: #b30000;
  padding: 4px 8px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 8px;
  overflow: scroll;
  @media only screen and (min-width: 600px) {
    padding: 24px;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3a3a3a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  @media only screen and (min-width: 600px) {
    padding: 24px;
  }
`;

class AccountAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
    };
  }

  render() {
    const { alerts } = this.state;

    return (
      <AccountAlertWrapper>
        <Header>
          <Title>
            <AlertCount>{ alerts.length }</AlertCount>
            <div style={{ marginLeft: '8px' }}>
              <span style={{ fontWeight: '600' }}>Account Alert(s)</span>
            </div>
          </Title>
          <IconButton>
            <Close />
          </IconButton>
        </Header>
        <Content>
          <div style={{ margin: '8px 0px' }}>
            <Warning color="primary" /> <span> A problem with your account is blocking your ability to bid </span>
          </div>
          <div>
            <span style={{ fontWeight: '600' }}>Contact: </span><span>Dealer name here</span>
          </div>
          <div>
            <span style={{ fontWeight: '600' }}>Issue: </span><span>Issue description here</span>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontWeight: '600', color: 'darkred' }}>
              STATUS: Your ability to bid is currently blocked. Issue Code (1028)
            </div>
            <div>
              <span style={{ fontWeight: '600' }}>Issue: </span>Issue description here
            </div>
            <div>
              <div>
                <span style={{ fontWeight: '600' }}>Solutions</span>
              </div>
              <div>
                <ul>
                  <li><span>FASTEST: </span>Fastest solution for this issue here.</li>
                  <li><span>FASTER: </span>Faster solution for this issue here.</li>
                  <li><span>FAST: </span>Fast solution for this issue here.</li>
                </ul>
              </div>
            </div>
          </div>
        </Content>
        <Footer>
          <Button variant="outlined" color="secondary">Refresh</Button>
          <Button variant="outlined" color="secondary">Cancel</Button>
        </Footer>
      </AccountAlertWrapper>
    );
  }
}

export default AccountAlert;
