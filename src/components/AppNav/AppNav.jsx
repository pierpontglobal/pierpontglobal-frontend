import React from 'react';
import Img from 'react-image';
import MenuDrawer from './MenuDrawer/MenuDrawer';
import AccountManager from '../support/AccountManager';
import './styles.css';
import { withRouter } from 'react-router-dom';
import BurgerIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import SignInModal from '../support/SignInModal/SignInModal';

const style = {
  backgroundColor: '#fafafa',
  boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.09)',
  border: 'solid 0.5px rgba(0, 0, 0, 0.12)',
  position: 'fixed',
  height: '58px',
  top: 0,
  overflow: 'show',
  zIndex: 1000,
};

const styles = theme => ({
  iconButton: {
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0);'
    }
  },
});

const qs = require('query-string');

const LinkBtn = styled.div`
  font-weight: 600;
  opacity: 0.54;
  color: #000000;
  line-height: 1.31;
  text-decoration: 'none';
  &:hover {
    cursor: pointer;
  }
`;

const AppNavWrapper = styled.div`
  background-color: #fafafa;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.09);
  border: solid 0.5px rgba(0, 0, 0, 0.12);
  position: fixed;
  height: 58px;
  top: 0;
  overflow: show;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NavItems = styled.div`
  display: flex;
  place-content: space-between;
  justify-content: space-between;
  align-content: space-between;
  width: 100%;
  align-items: center;
  justify-items: center;
  @media only screen and (min-width: 600px) {
    max-width: 950px;
  }
`;

const BurgerBtn = styled.i`
  color: #212529;
  font-size: 1.7em;
  opacity: 0.85;
  margin: 4px 16px;
  @media only screen and (min-width: 600px) {
    display: none;
  }
`;

const LogoWrapper = styled.button`
  background: transparent;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  overflow: visible;
  max-width: 170px;
  position: relative;
  width: auto;
  left: auto;
  margin: 0;
  border: none;
`;

class AppNav extends React.Component {
  constructor(props) {
    super(props);

    this.params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    this.state = {
      menuOpen: false,
      showModal: this.params.signIn || false,
    };

    this.openMenuSide = this.openMenuSide.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.optionClick = this.optionClick.bind(this);
    this.showSignIn = this.showSignIn.bind(this);
  }

  onTouchEnd() {
    this.setState({
      menuOpen: false,
    });
  }

  optionClick(url) {
    if (url) {
      this.props.history.push(url);
    }
    this.setState({
      menuOpen: false,
    });
  }

  openMenuSide() {
    this.setState({
      menuOpen: true,
    });
  }

  goTo = (path) => {
    this.props.history.push(`/${path}`);
  }

  showSignIn(status) {
    this.setState({
      showModal: status,
    });
  }

  render() {
    const { showModal } = this.state;
    const { cookies, classes } = this.props;

    return (
      <AppNavWrapper>
        <SignInModal notifyClosed={() => { this.showSignIn(false); }} show={showModal} />
        <NavItems>
          <MenuDrawer
            open={this.state.menuOpen}
            onMaskClick={this.onTouchEnd}
            afterOptionclick={this.optionClick}
            showSignIn={() => { this.showSignIn(true); }}
            onRequestOpen={this.openMenuSide}
          />
          <BurgerBtn onClick={this.openMenuSide}>
            <BurgerIcon />
          </BurgerBtn>
          <LogoWrapper onClick={() => this.goTo('')} >
            <Img
              style={{
                width: '100%',
                cursor: 'pointer',
              }}
              alt="PierpontGlobal"
              className="logo"
              src={[
                '/logos/sm_logo.webp',
                '/logos/sm_logo.jp2',
                '/logos/sm_logo.jxr',
                '/logos/sm_logo.png',
              ]}
              loader={
                <div style={{ width: '165px', height: '40px', background: '#dedede' }} />
                }
            />
          </LogoWrapper>
          <div className="menu-sider" id="nav-bar-sub-menu">
            <LinkBtn onClick={ () => this.goTo('') }>Home</LinkBtn>
            <LinkBtn onClick={ () => this.goTo('marketplace') }>MarketPlace</LinkBtn>
            <LinkBtn onClick={ () => this.goTo('contact-us') }>Contact&nbsp;Us</LinkBtn>
          </div>
          <AccountManager history={this.props.history} showSignIn={() => { this.showSignIn(true); }} />
        </NavItems>
      </AppNavWrapper>
    );
  }
}

export default withStyles(styles)(withRouter(AppNav));
