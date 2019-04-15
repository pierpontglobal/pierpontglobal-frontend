import React from 'react';
import Slider from '../../Sider/Sider';
import Tab from './Tab/Tab';
import AccountPanel from '../../AccountPanel/AccountPanel';
import Home from '@material-ui/icons/Home';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Phone from '@material-ui/icons/Phone';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import SliderOptions from '../../Sider/slider-options/SliderOptions';
import styled from 'styled-components';

const dealerExample = {
  image: null,
  name: 'Dealer name',
  address: 'Address...',
  email: 'dealer@example.com',
  number: '+1 (809) 123-5555',
};

const menuOptions = [
  { label: 'Home', icon: <Home />, urlMatch: '/' },
  { label: 'Marketplace', icon: <DirectionsCar />, urlMatch: '/marketplace' },
  { label: 'Contact us', icon: <Phone />, urlMatch: '/contact-us' },
];

const MenuTitle = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 16px;
  text-align: center;
  margin-top: 8px;
  font-weight: 600;
  font-size: 1.25rem;
`;

function MenuDrawer({ open, onMaskClick, afterOptionclick }) {
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
  );
}

export default MenuDrawer;
