import React from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ApiServer } from '../../../../../../Defaults';

class AddDeposit extends React.Component {
  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      open: false,
      status: 'normal',
      token: cookies.get('token'),
      charge: {},
    };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.sendDeposit = this.sendDeposit.bind(this);
  }

  onOpenModal() {
    this.setState({ status: 'normal', open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
    if (this.state.status === 'success') {
      //window.location.reload();
    }
  }

  async sendDeposit(node) {
    node.target.disabled = true;
    node.target.style.backgroundColor = 'gray';
    node.target.classList.remove('green_button');

    this.setState({
      status: 'sending',
    });

    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    const data = { amount: parseFloat(this.amount.value) };
    let responseStatus = null;
    let responseData = null;
    try {
      const response = (await axios.post(`${ApiServer}/api/v1/user/funds`, data, config));
      responseStatus = response.status;
      responseData = response.data;
    } catch (e) {
      responseStatus = 400;
    }

    switch (responseStatus) {
      case 200:
        this.setState({
          status: 'success',
          charge: responseData,
        }, () => {
          // Propagate amount to parent
          this.props.onSuccess(responseData);
        });
        break;
      default:
        this.setState({
          status: 'error',
        });
        break;
    }
  }

  render() {
    const { open, status, charge } = this.state;
    switch (status) {
      case 'error':
        return (
          <div>
            <button
              type="button"
              className="border-0 shadow green_button"
              style={{
                backgroundColor: '#10b364',
                color: '#ffffff',
                borderRadius: '5px',
                padding: '10px 30px',
                cursor: 'pointer',
              }}
              onClick={this.onOpenModal}
            >
              <i style={{ fontSize: '14px', color: '#ffffff' }} className="fas fa-money-bill-alt" />
              {' '}
            ADD DEPOSIT
            </button>
            <Modal open={open} onClose={this.onCloseModal} center>
              <div style={{
                width: '500px',
                fontWeight: '200',
              }}
              >
                <h2>Add deposit</h2>
                <hr />
                <h3 style={{ color: '#B20000' }}>
                  <i style={{ color: '#B20000' }} className="fas fa-times" />
                  {' '}
                Transaction failed.
                </h3>
                <hr />
                <p style={{ marginTop: '20px' }}>
                Verify your default payment method and try again. Y
                ou can also contact the technical support representative
                ! Just click the WhatsApp plugin in the corner.
                </p>
              </div>
            </Modal>
          </div>
        );
      case 'success':
        return (
          <div>
            <button
              type="button"
              className="border-0 shadow green_button"
              style={{
                backgroundColor: '#10b364',
                color: '#ffffff',
                borderRadius: '5px',
                padding: '10px 30px',
                cursor: 'pointer',
              }}
              onClick={this.onOpenModal}
            >
              <i style={{ fontSize: '14px', color: '#ffffff' }} className="fas fa-money-bill-alt" />
              {' '}
              ADD DEPOSIT
            </button>
            <Modal open={open} onClose={this.onCloseModal} center>
              <div style={{
                width: '500px',
                fontWeight: '200',
              }}
              >
                <h2>Add deposit</h2>
                <hr />
                <h3 style={{ color: '#10b364' }}>
                  <i style={{ color: '#10b364' }} className="fas fa-check" />
                  {' '}
                  Transaction successful.
                </h3>
                <hr />
                <p style={{ marginTop: '20px' }}>
                  Visit the transaction tab for more details
                  <br />
                  <br />
                  <span style={{ fontWeight: 900 }}>Transaction number:</span>
                  {' '}
                  {charge.id}
                  <br />
                  <span style={{ fontWeight: 900 }}>User identifier:</span>
                  {' '}
                  {charge.customer}
                  <br />
                  <span style={{ fontWeight: 900 }}>Source id:</span>
                  {' '}
                  {charge.source.id}
                  <br />
                  <span style={{ fontWeight: 900 }}>Date:</span>
                  {' '}
                  {(new Date(charge.created * 1000)).toDateString()}
                  <br />
                </p>
                <hr />
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
                  className="border-0 shadow button_white"
                  onClick={() => { window.location.href = '/user/transactions'; }}
                >

                  <i style={{ fontSize: '12px', color: 'rgb(59, 68, 75)' }} className="fas fa-file-invoice-dollar" />
                  {' '}
                    Transactions
                </button>
              </div>
            </Modal>
          </div>
        );
      case 'sending':
        return (
          <div>
            <button
              type="button"
              className="border-0 shadow green_button"
              style={{
                backgroundColor: '#10b364',
                color: '#ffffff',
                borderRadius: '5px',
                padding: '10px 30px',
                cursor: 'pointer',
              }}
              onClick={this.onOpenModal}
            >
              <i style={{ fontSize: '14px', color: '#ffffff' }} className="fas fa-money-bill-alt" />
              {' '}
              ADD DEPOSIT
            </button>
            <Modal open={open} onClose={this.onCloseModal} center>
              <div style={{
                width: '500px',
                fontWeight: '200',
              }}
              >
                <h2>Add deposit</h2>
                <hr />
                <h3>
                  <i style={{ color: 'rgb(59, 68, 75)' }} className="fas fa-spinner loading" />
                  {' '}
                  Performing transactions...
                </h3>
              </div>
            </Modal>
          </div>
        );
      default:
        return (
          <div>
            <button
              type="button"
              className="border-0 shadow green_button"
              style={{
                backgroundColor: '#10b364',
                color: '#ffffff',
                borderRadius: '5px',
                padding: '10px 30px',
                cursor: 'pointer',
              }}
              onClick={this.onOpenModal}
            >
              <i style={{ fontSize: '14px', color: '#ffffff' }} className="fas fa-money-bill-alt" />
              {' '}
              ADD DEPOSIT
            </button>
            <Modal open={open} onClose={this.onCloseModal} center>
              <div style={{
                width: '500px',
                fontWeight: '200',
              }}
              >
                <h2>Add deposit</h2>
                <hr />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{
                      height: '41px',
                      width: '41px',
                      backgroundColor: '#dedede',
                      fontSize: '16px',
                      textAlign: 'center',
                      lineHeight: '41px',
                      fontWeight: 900,
                      borderRadius: '5px 0 0 5px',
                      border: 'gray solid 0.5px',
                    }}
                    >
                  $
                    </div>
                    <input
                      className="input-single-amount"
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="Deposit amount"
                      ref={(node) => { this.amount = node; }}
                    />
                  </div>
                  <button
                    type="button"
                    className="border-0 shadow green_button"
                    style={{
                      backgroundColor: '#10b364',
                      color: '#ffffff',
                      borderRadius: '5px',
                      padding: '10px 30px',
                      cursor: 'pointer',
                    }}
                    onClick={this.sendDeposit}
                  >
                    <i style={{ fontSize: '14px', color: '#ffffff' }} className="fas fa-money-bill-alt" />
                    {' '}
                ADD DEPOSIT
                  </button>
                </div>
                <hr />
                <p style={{ marginTop: '10px' }}>Allow the funds to show in your account after 5 minutes.</p>
              </div>
            </Modal>
          </div>
        );
    }
  }
}

AddDeposit.propTypes = {
  cookies: PropTypes.object,
};

AddDeposit.defaultProps = {
  cookies: {},
};

export default AddDeposit;
