import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { CountryDropdown } from 'react-country-region-selector';

class AddressDetails extends Component {
  constructor(props) {
    super(props);

    const {
      values,
    } = this.props;

    this.state = {
      values,
    };

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
    const {
      values,
    } = this.state;

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
            onChange={node => this.props.handleChange('city', node)}
            defaultValue={values.city}
          />
        </Form.Field>
        <Form.Field>
          <label>Zip Code</label>
          <input
            placeholder="Zip code"
            onChange={node => this.props.handleChange('zipcode', node)}
            defaultValue={values.zipcode}
          />
        </Form.Field>
        <Form.Field>
          <label>Primary Address</label>
          <input
            placeholder="Primary address"
            onChange={node => this.props.handleChange('address1', node)}
            defaultValue={values.address1}
          />
        </Form.Field>
        <Form.Field>
          <label>Secondary Address (Optional)</label>
          <input
            placeholder="Secondary address"
            onChange={node => this.props.handleChange('address2', node)}
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
