import React from 'react';
import Slider from '../../Sider/Sider';
import AccountPanel from '../../AccountPanel/AccountPanel';

const dealer = {
    image: 'https://www.santodomingomotors.com.do/themes/santo-domingo-motors/assets/img/logoSDM.png',
    name: 'Nice Auto Inc.',
    address: '5827 Rodman St., Hollywood, FL 33023',
    email: 'nicecarinc@pierpoint.com',
    number: '809 272 9092'
}

function ProfileDrawer({open, onMaskClick}) {
    return (
        <Slider
            open={open}
            onMaskClick={onMaskClick}
            placement="right"
        >
            <AccountPanel dealer={dealer} />
        </Slider>
    );
}

export default ProfileDrawer;
