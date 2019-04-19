import React from 'react';
import Img from 'react-image';
import BurgerBtn from './BurgerBtn/BurgerBtn';
import MenuDrawer from './MenuDrawer/MenuDrawer';
import AccountManager from '../support/AccountManager';
import './styles.css';
import { withRouter } from 'react-router-dom';

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

const qs = require('query-string');

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

  goToProfile = () => {
    this.props.history.push('/user');
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
      <div
        className="d-flex flex-row py-2 justify-content-md-center px-3 px-md-2 w-100"
        style={style}
      >
        <SignInModal notifyClosed={() => { this.showSignIn(false); }} show={showModal} />
        <div
          className="nav-items"
          style={{ maxWidth: '950px' }}
        >
          <MenuDrawer
            open={this.state.menuOpen}
            onMaskClick={this.onTouchEnd}
            afterOptionclick={this.optionClick}
            showSignIn={() => { this.showSignIn(true); }}
            onRequestOpen={this.openMenuSide}
          />
          <BurgerBtn onClick={this.openMenuSide} />

          <button
            type="button"
            className="border-0 web-logo"
            style={{
              background: 'transparent',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              justifyItems: 'center',
              overflow: 'visible',
              maxWidth: '170px',
            }}
            onClick={() => { window.location.href = '/'; }}
          >

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
          </button>

          <div className="menu-sider" id="nav-bar-sub-menu">
            <LinkBtn onClick={ () => this.props.history.push('/') }>Home</LinkBtn>
            <LinkBtn onClick={ () => this.props.history.push('/marketplace') }>MarketPlace</LinkBtn>
            <LinkBtn onClick={ () => this.props.history.push('/contact-us') }>Contact&nbsp;Us</LinkBtn>
          </div>
          
          <AccountManager history={this.props.history} showSignIn={() => { this.showSignIn(true); }} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AppNav));
