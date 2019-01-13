import React from 'react';
import UnderLine from '../../../Underline/Underline';
import DepositProgress from '../../../DepositProgress/DepositProgress';
import ProfileForm from '../../../ProfileForm/ProfileForm';
import './style.css';

const headingStyle = {
  fontSize: '1em',
  fontWeight: 600,
  lineHeight: 1.31,
  color: '#000000',
};

const iconStyle = {
  fontSize: '1.125em',
  color: '#727272',
};
export default class SettingSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
    };
  }

  onEditableClick() {
    this.setState(prev => ({ editable: !prev.editable }));
  }

  render() {
    const { editable } = this.state;
    const {
      name,
      address,
      email,
      phone,
      onNameChange,
      onAddressChange,
      onEmailChange,
      onPhoneChange,
    } = this.props;
    return (
      <div style={headingStyle}>
        <UnderLine>
          <p className="mb-0">Deposit</p>
        </UnderLine>
        <div className="d-flex mb-3">
          <DepositProgress amount={7746} />
          <button
            className="border-0 shadow"
            style={{
              backgroundColor: '#10b364',
              color: '#ffffff',
              borderRadius: '5px',
              padding: '10px 30px',
              cursor: 'pointer',
            }}
          >
          ADD DEPOSIT
          </button>
        </div>
        <UnderLine className="justify-content-between">
          <p className="mb-0">Personal Info</p>
          <i
            className={`SettingEditIcon fas fa-${editable ? 'times' : 'pen'}`}
            style={iconStyle}
            onClick={this.onEditableClick}
          />
        </UnderLine>
        <ProfileForm
          editable={editable}
          name={name}
          address={address}
          email={email}
          phone={phone}
          onNameChange={onNameChange}
          onAddressChange={onAddressChange}
          onEmailChange={onEmailChange}
          onPhoneChange={onPhoneChange}
        />
      </div>
    );
  }
}
