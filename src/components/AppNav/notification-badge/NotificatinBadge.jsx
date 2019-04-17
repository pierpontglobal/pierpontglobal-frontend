import React, { Component } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import { WSConnection, ApiServer } from '../../../Defaults';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Notifications from '../../notifications/Notifications';

const styles = theme => ({
  iconButton: {
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0);'
    }
  },
  margin: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
  }
});

const CustomPopper = styled(Popper)`
  width: 100% !important;
  height: 100% !important;
  transform: none !important;
  top: 50px !important;
  @media only screen and (min-width: 748px) {
    width: 30% !important;
    right: 8% !important;
    left: auto !important;
    height: 65% !important;
  }
`;

class NotificationBadge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      open: false,
    }
  }

  componentWillMount = () => {
    this.cable = ActionCable.createConsumer(WSConnection);
    this.userId = this.props.cookies.get('user_id', { path: '/' });


    this.subscription = this.cable.subscriptions.create({
      channel: 'AdminNotificationChannel',
      user_id: this.userId
    },
    {
      received: (data) => {
          this.handleReceived(data);
      }
    });
    console.log(this.subscription);
  }

  handleReceived = (data) => {
    const { notifications } = this.state;

    let new_noti = {
      id: data.notification_id,
      data: {
        sent_date: data.sent_date,
        title: data.title,
        message: data.message,
        payload: data.payload
      },
      read_at: undefined,
    }

    this.setState({
      notifications: [new_noti, ...notifications]
    })
  }

  componentDidMount = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;

    axios.get(`${ApiServer}/api/v1/notification`).then(data => {
      this.setState({
        notifications: data.data
      });
    });
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    this.setState({ open: false });
  };

  onReadNotification = notification => {
    this.setState({
      notifications: [...this.state.notifications].filter(x => x.id !== notification.id)
    });
  }
  onReadAllNotification = notifications => {
    this.setState({
      notifications: notifications
    });
  }

  render() {
    const { classes, cookies } = this.props;
    const { notifications, open } = this.state;
    return (
      <>
        <ActionCableProvider cable={this.cable}>
          <IconButton 
            disabled={notifications.length <= 0}
            disableRipple={true} 
            onClick={this.handleToggle} 
            className={classes.iconButton} 
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true">
            <Badge className={classes.margin} badgeContent={notifications.length} max={99} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <CustomPopper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom', width: '100%' }}
              >
                <ClickAwayListener onClickAway={this.handleClose}>
                  <div style={{ width: '100%', backgroundColor: '#efeded' }}>
                      <Notifications onReadAll={this.onReadAllNotification} onRead={this.onReadNotification} cookies={cookies} notifications={notifications} onClose={this.handleClose} />
                  </div>
                </ClickAwayListener>
              </Grow>
            )}
          </CustomPopper>
        </ActionCableProvider>
      </>
    );
  }
}

export default withStyles(styles)(withCookies(NotificationBadge));