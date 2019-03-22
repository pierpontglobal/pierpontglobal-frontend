import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import PasswordField from 'material-ui-password-field';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';

class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordIncorrect: false,
    };
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

  async verifyPassword(node, ik) {
    const value = node.target.value;
    const status = await this.props.handleChangePassword(value, ik);
    if (!status) {
      this.setState({
        passwordIncorrect: true,
      });
    } else {
      this.setState({
        passwordIncorrect: false,
      });
    }
  }

  render() {
    const { values } = this.props;
    const { passwordIncorrect } = this.state;
    return (
      <Form color="blue">
        <h1 className="ui centered">Account Details</h1>
        <Form.Field>
          <TextField
            style={{
              marginTop: '5px',
              width: '100%',
            }}
            autoComplete="off"
            onChange={node => this.props.handleChange('username', node)}
            required
            type="text"
            placeholder="Username *"
            value={values.username}
          />
        </Form.Field>
        <Form.Field>
          <PasswordField
            hintText="At least 8 characters"
            floatingLabelText="Enter your password"
            errorText="Your password is too short"
            style={{
              marginTop: '5px',
              width: '100%',
              marginBottom: '10px',
            }}
            autoComplete="new-password"
            onChange={(node) => { this.verifyPassword(node, 1); }}
            required
            type="password"
            placeholder="Password *"
            ref={(node) => { this.password1 = node; }}
          />
        </Form.Field>
        <Button variant="contained" color="secondary" onClick={this.back}>Back</Button>
        {' '}
        <Button variant="contained" color="primary" onClick={this.saveAndContinue}>Register</Button>
      </Form>
    );
  }
}

export default AccountDetails;
