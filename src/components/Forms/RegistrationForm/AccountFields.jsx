
import React from 'react';
import { AsYouType } from 'libphonenumber-js';
import Button from '../../Btn/Btn';
import Input from '../../styles/Input/Input';
import Text from '../../styles/Text/Text';

class AccountFields extends React.Component {
  constructor(props) {
    super(props);

    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  printNumber(e) {
    e.target.value = new AsYouType('US').input(e.target.value);
  }

  saveAndContinue() {
    this.props.nextButton({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      phonenumber: this.phone.value,
    }, 2);
    return false;
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
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

          <Text style={{
            color: '#ffffff',
            fontSize: '22px',
          }}
          >
            Contact Information
          </Text>

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
            defaultValue={this.props.fieldValues.lastName}
            required
          />

          <Input
            style={{
              marginTop: '10px',
            }}
            className="w-100 h-100 pl-2 border-0"
            type="text"
            backgroundColor="#EEEEEE"
            ref={(node) => { this.email = node; }}
            lineHeight={1.31}
            maxWidth="300px"
            maxHeight="40px"
            borderRadius="4px"
            placeholder="Your email"
            defaultValue={this.props.fieldValues.email}
            required
          />


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
            placeholder="Your phone number"
            onChange={this.printNumber}
            defaultValue={this.props.fieldValues.phonenumber}
            required
          />

          <Button
            type="submit"
            style={{ marginTop: '12px' }}
            width="300px"
            color="#3e78c0"
          >
            Sign up now >>
          </Button>
        </form>
      </div>
    );
  }
}

export default AccountFields;
