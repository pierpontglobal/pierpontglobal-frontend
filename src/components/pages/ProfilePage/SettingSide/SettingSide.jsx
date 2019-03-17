import React from 'react';
import { StripeProvider } from 'react-stripe-elements';
import { Card, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import Chart from 'chart.js';
import UnderLine from '../../../Underline/Underline';
import DepositProgress from '../../../DepositProgress/DepositProgress';
import ProfileForm from '../../../ProfileForm/ProfileForm';
import CreateCard from './Components/Modals/CreateCard';
import './style.css';
import { ApiServer, StripeKey } from '../../../../Defaults';
import AddDeposit from './Components/Modals/AddDeposit';

const headingStyle = {
  fontSize: '1em',
  fontWeight: 600,
  lineHeight: 1.31,
  padding: '20px 40px',
  color: '#000000',
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default class SettingSide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      paymentMethods: [],
      cardsNumbers: [],
      card: '',
      loading: false,
      name: '',
      funds: 0,
    };
    this.paymentMethods = this.paymentMethods.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.getDefaultPaymentMethod = this.getDefaultPaymentMethod.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getFunds = this.getFunds.bind(this);
  }

  componentDidMount() {
    this.paymentMethods();
    this.getUser();
    this.getFunds();
  }

  onEditableClick() {
    this.setState(prev => ({ editable: !prev.editable }));
  }

  async getDefaultPaymentMethod() {
    const response = await axios.get(`${ApiServer}/api/v1/user/cards/default`);
    this.setState({
      card: response.data,
    });
  }

  async getFunds() {
    const responseFunds = (await axios.get(`${ApiServer}/api/v1/user/funds`)).data;
    this.setState({
      funds: responseFunds,
    }, this.generateGraph);
  }

  async getUser() {
    const responseUser = (await axios.get(`${ApiServer}/api/v1/user`)).data;
    this.setState({
      name: `${responseUser.first_name} ${responseUser.last_name}`,
      address: `${responseUser.address.primary_address} ${responseUser.address.secondary_address}, ${responseUser.address.zip_code}, ${responseUser.address.city} ${responseUser.address.country}`,
      email: `${responseUser.email}`,
      phone: `${responseUser.phone_number}`,
    });
  }

  generateGraph() {
    const options = {
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            const amount = data.datasets[0].data[tooltipItem.index].toFixed(2);
            const amountWithCommas = numberWithCommas(amount);
            const moneyFormattedAmount = `$ ${amountWithCommas} USD`;
            return moneyFormattedAmount;
          },
        },
      },
      scales: {

      },
    };

    const { funds } = this.state;
    const amount = funds;

    const progressPercentage = parseFloat(amount.balance - amount.holding);
    const holdingPercentage = parseFloat(amount.holding);
    const totalPercentage = parseFloat(10000 - progressPercentage - holdingPercentage);

    const data = {
      datasets: [{
        data: [progressPercentage, holdingPercentage, totalPercentage],
        backgroundColor: ['#1D385A', 'rgb(35, 88, 154)', '#3e78c0'],
      }],

      labels: [
        'Remaining',
        'Holdings',
        'Total',
      ],
    };

    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
      type: 'doughnut',
      data,
      options,
    });
  }

  async paymentMethods() {
    const methods = [];
    const cardsNumbers = [];

    const response = (await axios.get(`${ApiServer}/api/v1/user/cards`)).data;
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

    axios.patch(`${ApiServer}/api/v1/user/cards/default`, { card_id: value });
    window.location.reload();
  }

  async removeCard(cardToken) {
    await axios.delete(`${ApiServer}/api/v1/user/cards?card_id=${cardToken}`);
    window.location.reload();
  }

  render() {
    const {
      editable,
      name,
      address,
      email,
      phone,
      onNameChange,
      onAddressChange,
      onEmailChange,
      onPhoneChange,
      card,
      loading,
      funds,
    } = this.state;

    return (
      <div style={headingStyle}>
        <div className="card shadow content-holder-box">
          <UnderLine>
            <h4 className="mb-0">Deposit</h4>
          </UnderLine>
          <div className="d-flex content-main flex-modifier-user-view">
            <canvas
              className="phone-only"
              id="myChart"
              width="100"
              height="100"
              style={{
                marginBottom: '20px',
              }}
            />
            <DepositProgress className="tablet-up" amount={funds} />
            <AddDeposit cookies={this.props.cookies} />
          </div>
        </div>

        <div className="card shadow content-holder-box">
          <UnderLine className="justify-content-between">
            <h4 className="mb-0">Personal Info</h4>
            <button
              type="button"
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                borderRadius: '5px',
                padding: '10px 15px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
              onClick={this.onOpenModal}
              className="border-0 shadow button_white"
            >
              <i style={{ fontSize: '12px', color: '#000000' }} className="fas fa-pen" />
              {' '}
            Modify profile information
            </button>
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


        <div className="card shadow content-holder-box">
          <UnderLine className="justify-content-between">
            <h4 className="mb-0">Payment methods</h4>
            <StripeProvider apiKey={StripeKey}>
              <CreateCard cookies={this.props.cookies} />
            </StripeProvider>
          </UnderLine>
          <div className="content-main">
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
        </div>
      </div>
    );
  }
}
