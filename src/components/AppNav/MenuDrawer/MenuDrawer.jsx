import React, { Component } from 'react';
import Slider from '../../Slider/Slider';
import Tab from './Tab/Tab';
import AccountPanel from '../../AccountPanel/AccountPanel';
import Home from '@material-ui/icons/Home';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Phone from '@material-ui/icons/Phone';
import AccountCircle from '@material-ui/icons/AccountCircle'
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import NotificationImportant from '@material-ui/icons/NotificationImportant'
import SliderOptions from '../../Slider/slider-options/SliderOptions';
import styled from 'styled-components';
import { Modal } from '@material-ui/core'
import AccountAlert from '../../account-alert/AccountAlert';

const dealerExample = {
  image: null,
  name: 'Dealer name',
  address: 'Address...',
  email: 'dealer@example.com',
  number: '+1 (809) 123-5555',
};

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
      openAlertModal: false
    }
  }

  alertsClick = () => {
    this.setState({
      openAlertModal: true
    });
  }

  render() {
    const { open, onMaskClick, afterOptionclick } = this.props;

    const menuOptions = [
      { label: 'Home', icon: <Home color='primary'/>, urlMatch: '/' },
      { label: 'Marketplace', icon: <DirectionsCar color='primary'/>, urlMatch: '/marketplace' },
      { label: 'Contact us', icon: <Phone color='primary'/>, urlMatch: '/contact-us' },
      { label: 'Profile', icon: <AccountCircle  color='primary'/>, urlMatch: '/user' }
    ];

    if (window.location.pathname.includes('/user')) {
      return (
        <Slider
          open={open}
          handleClose={onMaskClick}
        >
          <AccountPanel
            dealer={dealerExample}
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
        >
          <MenuTitle>
            Menu
          </MenuTitle>
          <SliderOptions options={menuOptions} onClickOption={afterOptionclick} />
        </Slider>
        <Modal open={this.state.openAlertModal}>
          <AccountAlert />
        </Modal>
      </>
    );
  }
}

export default MenuDrawer;
