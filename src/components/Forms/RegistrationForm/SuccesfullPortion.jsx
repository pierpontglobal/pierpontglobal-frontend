import React from 'react';
import { BarLoader } from 'react-spinners';
import { css } from 'emotion';
import Text from '../../styles/Text/Text';

const override = css`
    display: block;
    margin: 0 auto;
    height: 4px;
    width: 300px;
`;

class SuccessfullPortion extends React.Component {
  render() {
    const { loading } = this.props;
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
        height: '500px',
        flexDirection: 'column',
      }}
      >
        <Text style={{ fontSize: '32px', color: '#ffffff' }}>Your account is almost ready!</Text>
        <p style={{ color: '#ffffff' }}>Check your email and verify your identity.</p>
      </div>
    );
  }
}

export default SuccessfullPortion;
