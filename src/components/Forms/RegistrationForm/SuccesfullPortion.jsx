import React from 'react';
import { BarLoader } from 'react-spinners';
import { css } from 'react-emotion';
import axios from 'axios';
import Button from '../../Btn/Btn';
import Text from '../../styles/Text/Text';
import { ApiServer } from '../../../Defaults';

const lookup = require('country-data').lookup;

const override = css`
    display: block;
    margin: 0 auto;
    height: 4px;
    width: 300px;
`;

class SuccessfullPortion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: this.props.loading,
    };

    this.register = this.register.bind(this);
  }

  componentDidMount() {
    //    this.register();
  }

  async register() {
    const fieldValues = this.props.fieldValues;
    const data = {
      email: fieldValues.email,
      username: fieldValues.username,
      password: fieldValues.password,
      phone_number: fieldValues.phonenumber,
      first_name: fieldValues.firstName,
      last_name: fieldValues.lastName,
      address: {
        country: lookup.countries({ name: fieldValues.country })[0].alpha2,
        city: fieldValues.city,
        zip_code: fieldValues.zip,
        primary_address: fieldValues.address1,
        secondary_address: fieldValues.address2,
      },
    };
    const response = await axios.post(`${ApiServer}/api/v1/users`, data);
    try {
      if (response.status === 200) {
        this.setState({ loading: false });
      }
      console.log(response);
    } catch (e) {
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          height: '500px',
        }}
        >
          <BarLoader
            className={override}
            sizeUnit="px"
            height="4"
            width="400"
            color="#3e78c0"
            loading={this.state.loading}
          />
        </div>
      );
    }

    return (
      <div style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
        flexDirection: 'column',
      }}
      >
        <Text style={{ fontSize: '32px', color: '#ffffff' }}>Your account is ready!</Text>
        <Button color="#3e78c0" width="300px" onClick={() => { this.props.signInElement(); }}>SIGN IN</Button>
      </div>
    );
  }
}

export default SuccessfullPortion;
