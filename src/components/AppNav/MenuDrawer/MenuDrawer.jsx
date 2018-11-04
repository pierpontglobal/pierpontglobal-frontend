import React from 'react';
import Slider from '../../Sider/Sider';
import Tab from './Tab/Tab';

const style = {
    backgroundColor: '#fafafa'
}
function MenuDrawer({open, onMaskClick}) {
    return (
        <div style={style}>
            <Slider
                open={open}
                onMaskClick={onMaskClick}
            >
                <div 
                    className="d-flex flex-column align-items-between pt-5 px-4 pb-2 h-100"
                    style={style}
                >
                    <div className="d-flex flex-column mb-auto pt-4">
                        <Tab icon="fas fa-home">Home</Tab>
                        <Tab icon="fas fa-car">MarketPlace</Tab>
                        <Tab icon="fas fa-phone">Contact Us</Tab>
                    </div>
                    <input 
                        type="text" 
                        className="w-100 h-100"
                        placeholder="Search"
                        style={{
                            backgroundColor: '#EEEEEE',
                            borderStyle: 'none',
                            maxHeight: '38px'
                        }}
                    />
                </div>
            </Slider>
        </div>
    );
}

export default MenuDrawer;