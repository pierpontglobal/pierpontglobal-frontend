import React from 'react';
import axios from 'axios';
import { ActionCableConsumer } from 'react-actioncable-provider';
import Input from '../styles/Input/Input';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';
import { ApiServer } from '../../Defaults';
import PriceTag from '../CarCard/PriceTag/PriceTag';
import DepositModal from '../DepositModal/DepositModal';

let bidInput = null;

async function requestCarPrice(vin) {
  await axios.patch(`${ApiServer}/api/v1/car/price-request`, { vin });
}

class BidPanel extends React.Component {
  constructor(props) {
    super(props);

    const {
      wholePrice,
      saleDate,
      carId,
      vin,
    } = this.props;

    this.state = {
      wholePrice,
      saleDate,
      carId,
      vin,
      loading: false,
      bidPlacingFailed: false,
    };

    this.handleReceived = this.handleReceived.bind(this);
    this.sendBid = this.sendBid.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wholePrice !== this.state.wholePrice) {
      this.setState({ wholePrice: nextProps.wholePrice });
    }

    if (nextProps.vin !== this.state.vin) {
      this.setState({ vin: nextProps.vin });
    }

    if (nextProps.carId !== this.state.carId) {
      this.setState({ carId: nextProps.carId });
    }

    if (nextProps.saleDate !== this.state.saleDate) {
      this.setState({ saleDate: nextProps.saleDate });
    }
  }

  async sendBid(bid, carId) {
    this.setState({
      loading: true,
    });

    const { updateUserBidCallback } = this.props;
    let response = null;
    try {
      response = await axios.post(`${ApiServer}/api/v1/car/bid`, { amount: bid, car_id: carId });
      if (response.status === 200) {
        const { data } = response;
        const userBid = parseFloat(data.message.amount);
        updateUserBidCallback(parseFloat(userBid));
      }
    } catch (error) {
      this.setState({
        bidPlacingFailed: false,
      });

      this.setState({
        bidPlacingFailed: true,
        intendedBid: bid,
      });
    }
    this.setState({
      loading: false,
    });
  }

  handleReceived(message) {
    const mmrResponse = JSON.parse(message);
    this.setState({
      wholePrice: mmrResponse.mmr,
    });
  }

  render() {
    const {
      wholePrice,
      saleDate,
      carId,
      vin,
      loading,
      intendedBid,
      bidPlacingFailed,
    } = this.state;

    return (
      <Container
        className="d-flex flex-row pt-3 px-3 justify-content-between mb-3"
        maxHeight="105px"
        backgroundColor="#3e78c0"
      >
        { bidPlacingFailed ? (
          <DepositModal
            onAddDeposit={() => { window.location.href = '/user'; }}
            onSearch={() => {
              this.setState({
                bidPlacingFailed: false,
              });
            }}
            show
            intendedBid={intendedBid}
          />
        ) : null}
        <DepositModal />
        <ActionCableConsumer
          channel="PriceQueryChannel"
          onReceived={this.handleReceived}
        />
        <div className="d-flex flex-column">
          <Text
            className="mb-0"
            opacity={0.87}
            fontSize="0.75em"
            lineHeight={1.33}
            fontColor="#ffffff"
          >
          Whole price:
          </Text>
          <PriceTag
            color="white"
            price={wholePrice}
            fontSizeButton="20px"
            vin={vin}
            requestFuntion={requestCarPrice}
            className="text-right mb-0"
          />
        </div>
        <div className="d-flex flex-column">
          <Container
            className="d-flex mb-1 justify-content-end"
            height="60px"
          >
            <Input
              className="input mr-3 border-0"
              maxWidth="200px"
              backgroundColor="#3A70B4"
              borderRadius="4px"
              fontSize="20px"
              ref={(node) => { bidInput = node; }}
              style={{
                padding: '20px',
                outline: 'none',
                textAlign: 'right',

              }}
              type="number"
              fontColor="#ffffff"
              placeholder="Your max bid"
              placeholderColor="#ffffff"
              placeholderOpacity={0.54}
            />
            <button
              style={{
                position: 'relative',
                maxWidth: '100px',
                backgroundColor: '#0bb761',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              className="border-0 w-100"
              hoverColor="#23d17a"
              onClick={() => (this.sendBid(parseFloat(bidInput.value), carId))}
              type="button"
            >
            BID
              <i
                style={{
                  display: loading ? 'block' : 'none',
                  position: 'absolute',
                  margin: 'auto 0',
                  top: 0,
                  bottom: 0,
                  right: '10px',
                  height: '20px',
                  fontSize: '20px',
                }}
                className="fas fa-spinner loading"
              />
            </button>
          </Container>
          <Text
            fontSize="0.75em"
            lineHeight={1.33}
            fontColor="rgba(255, 255, 255, 0.87)"
          >
          You will have to retract your bid until:
            {' '}
            {saleDate}
          </Text>
        </div>
      </Container>
    );
  }
}

export default BidPanel;
