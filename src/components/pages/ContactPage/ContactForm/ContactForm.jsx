import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import CheckIconMui from '@material-ui/icons/Check';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: 62px auto;
  grid-template-areas: 
    "username username email email"
    "message message message message"
    ". . . submit";
`;

const LoadingWrapper = styled.div`
  grid-area: message;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessWrapper = styled.div`
  grid-area: message;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const UsernameInput = styled.div`
  grid-area: username;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmailInput = styled.div`
  grid-area: email;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageInput = styled.div`
  width: 100%;
  height: 100%;
  grid-area: message;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitButtonWrapper = styled.div`
  grid-area: submit;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SubmitButton = styled.button`
  padding: 8px;
  border-radius: 4px;
  box-shadow: 2px 4px 8px 0px rgb(0, 0, 0, 0.1);
  min-width: 102px;
  border: none;
  background: -webkit-linear-gradient(to right, #2e90d1, #2573a7);
  background: linear-gradient(to right, #2e90d1, #2573a7);
  transition: all 0.2s;
  margin-right: 16px;
  & > span {
    color: white;
    font-weight: 400;
    font-size: 1.15rem;
  }
  &:hover {
    background: -webkit-linear-gradient(to right, #2e90d1, #2981bc);
    background: linear-gradient(to right, #2e90d1, #2981bc);
  }
`;

const CheckIcon = styled(CheckIconMui)`
  color: #000;
`;

const SuccessTitle = styled.div`
  width: 100%;
  padding: 16px;
  text-align: center;
  & > span { 
    font-size: 1.55rem;
  }
`;
const SuccessMessage = styled.div`
  width: 100%;
  padding: 16px;
  text-align: center;
  & > span { 
    font-size: 1.05rem;
  }
`;

const SendOtherLink = styled.a`
  cursor: pointer;
  color: darkblue;
  text-decoration: underline;
`;

const styles = theme => ({
  textField: {
    width: '90%',
  },
  messageField: {
    width: '95%',
  }
});

class ContactForm extends React.Component {
  state = {
    username: this.props.user.name,
    email: this.props.user.email,
    message: '',
    isLoading: false,
    messageSent: false,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleSubmit = () => {
    const { username, email, message } = this.state;
    this.setState({
      isLoading: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          isLoading: false,
          messageSent: true,
        })
      }, 3000);
    })
  }

  sendOther = () => {
    const { user } = this.props;
    this.setState({
      message: '',
      username: user.name,
      email: user.email,
      isLoading: false,
      messageSent: false,
    })
  }

  render() {
    const { classes } = this.props;
    const { username, email, message, isLoading, messageSent } = this.state;

    return (
      <Wrapper>
        {
          isLoading ? <LoadingWrapper><CircularProgress /></LoadingWrapper> : messageSent ? 
            <SuccessWrapper>
              <SuccessTitle>
                <span>
                  Message has been sent succesfully!
                </span>
              </SuccessTitle>
              <SuccessMessage>
                <span>
                  In less than 24 hours a member of our team will be contacting you.
                </span>
              </SuccessMessage>
              <div style={{ marginTop: '16px' }}>
                <SendOtherLink onClick={this.sendOther}>Send other</SendOtherLink>
              </div>
            </SuccessWrapper> : (
            <>
              <UsernameInput>
                <TextField
                  required
                  id="username"
                  label="Full name"
                  value={username}
                  margin="normal"
                  className={classes.textField}
                  variant="outlined"
                />
              </UsernameInput>
              <EmailInput>
                <TextField
                  required
                  id="email"
                  label="Email"
                  value={email}
                  onChange={this.handleChange}
                  margin="normal"
                  className={classes.textField}
                  variant="outlined"
                />
              </EmailInput>
              <MessageInput>
                <TextField
                  id="message"
                  label="Message..."
                  multiline
                  rowsMax="6"
                  rows="6"
                  value={message}
                  onChange={this.handleChange}
                  className={classes.messageField}
                  margin="normal"
                  variant="outlined"
                />
              </MessageInput>
              <SubmitButtonWrapper>
                <SubmitButton onClick={this.handleSubmit}>
                  <span>
                    Send
                  </span>
                </SubmitButton>
              </SubmitButtonWrapper>
            </>
          )
        }
      </Wrapper>
    );
  }
}

export default withStyles(styles)(ContactForm);