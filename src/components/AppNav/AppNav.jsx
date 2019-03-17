import React from 'react';
import LinkBtn from './LinkBtn/LinkBtn';
import BurgerBtn from './BurgerBtn/BurgerBtn';
import MenuDrawer from './MenuDrawer/MenuDrawer';
import ProfileDrawer from './ProfileDrawer/ProfileDrawer';
import AccountManager from '../support/AccountManager';
import './styles.css';

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

export default class AppNav extends React.Component {
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
          />
          <BurgerBtn onClick={this.openMenuSide} />

          <button
            type="button"
            className="border-0 web-logo"
            style={{ background: 'transparent', display: 'flex', placeContent: 'center' }}
            onClick={() => { window.location.href = '/'; }}
          >
            <img
              style={{
                height: '40px',
                cursor: 'pointer',
              }}
              className="logo"
              src="/logos/Logo 1 - Blue.png"
              alt="PierpontGlobal"
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
