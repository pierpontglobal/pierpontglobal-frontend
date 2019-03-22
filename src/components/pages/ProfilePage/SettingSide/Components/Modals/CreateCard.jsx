import React from 'react';
import Modal from 'react-responsive-modal';
import {Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

class CreateCard extends React.Component {

    state = {
        open: false,
    };
    
    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

  render() {
    const { open } = this.state;
    return (
      <div>
        <button
        style={{
              backgroundColor: '#ffffff',
              color: '#000000',
              borderRadius: '5px',
              padding: '10px 15px',
              cursor: 'pointer',
              fontSize: '12px',
            }} 
            onClick={this.onOpenModal}
            className="border-0 shadow button_white">

            <i style={{fontSize: '12px',color: '#000000',}} className="fas fa-plus"/>
            {' '}Add payment method
        </button>
        <Modal style={{}} open={open} onClose={this.onCloseModal} center>
        <div style={{
            width: '500px',
            fontWeight: '200',
        }}>
        <h2>Add your payment method details</h2>
        <hr/>
        <Elements>
            <InjectedCheckoutForm cookies={this.props.cookies} onClose={this.onCloseModal} />
        </Elements>
        <hr/>
        <h4>Bank transfer</h4>
        <p>At the moment Pierpont Global do not accept bank transfers through our electronic system, contact support.</p>
        <hr/>
        <h4>PayPal</h4>
        <p>At the moment Pierpont Global do no t accept payments from PayPal.</p>
        </div>
        </Modal>
      </div>
    );
  }
}

export default CreateCard;