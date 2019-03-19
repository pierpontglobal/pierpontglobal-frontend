import axios from 'axios';
import React from 'react';
import { BarLoader } from 'react-spinners';
import { css } from 'emotion';
import Text from '../../styles/Text/Text';
import { ApiServer } from '../../../Defaults';

const override = css`
    display: block;
    margin: 0 auto;
    height: 4px;
    width: 300px;
`;

class SuccessfullPortion extends React.Component {
  constructor(props) {
    super(props);
    const { loading, textColor, email } = this.props;
    this.state = {
      loading,
      textColor,
      email,
    };

    this.resend = this.resend.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.loading !== this.state.loading) {
      this.setState({ loading: props.loading });
    }
    if (props.textColor !== this.state.textColor) {
      this.setState({ textColor: props.textColor });
    }
  }

  async resend(email) {
    this.setState({
      loading: true,
    });
    await axios.post(`${ApiServer}/api/v1/user/resend-confirmation`, { email });
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, textColor, email } = this.state;
    if (loading === true) {
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
            height={4}
            width={400}
            color="#3e78c0"
            loading
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
        height: '100%',
        flexDirection: 'column',
      }}
      >
        <Text style={{
          fontSize: '32px',
          color: textColor,
          textAlign: 'center',
          padding: '10px',
        }}
        >
          Your account is almost ready!
        </Text>
        <p style={{
          color: textColor,
          textAlign: 'center',
          padding: '10px',
        }}
        >
          The message has been sent to
          {' '}
          {email}
          {' '}
          <br />
          Check your email and verify your identity.
        </p>
        <p style={{
          color: textColor,
          textAlign: 'center',
          padding: '10px',
        }}
        >
          Can`t find the email? Verify your spam folder or click
          {' '}
          <a
            style={{
              color: textColor,
              textDecoration: 'none',
              borderBottom: `2px dotted ${textColor}`,
              cursor: 'pointer',
            }}
            onClick={() => (this.resend(email))}
          >
          Resend
          </a>
          {' '}
          to try again.
        </p>
      </div>
    );
  }
}

export default SuccessfullPortion;
