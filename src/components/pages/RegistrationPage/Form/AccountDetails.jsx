import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import ReactPasswordStrength from 'react-password-strength';

class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.back = this.back.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
  }

  saveAndContinue(e) {
    e.preventDefault();
    this.props.sendRequest();
  }

  back(e) {
    e.preventDefault();
    this.props.prevStep();
  }

  async verifyPassword(value, ik) {
    const status = await this.props.handleChangePassword(value, ik);
    if (!status) {
      this.password2.style.borderColor = '#ff0000';
    } else {
      this.password2.style.borderColor = '#00B200';
    }
  }

  render() {
    const { values } = this.props;
    return (
      <Form color="blue">
        <h1 className="ui centered">Account Details</h1>
        <Form.Field>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            onChange={this.props.handleChange('username')}
            defaultValue={values.username}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <ReactPasswordStrength
            style={{ fontSize: '1em' }}
            minLength={5}
            minScore={2}
            ref={node => this.password1 = node}
            changeCallback={() => { this.verifyPassword(this.password1.state.password, 1); }}
            inputProps={{ name: 'password_input', autoComplete: 'off', className: 'form-control' }}
          />
        </Form.Field>
        <Form.Field>
          <label>Repeat password</label>
          <input
            type="password"
            ref={(node) => { this.password2 = node; }}
            onChange={() => { this.verifyPassword(this.password2.value, 2); }}
            defaultValue={values.password1}
          />
        </Form.Field>
        <Button onClick={this.back}>Back</Button>
        <Button onClick={this.saveAndContinue}>Register</Button>
      </Form>
    );
  }
}

export default AccountDetails;
