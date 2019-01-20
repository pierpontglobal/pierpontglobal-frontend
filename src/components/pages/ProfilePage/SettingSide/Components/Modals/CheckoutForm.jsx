import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { ApiServer } from '../../../../../../Defaults';
import './styles.css';
import CardSection from './CardSection';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      display: 'none',
      token: cookies.get('token'),
    };
    this.registerCard = this.registerCard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async registerCard(token) {
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };
    await axios.post(`${ApiServer}/api/v1/user/cards`, { card_token: token }, config);
    window.location.reload();
  }

  async handleSubmit(ev) {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.

    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    const response = (await axios.get(`${ApiServer}/api/v1/user`, config)).data;
    const name = `${response.first_name} ${response.last_name}`;

    this.props.stripe.createToken({ name }).then(({ token }) => {
      console.log('Received Stripe token:', token);

      this.setState({
        display: 'none',
      });
      try {
        this.registerCard(token.id);
        this.props.onClose();
      } catch (e) {}
    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', owner: {
    //   name: 'Jenny Rosen'
    // }});
  }

  render() {
    return (
      <form
        style={{
          width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column',
        }}
        onSubmit={this.handleSubmit}
      >
        <CardSection />
        <button
          type="submit"
          className="border-0 shadow"
          style={{
            marginTop: '20px',
            backgroundColor: '#10b364',
            color: '#ffffff',
            borderRadius: '5px',
            padding: '10px 30px',
            cursor: 'pointer',
          }}
          onClick={() => {
            this.setState({
              display: 'inline-block',
            });
          }}
        >
          SAVE CARD
          {' '}
          <i style={{ float: 'rigth', fontSize: '14px', display: this.state.display }} className="fas fa-spinner loading" />
        </button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
