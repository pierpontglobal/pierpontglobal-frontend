import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { CountryDropdown } from 'react-country-region-selector';

class AddressDetails extends Component {
  constructor(props) {
    super(props);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.back = this.back.bind(this);
  }

  saveAndContinue(e) {
    e.preventDefault();
    this.props.nextStep();
  }

  back(e) {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values } = this.props;
    return (
      <Form color="blue">
        <h1 className="ui centered">Location Details</h1>
        <Form.Field>
          <label>Country</label>
          <CountryDropdown
            ref={(node) => { this.country = node; }}
            value={values.country}
            onChange={val => this.props.setCountry(val)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input
            placeholder="City"
            onChange={this.props.handleChange('city')}
            defaultValue={values.city}
          />
        </Form.Field>
        <Form.Field>
          <label>Zip Code</label>
          <input
            placeholder="Zip code"
            onChange={this.props.handleChange('zipcode')}
            defaultValue={values.zipcode}
          />
        </Form.Field>
        <Form.Field>
          <label>Address 1</label>
          <input
            placeholder="Primary address"
            onChange={this.props.handleChange('address1')}
            defaultValue={values.address1}
          />
        </Form.Field>
        <Form.Field>
          <label>Address 2</label>
          <input
            placeholder="Secondary address"
            onChange={this.props.handleChange('address2')}
            defaultValue={values.address2}
          />
        </Form.Field>
        <Button onClick={this.back}>Back</Button>
        <Button onClick={this.saveAndContinue}>Save and continue </Button>
      </Form>
    );
  }
}

export default AddressDetails;
