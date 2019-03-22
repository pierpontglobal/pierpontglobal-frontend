import React from 'react';
import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';

function Slider({
  open, onMaskClick, children, placement, style,
}) {
  return (
    <Drawer
      style={style}
      open={open}
      width="75%"
      height="100%"
      placement={placement || 'left'}
      handler={false}
      level={null}
      onMaskClick={onMaskClick}
    >
      {children}
    </Drawer>
  );
}

export default Slider;
