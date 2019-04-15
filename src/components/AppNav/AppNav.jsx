import React from 'react';
import Img from 'react-image';
import LinkBtn from './LinkBtn/LinkBtn';
import BurgerBtn from './BurgerBtn/BurgerBtn';
import MenuDrawer from './MenuDrawer/MenuDrawer';
import AccountManager from '../support/AccountManager';
import './styles.css';
import { withRouter } from 'react-router-dom';

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
    this.props.history.push(url);
    this.setState({
      menuOpen: false,
    });
  }

  openMenuSide() {
    this.setState({
      menuOpen: true,
    });
  }

  render() {
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
          <AccountManager cookies={this.props.cookies} />
        </div>
      </div>
    );
  }
}

export default  withRouter(AppNav);