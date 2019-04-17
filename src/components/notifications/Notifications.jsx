import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import styled from 'styled-components';
import Close from '@material-ui/icons/Close';
import { IconButton, Button } from '@material-ui/core';
import { identity } from 'rxjs';
import axios from 'axios';
import { ApiServer } from '../../Defaults';
import posed, { PoseGroup } from 'react-pose';

const Card = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const NotificationCard = styled(Card)`
  width: 100%;
  height: 100%;
  min-height: 120px;
  display: grid;
  grid-template-rows: 30% 40% 30%;
  background-color: white;
  border-radius: 16px;
  margin-bottom: 8px;
  margin-top: 8px;
  padding: 8px 16px;
  opacity: 0;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;

const NotificationsWrapper = styled.div`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 120px);
  overflow-y: scroll;
  @media only screen and (min-width: 748px) {
    max-height: calc(100vh - 220px);
    overflow-y: scroll;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #3e78c0;
  -webkit-box-shadow: -4px 12px 10px -14px rgba(0,0,0,0.75);
  -moz-box-shadow: -4px 12px 10px -14px rgba(0,0,0,0.75);
  box-shadow: -4px 12px 10px -14px rgba(0,0,0,0.75);
  width: 100%;
  padding: 8px 16px;
`;

const Wrapper = styled.div`
  border: 1.0px solid #3e78c0;
`;

const ActionsButtons = styled.div`
  width: 100%;
  min-height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algo: [],
    }
  }

  componentDidMount = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.props.cookies.get("token", { path: "/" })}`;

  }

  showDetail = (id) => {
    axios.post(`${ApiServer}/api/v1/notification/read?id=${id}`).then(data => {
      this.animateCardExit(id);
      this.props.onRead(data.data);
      this.props.onClose();
    });
  }

  animateCardExit = id => {
    let tagId = `card-${id}`;

  }

  readAll = () => {
    let ids = this.props.notifications.map(n => n.id);
    axios.post(`${ApiServer}/api/v1/notification/read_all`,{
      ids: ids
    }).then(data => {
      this.props.onReadAll(data.data);
    });
  }

  render() {
    const { notifications } = this.props;
    console.log(notifications);
    return (
     <Wrapper>
      <TitleWrapper>
        <span style={{ fontWeight: '600' }}>Notifications</span>
        <IconButton onClick={this.props.onClose}>
          <Close color="secondary" />
        </IconButton>
      </TitleWrapper>
      <NotificationsWrapper>
        <ActionsButtons>
          <Button onClick={this.readAll}>Mark all as read</Button>
        </ActionsButtons>
        <PoseGroup>
          {
            notifications.map((n) => {
              return (
                <NotificationCard key={n.id} onClick={() => this.showDetail(n.id)}>
                  <div><span style={{ fontSize: '0.90rem', fontWeight: '600' }}>{ n.data.title }</span></div>
                  <div><span style={{ fontSize: '0.85rem' }}>{ n.data.message }</span></div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', fontStyle: 'italic' }}><span style={{ fontSize: '0.75rem' }}>{ new Date(n.data.sent_date).toDateString() }</span></div>
                </NotificationCard>
              );
            })
          } 
        </PoseGroup>
      </NotificationsWrapper>
     </Wrapper>
    );
  }
}

export default withCookies(Notifications);