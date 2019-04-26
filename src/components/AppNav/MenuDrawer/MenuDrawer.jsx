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
import {FormattedMessage} from 'react-intl';


// To avoid performance issues I've declared this variables up here
const labelHome = <FormattedMessage id='label.home'/>;
const labelMarket = <FormattedMessage id='label.market'/>;
const labelContact = <FormattedMessage id='label.contact-us'/>;
const labelProfile = <FormattedMessage id='label.profile'/>;
const labelSignin = <FormattedMessage id='label.sign-in'/>;

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
      { label: labelHome, icon: <Home color='primary'/>, urlMatch: '/' },
      { label: labelMarket, icon: <DirectionsCar color='primary'/>, urlMatch: '/marketplace' },
      { label: labelContact, icon: <Phone color='primary'/>, urlMatch: '/contact-us' },
      { label: labelProfile, icon: <AccountCircle  color='primary'/>, urlMatch: '/user' }
    ];

    if (!this.userIsLoggedIn()) {
      menuOptions = [
        { label: labelHome, icon: <Home color='primary'/>, urlMatch: '/' },
        { label: labelMarket, icon: <DirectionsCar color='primary'/>, urlMatch: '/marketplace' },
        { label: labelContact, icon: <Phone color='primary'/>, urlMatch: '/contact-us' },
        { label: labelSignin, icon: <Input color='primary' />, handleClick: this.showLoginModal }
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
            <FormattedMessage id="label.manu" />
          </MenuTitle>
          <SliderOptions options={menuOptions} onClickOption={afterOptionclick} />
        </Slider>
      </>
    );
  }
}

export default withCookies(MenuDrawer);
