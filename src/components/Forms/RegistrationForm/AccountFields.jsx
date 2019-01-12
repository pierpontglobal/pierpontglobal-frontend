import axios from 'axios';
import React from 'react';
import { AsYouType } from 'libphonenumber-js';
import posed from 'react-pose';
import Input from '../../styles/Input/Input';
import { ApiServer } from '../../../Defaults';

const Spinner = posed.i({
  rotate: {
    rotate: (300 * 2 * 360),
    transition: {
      duration: (1000 * 300),
      ease: 'linear',
    },
  },
  normal: {
    rotate: 0,
  },
});

const validator = require('email-validator');

class AccountFields extends React.Component {
  constructor(props) {
    super(props);

    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.changeStateLoader = this.changeStateLoader.bind(this);

    this.state = {
      rotate: 'normal',
    };
  }

  printNumber(e) {
    e.target.value = new AsYouType('US').input(e.target.value);
  }

  async saveAndContinue() {
    this.props.nextButton();
    const data = {
      first_name: this.firstName.value,
      last_name: this.lastName.value,
      email: this.email.value,
      phone_number: this.phone.value,
    };
    const response = await axios.post(`${ApiServer}/api/v1/user/subscription`, data);
    console.log(response.data);
    this.props.loadinStop();
    return false;
  }

  changeStateLoader(state) {
    this.rotatingState = state;
    this.forceUpdate();
  }

  changeVisualStatus(color) {
    this.email.style.borderColor = color;
    this.email.style.borderWidth = '2px';
    this.email.style.boxShadow = 'none';
    this.email.style.borderStyle = 'solid';
  }

  async checkEmail(goodFormat) {
    this.changeStateLoader('rotate');
    if (!goodFormat) {
      this.submitButton.disabled = true;
      this.changeStateLoader('normal');
      this.changeVisualStatus('#FF6347');
      return true;
    }
    const response = await axios.get(`${ApiServer}/api/v1/user/availability?email=${this.email.value}`);
    this.changeStateLoader('normal');
    this.submitButton.disabled = !response.data.available;
    if (!response.data.available) {
      this.changeVisualStatus('#FF6347');
    } else {
      this.changeVisualStatus('#00B200');
    }
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >

        <form
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={this.saveAndContinue}
        >

          <p style={{ color: this.props.textColor, fontSize: '28px' }} className="subtitle-medium">Sign Up for early access</p>
          <Input
            className="w-100 h-100 pl-2 border-0"
            type="text"
            backgroundColor="#EEEEEE"
            lineHeight={1.31}
            ref={(node) => { this.firstName = node; }}
            maxWidth="300px"
            maxHeight="40px"
            borderRadius="4px"
            placeholder="Your first name"
            onChange={e => this.setState({ text: e.target.value })}
            defaultValue={this.props.fieldValues.firstName}
            required
          />

          <Input
            style={{
              marginTop: '10px',
            }}
            className="w-100 h-100 pl-2 border-0"
            type="text"
            backgroundColor="#EEEEEE"
            lineHeight={1.31}
            ref={(node) => { this.lastName = node; }}
            maxWidth="300px"
            maxHeight="40px"
            borderRadius="4px"
            placeholder="Your last name"
            onChange={e => this.setState({ text: e.target.value })}
            defaultValue={this.props.fieldValues.lastName}
            required
          />

          <div
            style={{
              position: 'relative',
              width: '300px',
              height: '40px',
              marginTop: '10px',
            }}
          >
            <Input
              style={{
                borderWidth: '0px',
              }}
              className="w-100 h-100 pl-2"
              type="text"
              backgroundColor="#EEEEEE"
              ref={(node) => { this.email = node; }}
              lineHeight={1.31}
              maxWidth="300px"
              maxHeight="40px"
              borderRadius="4px"
              placeholder="Email"
              defaultValue={this.props.fieldValues.email}
              onChange={() => { this.checkEmail(validator.validate(this.email.value)); }}
              required
            />

            <Spinner
              pose={this.rotatingState}
              style={{
                position: 'absolute',
                right: -35,
                margin: 'auto',
                top: 0,
                bottom: 0,
                alignItems: 'center',
                display: this.rotatingState === 'rotate' ? 'flex' : 'none',
              }}
              className="fas fa-spinner"
            />
          </div>


          <Input
            style={{
              marginTop: '10px',
              marginBottom: '10px',
            }}
            className="w-100 h-100 pl-2 border-0"
            type="text"
            backgroundColor="#EEEEEE"
            ref={(node) => { this.phone = node; }}
            lineHeight={1.31}
            maxWidth="300px"
            maxHeight="40px"
            borderRadius="4px"
            placeholder="Phone number"
            onChange={this.printNumber}
            defaultValue={this.props.fieldValues.phonenumber}
            required
          />

          <button
            disabled
            className="border-0 button-check"
            type="submit"
            ref={(node) => { this.submitButton = node; }}
            style={{
              marginTop: '5px',
              maxWidth: '300px',
              width: '80%',
              height: '40px',
              marginBottom: '10px',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Sign up now >>
          </button>

          <p style={{ color: this.props.textColor, maxWidth: '300px' }} className="subtitle-follow-up">
            *We don’t share your personal info with anyone. Check out our
            Privacy Policy for more information
          </p>
        </form>
      </div>
    );
  }
}

export default AccountFields;
