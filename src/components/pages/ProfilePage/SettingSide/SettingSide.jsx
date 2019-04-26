import React from 'react';
import { StripeProvider } from 'react-stripe-elements';
import axios from 'axios';
import Chart from 'chart.js';
import Select from '@material-ui/core/Select';
import './style.css';
import { Elements } from 'react-stripe-elements';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import AddDeposit from './Components/Modals/AddDeposit';
import { ApiServer, StripeKey } from '../../../../Defaults';
import CreateCard from './Components/Modals/CreateCard';
import ProfileForm from '../../../ProfileForm/ProfileForm';
import DepositProgress from '../../../DepositProgress/DepositProgress';
import UnderLine from '../../../Underline/Underline';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import {Button} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const HeadingStyle = styled.div`
  font-size: 1em;
  font-weight: 600;
  line-height: 1.31;
  padding: 20px 40px;
  color: #000000;
  @media only screen and (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const ActionButtonText = styled.span`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Card = styled.div`
  padding: 16px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0px 0px 5px 0px #ccc;
  border: 1.2px solid #ccc;
`;

const CardHolderLarge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 8px;
  }
`;

const CardNumber = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

const CardExpDate = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

const CardBrand = styled.div`
  margin: 4px 4px;
  @media only screen and (max-width: 768px) {
    margin: 16px 8px;
  }
`;

const CardActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  @media only screen and (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
    justify-content: center;
    margin-top: 24px;
  }
`;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default class SettingSide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      unEditedInfo: {},
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
        <CardHolderLarge key={i}>
            <CardBrand>
              {brand}
            </CardBrand>
            <CardNumber>
              XXXX-XXXX-XXXX-
              {card.last4}
            </CardNumber>
            <CardExpDate>
              {card.exp_month}
              {' '}
              /
              {' '}
              {card.exp_year}
            </CardExpDate>

            <CardActionButtons>
              {/* <button className="simple-view">
                <i style={{ color: '#3a7abf', fontSize: '12px' }} className="fas fa-pen" />
                <span style={{ color: '#3a7abf', fontSize: '12px', margin: 0 }}>
                  {'  '}
                  Edit
                </span>
              </button> */}

              <Button
                type="button"
                onClick={(node) => {
                  node.target.style.cursor = 'wait';
                  this.removeCard(card.id);
                }}
              >
                <i style={{ color: '#3a7abf', fontSize: '12px', marginRight: '8px' }} className="fas fa-trash-alt" />
                <span style={{ color: '#3a7abf', fontSize: '12px', margin: 0 }}>
                  {'  '}
                  Delete
                </span>
              </Button>
            </CardActionButtons>
          <hr style={{ margin: 0 }} />
        </CardHolderLarge>
      );
      methods.push(view);
    }

    this.setState({
      paymentMethods: methods,
      cardsNumbers,
    });

    this.getDefaultPaymentMethod();
  }

  async handleCardChange(e) {
    this.setState({
      card: e.target.value,
      loading: true,
    });

    axios.patch(`${ApiServer}/api/v1/user/cards/default`, { card_id: e.target.value });
    window.location.reload();
  }

  async removeCard(cardToken) {
    await axios.delete(`${ApiServer}/api/v1/user/cards?card_id=${cardToken}`);
    window.location.reload();
  }

  onDepositSuccess = (data) => {
    this.getFunds();
  }

  onEditProfileInfo = () => {
    this.setState((prevState) => {
      return {
        editable: !prevState.editable,
        unEditedInfo: {
          name: prevState.name,
          email: prevState.email,
          address: prevState.address,
          pehon: prevState.phone
        }
      }
    });
  }

  onCancelEditProfile = () => {
    const {unEditedInfo} = this.state;
    this.setState({
      editable: false,
      unEditedInfo: {},
      name: unEditedInfo.name,
      address: unEditedInfo.address,
      email: unEditedInfo.email,
      phone: unEditedInfo.phone
    });
  }

  onSaveEditProfile = () => {
    // Validate info
    // Make API CALL to save new info
    // url:  PATCH: ${ApiServer}/api/v1/user
    const { name, address, email, phone } = this.state;
    let names = name.split(" ");
    const user = {
      first_name: names[0],
      last_name: names.slice(1, names.length).join(" "),
      email: email,
      phone_number: phone,
      address: address
    }
    axios.patch(`${ApiServer}/api/v1/user`, { user: user }).then(data => {
      this.setState({
        editable: false
      });
    }, err => {
      console.log(err);
    })
  }

  onEditProfileChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
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
      <HeadingStyle>
        <div className="card content-holder-box">
          <UnderLine>
            <h4 className="mb-0">
              <FormattedMessage id="label.deposit" />
            </h4>
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
            <AddDeposit onSuccess={this.onDepositSuccess} cookies={this.props.cookies} />
          </div>
        </div>

        <div className="card content-holder-box">
          <UnderLine className="justify-content-between">
            <h4 className="mb-0">
              <FormattedMessage id="label.personal-info" />
            </h4>
            <div>
              { 
                editable
                ? (
                  <>
                    <CancelIcon color="primary" style={{  }} onClick={this.onCancelEditProfile} />
                    <CheckIcon color="accent" onClick={this.onSaveEditProfile} />
                  </>
                ) :
                (
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
                    onClick={this.onEditProfileInfo}
                    className="border-0 button_white"
                  >
                    <i style={{ fontSize: '12px', color: '#000000' }} className="fas fa-pen" />
                    {' '}
                    <ActionButtonText>
                      <FormattedMessage id="label.modify-personal-info" />
                    </ActionButtonText>
                  </button>
                )
              }
            </div>
          </UnderLine>
          <ProfileForm
            editable={editable}
            name={name}
            address={address}
            email={email}
            phone={phone}
            onNameChange={this.onEditProfileChange}
            onAddressChange={this.onEditProfileChange}
            onEmailChange={this.onEditProfileChange}
            onPhoneChange={this.onEditProfileChange}
          />
        </div>


        <div className="card content-holder-box">
          <UnderLine className="justify-content-between">
            <h4 className="mb-0">
              <FormattedMessage id="label.payment-methods" />
            </h4>
            <StripeProvider apiKey={StripeKey}>
              <Elements>
                <CreateCard cookies={this.props.cookies} />
              </Elements>
            </StripeProvider>
          </UnderLine>
          <div className="content-main">
            <h5><FormattedMessage id="label.cards" /></h5>
            <FormControl style={{ minWidth: '200px', marginBottom: '20px' }}>
              <InputLabel htmlFor="age-simple">
                <FormattedMessage id="label.default-card" />
              </InputLabel>
              <Select
                value={card}
                onChange={this.handleCardChange}
              >
                <MenuItem value="">
                  <em><FormattedMessage id="label.none" /></em>
                </MenuItem>
                { this.state.cardsNumbers.map(cardNumber => (
                  <MenuItem value={cardNumber.key}>
                    {cardNumber.text}
                  </MenuItem>
                )) }
              </Select>
            </FormControl>
            <div>
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
      </HeadingStyle>
    );
  }
}
