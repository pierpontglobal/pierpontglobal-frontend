import React from 'react';
import './styles.css';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { ApiServer } from '../../../../Defaults';

class DealerCreator extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      loading: false,
      token: cookies.get('token'),
    };
    this.register = this.register.bind(this);
  }

  async register() {
    this.setState({
      loading: true,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };
    const data = {
      name: this.name.value,
      phone_number: this.phone_number.value,
    };
    await axios.post(`${ApiServer}/api/v1/user/dealers`, data, config);
    window.location.reload(true);
  }

  render() {
    return (
      <div style={{
        display: this.props.show ? 'flex' : 'none',
        position: 'fixed',
        zIndex: 1010,
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        rigth: 0,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        background: 'rgba(0,0,0,0.4)',
      }}
      >

        <div className="shadow form-container">
          <h3>Register your dealer information</h3>
          <Form color="blue" onSubmit={this.register}>
            <div className="section-2">
              <Form.Field className="popup-form">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Dealer name"
                  ref={(node) => { this.name = node; }}
                />
              </Form.Field>
              <Form.Field className="popup-form">
                <label>Phone number</label>
                <input
                  type="tel"
                  placeholder="Phone number"
                  ref={(node) => { this.phone_number = node; }}
                />
              </Form.Field>
            </div>

            <Button onClick={this.saveAndContinue}>Save information and reload</Button>
            <i
              style={{
                color: '#3B444B',
                float: 'right',
                fontSize: '36px',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                justifyItems: 'center',
                display: this.state.loading ? 'flex' : 'none',
              }}
              className="loading fas fa-spinner"
            />
          </Form>
        </div>

      </div>
    );
  }
}

export default DealerCreator;
