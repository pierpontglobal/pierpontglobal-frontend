import React from 'react';
import { StripeProvider } from 'react-stripe-elements';
import { Card, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import UnderLine from '../../../Underline/Underline';
import DepositProgress from '../../../DepositProgress/DepositProgress';
import ProfileForm from '../../../ProfileForm/ProfileForm';
import CreateCard from './Components/Modals/CreateCard';
import './style.css';
import { ApiServer } from '../../../../Defaults';

const headingStyle = {
  fontSize: '1em',
  fontWeight: 600,
  lineHeight: 1.31,
  padding: '20px 40px',
  color: '#000000',
};

const iconStyle = {
  fontSize: '1.125em',
  color: '#727272',
};
export default class SettingSide extends React.Component {
  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      editable: false,
      paymentMethods: [],
      cardsNumbers: [],
      token: cookies.get('token'),
      card: '',
      loading: false,
    };
    this.paymentMethods = this.paymentMethods.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.getDefaultPaymentMethod = this.getDefaultPaymentMethod.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  componentDidMount() {
    this.paymentMethods();
  }

  onEditableClick() {
    this.setState(prev => ({ editable: !prev.editable }));
  }

  async getDefaultPaymentMethod() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };
    const response = await axios.get(`${ApiServer}/api/v1/user/cards/default`, config);
    this.setState({
      card: response.data,
    });
  }

  async removeCard(cardToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    await axios.delete(`${ApiServer}/api/v1/user/cards?card_id=${cardToken}`, config);
    window.location.reload();
  }

  async paymentMethods() {
    const methods = [];
    const cardsNumbers = [];

    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    const response = (await axios.get(`${ApiServer}/api/v1/user/cards`, config)).data;
    for (let i = 0; i < response.length; i += 1) {
      const card = response[i];

      let brand = null;
      let brandSmall = null;
      switch (card.brand) {
        case 'Visa':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-visa" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-visa" />;
          break;
        case 'American Express':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-amex" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-amex" />;
          break;
        case 'Diners Club':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-diners-club" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-diners-club" />;
          break;
        case 'Discover':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-discover" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-discover" />;
          break;
        case 'JCB':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-jcb" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-jcb" />;
          break;
        case 'MasterCard':
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="fab fa-cc-mastercard" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="fab fa-cc-mastercard" />;
          break;
        default:
          brand = <i style={{ color: 'rgb(59, 68, 75)' }} className="far fa-question-circle" />;
          brandSmall = <i style={{ color: 'rgb(59, 68, 75)', fontSize: '15px' }} className="far fa-question-circle" />;
          break;
      }

      cardsNumbers.push({
        key: card.id,
        value: card.id,
        text:
  <span style={{ fontSize: '15px' }}>
    {brandSmall}
    {' '}
    {card.last4}
  </span>,
      });

      const view = (
        <div className="card-holder-large" key={i}>
          <div style={{ padding: '15px' }}>
            <span>
              {brand}
            </span>
            <span>
              XXXX-XXXX-XXXX-
              {card.last4}
            </span>
            <span>
              {card.exp_month}
              {' '}
              /
              {' '}
              {card.exp_year}
            </span>

            <span className="last">
              {/* <button className="simple-view">
                <i style={{ color: '#3a7abf', fontSize: '12px' }} className="fas fa-pen" />
                <span style={{ color: '#3a7abf', fontSize: '12px', margin: 0 }}>
                  {'  '}
                  Edit
                </span>
              </button> */}

              <button
                type="button"
                className="simple-view"
                onClick={(node) => {
                  node.target.style.cursor = 'wait';
                  this.removeCard(card.id);
                }}
              >
                <i style={{ color: '#3a7abf', fontSize: '12px' }} className="fas fa-trash-alt" />
                <span style={{ color: '#3a7abf', fontSize: '12px', margin: 0 }}>
                  {'  '}
                  Delete
                </span>
              </button>
            </span>
          </div>
          <hr style={{ margin: 0 }} />
        </div>
      );
      methods.push(view);
    }

    this.setState({
      paymentMethods: methods,
      cardsNumbers,
    });

    this.getDefaultPaymentMethod();
  }

  async handleCardChange(e, { value }) {
    this.setState({
      card: value,
      loading: true,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    axios.patch(`${ApiServer}/api/v1/user/cards/default`, { card_id: value }, config);
    window.location.reload();
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

    const { card, loading } = this.state;


    return (
      <div style={headingStyle}>
        <UnderLine>
          <h4 className="mb-0">Deposit</h4>
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
          <h4 className="mb-0">Personal Info</h4>
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

        <UnderLine className="justify-content-between">
          <h4 className="mb-0">Payment methods</h4>
          <StripeProvider apiKey="pk_test_QLMa4OOqdKIkfcZYvlMvJMTJ">
            <CreateCard cookies={this.props.cookies} />
          </StripeProvider>
        </UnderLine>
        <h5>Cards</h5>
        <div>
          Default card
          {' '}
          <Dropdown
            className="clean-button"
            placeholder="Select the default card"
            value={card}
            selection
            ref={node => (this.dropdown = node)}
            options={this.state.cardsNumbers}
            onChange={this.handleCardChange}
          />
          {' '}
          <i
            style={{
              color: '#000000', float: 'rigth', fontSize: '14px', display: loading ? 'inline-block' : 'none',
            }}
            className="fas fa-spinner loading"
          />
        </div>
        <Card style={{ width: '100%' }}>
          { this.state.paymentMethods }
        </Card>
      </div>
    );
  }
}
