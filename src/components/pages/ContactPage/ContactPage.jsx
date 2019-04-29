import React, { Component } from 'react';
import styled from 'styled-components';
import MessageIcon from '@material-ui/icons/Message';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import MediaQuery from 'react-responsive';
import InputMask from 'react-input-mask';
import { AsYouType } from 'libphonenumber-js';
import axios from 'axios';
import { ApiServer } from '../../../Defaults';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '45%',
  },
  messageField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '94%',
  },
  sendIcon: {
    icon: {
      color: 'blue',
    },
  },
});

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const Header = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 60% 40%;
  margin: 0 auto;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Description = styled.div`
  width: 80%;
  margin: 0 auto;
  & > p {
    text-align: center !important;
  }
`;

const Content = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (min-width: 768px) { 
    flex-direction: column;
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContactBox = styled.div`
  margin: 8px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 0px 3px 0px #ccc;
  border: none;
  width: 100%;
  min-height: 480px;
  display: grid;
  grid-template-rows: 30% 60% 10%;
`;

const InfoBox = styled.div`
  margin: 8px;
  padding: 16px;
  border: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 768px) {
    justify-content: flex-start;
    margin-top: 16px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EmailInfo = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  & > span {
    color: blue;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
`;

const MapWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 25% 75%;
  min-height: 220px;
  margin: 8px;
`;

const MapsBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const SendIconWrapper = styled.div`
  transform: rotate(-12deg);
`;

function printNumber(e) {
  e.target.value = new AsYouType('US').input(e.target.value);
}

class ContactPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sendingMessage: false,
      sent: false,
      sendToEmail: 'support@pierpontglobal.com',
      name: {
        error: false,
        value: ''
      },
      email: {
        error: false,
        value: ''
      },
      phone: {
        error: false,
        value: ''
      },
      company: {
        error: false,
        value: ''
      },
      message: {
        error: false,
        value: ''
      }
    }
  }

  sendMessage = (message) => {
    this.setState({
      sendingMessage: true,
    }, () => {
      const { name, email, phone, company, message } = this.state;

      //Make api call
      axios.post(`${ApiServer}/api/v1/user/send-contact-form`, {
        name: name.value,
        email: email.value,
        phone: phone.value,
        company: company.value,
        message: message.value
      }).then(data => {
        console.log(data);
        this.setState({
          sendingMessage: false,
          sent: true,
          name: { error: false, value: '' },
          email: { error: false, value: '' },
          phone: { error: false, value: '' },
          company: { error: false, value: '' },
          message: { error: false, value: '' },
        });
      }, err => {
        console.log(err);
        this.setState({
          sendingMessage: false,
          sent: false,
        });
      })
    });
  }

  validateMessage = () => {
    const { name, email, phone, company, message } = this.state;
    let validEmail = false;
    if (this.validateEmail(email.value)) {
      validEmail = true;
    } 

    if (validEmail && message.value.length >= 10 && name.value.length > 0) {
      console.log(name, email, phone, company, message);
      this.sendMessage({
        message: {
          name: name.value,
          email: email.value,
          phone: phone.value,
          company: company.value,
          message: message.value
        }
      });
    } else {
      let errors = [];
      if(!validEmail) {
       errors.push({
        error: true,
        value: email.value,
        name: 'email'
       });
      }
      if (message.value.length < 10) {
        errors.push({
          error: true,
          value: message.value,
          name: 'message'
        })
      }
      if(name.value.length <= 0) {
        errors.push({
          error: true,
          value: name.value,
          name: 'name'
        })
      }

      let newState = {};
      errors.forEach(e => {
        newState[e.name] = e
      });
      this.setState({
        ...newState
      });
    }
  }

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleInput = (event) => {
    if(!!event.target) {
      if ( event.target.id === 'phone') {
        printNumber(event);
      }
      this.setState({
        [event.target.id]: {
          error: false,
          value: event.target.value
        }
      });
    }
  }

  changeDestinationEmail = (email) => {
    this.setState({
      sendToEmail: email,
    });
  }

  render() {    
    const { name, email, phone, company, message, sendingMessage, sent, sendToEmail} = this.state;
    const { classes } = this.props;

    let saleSupport = 'steve@pierpontglobal.com';
    let customerSupport = 'juan@pierpontglobal.com';
    let technicalSupport = 'hector@pierpontglobal.com';
    let support = 'support@pierpontglobal.com';

    return (
      <PageWrapper>
        <Header>
          <Title>
            <h2>
              Contact Us
            </h2>
          </Title>
          <Description>
            <p>
              <span>
                Have any questions? We'd love to hear from you!
              </span>
              <br />
              <span>
                Here is how to get in touch with us.
              </span>
            </p>
          </Description>
        </Header>
        <Content>
          <Wrap>
          <ContactBox>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img src="/icon_sm.png" alt="Pierpont Global, Inc | Contact page" width="60px" />
              <h6>24-Hour support</h6>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontStyle: 'italic' }}>
                  {
                    (sendingMessage) ?
                    'Sending message...'
                    : (sent) ? 'Sent successfully!' : 'Send us a message!'
                  }
                </span>
                <MessageIcon />
              </div>
              <FormWrapper>
                <form className={classes.container}>
                  <TextField
                    error={name.error}
                    id="name"
                    label="Your name"
                    value={name.value}
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleInput}
                  />
                  <TextField
                    error={email.error}
                    id="email"
                    value={email.value}
                    autoComplete="email"
                    label="Your email"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleInput}
                  />
                  <TextField
                    error={phone.error}
                    id="phone"
                    value={phone.value}
                    label="Your phone"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleInput}
                    autoComplete="tel"
                    type="tel"
                  >
                  </TextField>
                  <TextField
                    error={company.error}
                    value={company.value}
                    id="company"
                    label="Your compnay"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleInput}
                  />
                  <div style={{ marginTop: '16px' }}>
                    <TextField
                      error={message.error}
                      id="message"
                      value={message.value}
                      label="Your message"
                      className={classes.messageField}
                      multiline
                      rowsMax="4"
                      onChange={this.handleInput}
                    />
                  </div>
                </form>
              </FormWrapper>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-item' }}>
              <div>
                Send to: <span style={{ color: 'darkgray' }}>{ sendToEmail }</span>
              </div>
              <SendIconWrapper>
                <IconButton onClick={this.validateMessage}>
                  <SendIcon color="action" />
                </IconButton>
              </SendIconWrapper>
            </div>
          </ContactBox>
          <InfoBox>
            <EmailInfo>
              <div>Sales Support</div>
              <span onClick={() => this.changeDestinationEmail(saleSupport)}>{saleSupport}</span>
            </EmailInfo>
            <EmailInfo>
              <div>Customer Service</div>
              <span onClick={() => this.changeDestinationEmail(customerSupport)}>{customerSupport}</span>
            </EmailInfo>
            <EmailInfo>
              <div>Technical Support</div>
              <span onClick={() => this.changeDestinationEmail(technicalSupport)}>{technicalSupport}</span>
            </EmailInfo>
            <EmailInfo>
              <div>General services</div>
              <span onClick={() => this.changeDestinationEmail(support)}>{support}</span>
            </EmailInfo>
          </InfoBox>
          <MediaQuery maxDeviceWidth={768}>
            <MapsBox>
              <MapWrapper>
                <div style={{ width: '100%', overflowX: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div><span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Miami, Florida</span></div>
                  <span style={{ fontSize: '0.8rem' }}>199 # Flagger St #215 Miami Fl, 33131</span>
                </div>
                <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.8792765692288!2d-80.19274648464578!3d25.774550783630893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69c2ad348bb%3A0x7b8117c2e431f3a7!2s199+E+Flagler+St%2C+Miami%2C+FL+33131%2C+USA!5e0!3m2!1sen!2sdo!4v1556557890802!5m2!1sen!2sdo" width="100%" frameborder="0" style={{ border: 'none' }} allowfullscreen></iframe>
                </div>
              </MapWrapper>
              <MapWrapper>
                <div style={{ width: '100%', overflowX: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div><span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Dominican Republic</span></div>
                  <span style={{ fontSize: '0.8rem' }}>Jardines del Fresno, Av. Republica De Colombia</span>
                </div>
                <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.4656954292323!2d-69.99003868475685!3d18.507845987416378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf8a4e5fe245bf%3A0x211fbc9e3a1f08c5!2sJardines+del+Fresno!5e0!3m2!1sen!2sdo!4v1556558034607!5m2!1sen!2sdo" width="100%" frameborder="0" style={{ border: 'none' }} allowfullscreen></iframe>
                </div>
              </MapWrapper>
            </MapsBox>
          </MediaQuery>
          </Wrap>
        </Content>
        <Footer>
          <MediaQuery minDeviceWidth={768}>
            <MapsBox>
              <MapWrapper>
                <div style={{ width: '100%', overflowX: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div><span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Miami, Florida</span></div>
                  <span style={{ fontSize: '0.8rem' }}>199 # Flagger St #215 Miami Fl, 33131</span>
                </div>
                <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.8792765692288!2d-80.19274648464578!3d25.774550783630893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69c2ad348bb%3A0x7b8117c2e431f3a7!2s199+E+Flagler+St%2C+Miami%2C+FL+33131%2C+USA!5e0!3m2!1sen!2sdo!4v1556557890802!5m2!1sen!2sdo" width="100%" frameborder="0" style={{ border: 'none' }} allowfullscreen></iframe>
                </div>
              </MapWrapper>
              <MapWrapper>
                <div style={{ width: '100%', overflowX: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div><span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Dominican Republic</span></div>
                  <span style={{ fontSize: '0.8rem' }}>Jardines del Fresno, Av. Republica De Colombia</span>
                </div>
                <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.4656954292323!2d-69.99003868475685!3d18.507845987416378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf8a4e5fe245bf%3A0x211fbc9e3a1f08c5!2sJardines+del+Fresno!5e0!3m2!1sen!2sdo!4v1556558034607!5m2!1sen!2sdo" width="100%" frameborder="0" style={{ border: 'none' }} allowfullscreen></iframe>
                </div>
              </MapWrapper>
            </MapsBox>
          </MediaQuery>
        </Footer>
      </PageWrapper>
    );
  }
}

export default withStyles(styles)(ContactPage);
