import React from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';
import Information from '../BidModal/Information/Information';
import Container from '../styles/Container/Container';
import Btn from '../Btn/Btn';
import { ApiServer } from '../../Defaults';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class DepositModal extends React.Component {
  constructor(props) {
    super(props);

    const {
      show,
      intendedBid,
      onSearch,
      onAddDeposit,
    } = this.props;

    this.state = {
      show,
      intendedBid,
      onSearch,
      onAddDeposit,
      deficit: 0,
      availableFunds: 0,
    };

    this.getFunds = this.getFunds.bind(this);
  }

  componentWillReceiveProps(newProperties) {
    if (newProperties.intendedBid !== this.state.intendedBid) {
      this.setState({ intendedBid: newProperties.intendedBid });
    }
  }

  componentDidMount() {
    this.getFunds();
  }

  async getFunds() {
    const { intendedBid } = this.state;
    const fundsResponse = (await axios.get(`${ApiServer}/api/v1/user/funds`)).data;

    console.log(fundsResponse);

    const availableFunds = parseFloat(fundsResponse.balance) - parseFloat(fundsResponse.holding);
    const deficit = ((intendedBid * 10 / 100) - availableFunds);

    this.setState({
      deficit,
      availableFunds,
    });
  }

  render() {
    const {
      show, intendedBid, onSearch, onAddDeposit, deficit, availableFunds,
    } = this.state;

    return (
      <Modal
        title="Out of deposit"
        show={show}
      >
        <div className="pt-2">
          <Information
            label="Deficient amount"
            text={`$ ${numberWithCommas(deficit.toFixed(2))}`}
            fontSize="16px"
            fontWeight={600}
            lineHeight={1.31}
            className="mb-0 pb-2 border-bottom"
          />
          <Information
            label="Necessary amount"
            text={`$ ${numberWithCommas((intendedBid * 10 / 100).toFixed(2))}`}
            fontSize="14px"
            fontWeight="normal"
            lineHeight={2}
            className="mb-0 pt-2"
          />
          <Information
            label="Available amount"
            text={`$ ${numberWithCommas(availableFunds.toFixed(2))}`}
            fontSize="14px"
            fontWeight="normal"
            lineHeight={2}
            className="mb-0"
          />
        </div>
        <div
          className="d-flex flex-row justify-content-center"
          style={{ height: '60px' }}
        >
          <Btn
            className="mr-3 w-100"
            maxWidth="152px"
            color="#3a7abf"
            hoverColor="#4c87cc"
            onClick={onSearch}
          >
                    KEEP&nbsp;SEARCHING
          </Btn>
          <Btn
            className="w-100"
            maxWidth="152px"
            color="#0bb761"
            hoverColor="#23d17a"
            onClick={onAddDeposit}
          >
                    ADD DEPOSIT
          </Btn>
        </div>
      </Modal>
    );
  }
}

export default DepositModal;
