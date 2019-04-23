import React from 'react';
import FormInput from './FormInput/FormInput';

function ProfileForm({
  editable, name,
  onNameChange, address,
  onAddressChange, email,
  onEmailChange, phone, onPhoneChange,
}) {
  return (
    <div className="flex-column">
      <FormInput
        label="Account name"
        value={name}
        onChange={onNameChange}
        editable={editable}
        id="name"
      />
      <FormInput
        label="Address"
        value={address}
        onChange={onAddressChange}
        editable={editable}
        id="address"
      />
      <FormInput
        label="Email"
        value={email}
        onChange={onEmailChange}
        editable={editable}
        id="email"
      />
      <FormInput
        label="Phone"
        value={phone}
        onChange={onPhoneChange}
        editable={editable}
        id="phone"
      />
    </div>
  );
}

export default ProfileForm;
