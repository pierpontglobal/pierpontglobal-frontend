import React from 'react';
import LinkBtn from './LinkBtn/LinkBtn';
import logo from './logo.png';
import BurgerBtn from './BurgerBtn/BurgerBtn';
import ProfileBtn from './ProfileBtn/ProfileBtn';
import MenuDrawer from './MenuDrawer/MenuDrawer';
import ProfileDrawer from './ProfileDrawer/ProfileDrawer';
import AccountMAnager from '../support/AccountManager';
import './styles.css';


const style = {
  backgroundColor: '#fafafa',
  boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.09)',
  border: 'solid 0.5px rgba(0, 0, 0, 0.12)',
  position: 'fixed',
  top: 0,
  overflow: 'show',
  zIndex: 1000,
};

export default class AppNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      profileOpen: false,
    };
  }

  onTouchEnd() {
    this.setState({
      menuOpen: false,
      profileOpen: false,
    });
  }

  openMenuSide() {
    this.setState({
      menuOpen: true,
    });
  }

  openProfileSide() {
    this.setState({
      profileOpen: true,
    });
  }

  render() {
    return (
      <div
        className="d-flex flex-row py-2 justify-content-md-center px-3 px-md-2 w-100"
        style={style}
      >
        <div
          className="d-flex flex-fill justify-content-md-center"
          style={{ maxWidth: '1366px' }}
        >
          <MenuDrawer
            open={this.state.menuOpen}
            onMaskClick={this.onTouchEnd}
          />
          <ProfileDrawer
            open={this.state.profileOpen}
            onMaskClick={this.onTouchEnd}
          />
          <BurgerBtn onClick={this.openMenuSide} />

          <ProfileBtn onClick={this.openProfileSide} />
          <div className="menu" id="nav-bar-sub-menu">
            <LinkBtn href="/">Home</LinkBtn>
            <LinkBtn href="/marketplace">MarketPlace</LinkBtn>
            <LinkBtn>Contact&nbsp;Us</LinkBtn>
          </div>
          <div className="menu" id="nav-bar-menu">
            <img
              onClick={() => { window.location.href = '/'; }}
              style={{
                height: '40px',
                cursor: 'pointer',
              }}
              className="logo"
              src="/logos/Logo 1 - Blue.png"
              alt="PierpontGlobal"
            />
            <div style={{ display: 'flex' }}>
              <span style={{ marginRight: '10px' }}>
                <AccountMAnager cookies={this.props.cookies} />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
