import React, { Component } from 'react';
import LocationPicker from 'react-location-picker';

/* Default position */
const defaultPosition = {
  lat: 27.9878,
  lng: 86.9250,
};


class LocationPickerExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      position: {
        lat: 0,
        lng: 0,
      },
    };

    // Bind
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange({ position, address }) {
    // Set new location
    this.setState({ position, address });
  }

  render() {
    return (
      <div>
        <div>
          <LocationPicker
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '250px' }} />}
            defaultPosition={defaultPosition}
            onChange={this.handleLocationChange}
          />
        </div>
      </div>
    );
  }
}

export default LocationPickerExample;
