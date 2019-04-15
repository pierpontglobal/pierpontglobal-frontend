import React, { Component } from 'react';
import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';
import { withRouter } from 'react-router-dom';
import SliderOptions from './slider-options/SliderOptions';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  drawer: {
    width: '80%',
  },
  paper: {
    width: '100%',
  }
});
class Slider extends Component {

  goToAction = (url) => {

    // Propagate ation to parent
    if (!!this.props.afterOptionclick) { 
      this.props.afterOptionclick(url);
    }
  }

  render() {
    const { open, onMaskClick, children, placement, style, options, classes } = this.props;
    return (
      <>
        <SwipeableDrawer
          open={open}
          onClose={this.props.handleClose}
          disableBackdropTransition={true}
          containerClassName={classes.drawer}
          width={200}
        >
          <div style={{ minWidth: '270px'  }}>
            {
              (!!children)
              ? children
              : (<SliderOptions options={options} onClickOption={this.goToAction} />)
            }
          </div>
        </SwipeableDrawer>
      </>
    );
  }
}

export default withStyles(styles)(Slider);
