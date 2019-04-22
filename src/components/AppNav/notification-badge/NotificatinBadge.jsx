import React, { Component } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
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
import NotificationDetailModal from '../../notifications/notification-detail-modal/NotificationDetailModal';
import PPGModal from '../../ppg-modal/PPGModal';
import NotificationTypes from '../../../constants/NotificationTypes';

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
  top: 60px !important;
  @media only screen and (min-width: 748px) {
    width: 24% !important;
    right: 16% !important;
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
      openNotificationModal: false,
      selectedNotification: undefined
    }
  }

  componentWillMount = () => {
    this.cable = ActionCable.createConsumer(WSConnection);
    this.userToken = this.props.cookies.get('token', { path: '/' });

    this.subscription = this.cable.subscriptions.create({
      channel: 'AdminNotificationChannel',
      token: this.userToken
    },
    {
      received: (data) => {
          this.handleReceived(data);
      }
    });
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
      notification_type: data.notification_type,
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
    }, () => {
      // Open Notification Detail Modal
      this.showNotificationModal(notification);
    });
  }
  onReadAllNotification = notifications => {
    this.setState({
      notifications: notifications
    });
  }

  showNotificationModal = (notification) => {
    this.setState({
      openNotificationModal: true,
      selectedNotification: notification
    });
  }

  closeNotificationModal = () => {
    this.setState({
      openNotificationModal: false
    });
  }

  render() {
    const { classes, cookies } = this.props;
    const { notifications, open, openNotificationModal, selectedNotification } = this.state;
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
              { (notifications.length > 0) ? <NotificationsActiveIcon /> : <NotificationsIcon /> }
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
          <PPGModal
            setOpen={openNotificationModal}
            handleClose={this.closeNotificationModal}
            setPadding={false}
            onlyChildren={true}
          >
            <NotificationDetailModal handleClose={this.closeNotificationModal} selectedNotification={selectedNotification} /> 
          </PPGModal>
        </ActionCableProvider>
      </>
    );
  }
}

export default withStyles(styles)(withCookies(NotificationBadge));