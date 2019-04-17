import React from 'react';
import Img from 'react-image';
import LinkBtn from './LinkBtn/LinkBtn';
import BurgerBtn from './BurgerBtn/BurgerBtn';
import MenuDrawer from './MenuDrawer/MenuDrawer';
import AccountManager from '../support/AccountManager';
import './styles.css';
import { withRouter } from 'react-router-dom';
import NotificatinBadge from './notification-badge/NotificatinBadge';
import Person from '@material-ui/icons/Person';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

class AppNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };

    this.openMenuSide = this.openMenuSide.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  onTouchEnd() {
    this.setState({
      menuOpen: false,
    });
  }

  optionClick = (url) => {
    if (!!url) {
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

  render() {
    const { cookies, classes } = this.props;
    return (
      <div
        className="d-flex flex-row py-2 justify-content-md-center px-3 px-md-2 w-100"
        style={style}
      >
        <div
          className="nav-items"
          style={{ maxWidth: '950px' }}
        >
          <MenuDrawer
            open={this.state.menuOpen}
            onMaskClick={this.onTouchEnd}
            afterOptionclick={this.optionClick}
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
            <LinkBtn href="/">Home</LinkBtn>
            <LinkBtn href="/marketplace">MarketPlace</LinkBtn>
            <LinkBtn href="/contact-us">Contact&nbsp;Us</LinkBtn>
          </div>
          <AccountManager />
          {
            (!!cookies.get('token', { path: '/' })) ? 
              <UserInfoWrapper>
                <NotificatinBadge /> 
                <IconButton
                  disableRipple={true}  
                  className={classes.iconButton} 
                  onClick={() => this.goToProfile()}>
                  <Person />
                </IconButton>
              </UserInfoWrapper> : null
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AppNav));