// UserDetails.jsx
import React, { Component } from 'react';
import axios from 'axios';
import { ApiServer } from '../../../../Defaults';
import { Form, Button } from 'semantic-ui-react';

const validator = require('email-validator');

class UserDetails extends Component{

    constructor(props) {
        super(props);
        this.checkEmail = this.checkEmail.bind(this);
    }

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    changeVisualStatus(color) {
        this.email.style.borderColor = color;
        this.email.style.borderWidth = '2px';
        this.email.style.boxShadow = 'none';
        this.email.style.borderStyle = 'solid';
      }

    async checkEmail(goodFormat) {
        this.props.changeEmail(this.email.value);
        if (!goodFormat) {
          this.submitButton.disabled = true;
          this.changeVisualStatus('#FF6347');
          return true;
        }
        const response = await axios.get(`${ApiServer}/api/v1/user/availability?email=${this.email.value}`);
        this.submitButton.disabled = !response.data.available;
        if (!response.data.available) {
          this.changeVisualStatus('#FF6347');
        } else {
          this.changeVisualStatus('#00B200');
        }
      }

    render(){
        const { values } = this.props;
        return(
            <Form >
                <h1 className="ui centered">Enter User Details</h1>
                <Form.Field>
                    <label>First Name</label>
                    <input
                    placeholder='First Name'
                    onChange={(node) => this.props.handleChange('firstName', node)}
                    defaultValue={values.firstName}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input
                    placeholder='Last Name'
                    onChange={(node) => this.props.handleChange('lastName', node)}
                    defaultValue={values.lastName}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Email Address</label>
                    <input
                    type='email'
                    placeholder='Email Address'
                    ref={(node) => {this.email = node}}
                    onChange={() => {this.checkEmail(validator.validate(this.email.value))}}
                    defaultValue={values.email}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Phone Number</label>
                    <input
                    type='tel'
                    placeholder='Phone number'
                    onChange={(node) => this.props.handleChange('phonenumber', node)}
                    defaultValue={values.phonenumber}
                    />
                </Form.Field>
                <Button ref={(node) => this.submitButton = node} onClick={this.saveAndContinue}>Confirm and continue</Button>
            </Form>
        )
    }
}

export default UserDetails;