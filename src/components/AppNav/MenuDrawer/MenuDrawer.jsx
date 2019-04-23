import React, { Component } from 'react';
import Slider from '../../Slider/Slider';
import Tab from './Tab/Tab';
import AccountPanel from '../../AccountPanel/AccountPanel';
import Home from '@material-ui/icons/Home';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Phone from '@material-ui/icons/Phone';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Input from '@material-ui/icons/Input'
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import NotificationImportant from '@material-ui/icons/NotificationImportant'
import SliderOptions from '../../Slider/slider-options/SliderOptions';
import styled from 'styled-components';
import { Modal } from '@material-ui/core'
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

const MenuTitle = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 16px;
  text-align: center;
  margin-top: 8px;
  font-weight: 600;
  font-size: 1.25rem;
`;

class MenuDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  userIsLoggedIn = () => {
    return !!this.props.cookies.get('token', { path: '/'} );
  }

  showLoginModal = () => {
    this.setState({
      open: false,
    });
    this.props.showSignIn();
  }

  componentWillReceiveProps(newProps) {
    if (this.state.open !== newProps.open){
      this.setState({
        open: newProps.open
      });
    }
  }

  render() {
    const { onMaskClick, afterOptionclick, onRequestOpen, dealer } = this.props;
    const { open } = this.state;

    let menuOptions = [
      { label: 'Home', icon: <Home color='primary'/>, urlMatch: '/' },
      { label: 'Marketplace', icon: <DirectionsCar color='primary'/>, urlMatch: '/marketplace' },
      { label: 'Contact us', icon: <Phone color='primary'/>, urlMatch: '/contact-us' },
      { label: 'Profile', icon: <AccountCircle  color='primary'/>, urlMatch: '/user' }
    ];

    if (!this.userIsLoggedIn()) {
      menuOptions = [
        { label: 'Home', icon: <Home color='primary'/>, urlMatch: '/' },
        { label: 'Marketplace', icon: <DirectionsCar color='primary'/>, urlMatch: '/marketplace' },
        { label: 'Contact us', icon: <Phone color='primary'/>, urlMatch: '/contact-us' },
        { label: 'Sign in', icon: <Input color='primary' />, handleClick: this.showLoginModal }
      ];
    }

    if (window.location.pathname.includes('/user')) {
      return (
        <Slider
          open={open}
          handleClose={onMaskClick}
          handleOpen={onRequestOpen}
        >
          <AccountPanel
            dealer={dealer}
            inner={(<SliderOptions options={menuOptions} onClickOption={afterOptionclick} />)}
          />
        </Slider>
      );
    }
    return (
      <>
        <Slider
          open={open}
          swipeAreaWidth={20}
          disableSwipeToOpen={false}
          handleClose={onMaskClick}
          handleOpen={onRequestOpen}
        >
          <MenuTitle>
            Menu
          </MenuTitle>
          <SliderOptions options={menuOptions} onClickOption={afterOptionclick} />
        </Slider>
      </>
    );
  }
}

export default withCookies(MenuDrawer);
