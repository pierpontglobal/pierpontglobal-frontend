import React from 'react';
import Slider from '../../Sider/Sider';
import Tab from './Tab/Tab';
import AccountPanel from '../../AccountPanel/AccountPanel';


const dealerExample = {
  image: null,
  name: 'Dealer name',
  address: 'Address...',
  email: 'dealer@example.com',
  number: '+1 (809) 123-5555',
};

function MenuDrawer({ open, onMaskClick }) {
  if (window.location.pathname.includes('/user')) {
    return (
      <Slider
        open={open}
        onMaskClick={onMaskClick}
      >
        <AccountPanel
          dealer={dealerExample}
          inner={(
            <div style={{ marginLeft: '20px' }}>
              <Tab href="/" icon="fas fa-home">Home</Tab>
              <Tab href="/marketplace" icon="fas fa-car">MarketPlace</Tab>
              <Tab href="/contact-us" icon="fas fa-phone">Contact Us</Tab>
            </div>
          )}
        />
      </Slider>
    );
  }
  return (
    <Slider
      open={open}
      onMaskClick={onMaskClick}
    >
      <div style={{ padding: '20px' }}>
        <Tab href="/" icon="fas fa-home">Home</Tab>
        <Tab href="/marketplace" icon="fas fa-car">MarketPlace</Tab>
        <Tab href="/contact-us" icon="fas fa-phone">Contact Us</Tab>
      </div>
    </Slider>
  );
}

export default MenuDrawer;
