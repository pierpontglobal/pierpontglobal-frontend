import React from 'react';
import './styles.css';
import { Form } from 'semantic-ui-react';
import axios from 'axios';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { ApiServer, StripeKey } from '../../../../Defaults';
import InjectedCheckoutForm from '../SettingSide/Components/Modals/CheckoutForm';
import SubscriptionCard from '../SubscriptionSide/Components/SubscriptionCard';

class DealerCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      amountToPay: '$ 495.00 USD',
      couponLoading: false,
      hasDealer: false,
    };
    this.register = this.register.bind(this);
    this.verifyCoupon = this.verifyCoupon.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { hasDealer } = this.state;
    if (hasDealer !== newProps.hasDealer) {
      this.setState({
        hasDealer: newProps.hasDealer,
      });
    }
  }

  async register() {
    this.setState({
      loading: true,
    });
    const data = {
      name: this.name.value,
      phone_number: this.phone_number.value,
    };
    await axios.post(`${ApiServer}/api/v1/user/dealers`, data);
  }

  async verifyCoupon() {
    this.setState({
      couponLoading: false,
    });
    this.setState({
      couponLoading: true,
    });
    try {
      const response = (await axios.get(`${ApiServer}/api/v1/user/cards/coupon?coupon=${this.coupon.value}`));
      const coupon = response.data;
      const afterCouponTotal = `$ ${(495 - (coupon.amount_off / 100)).toFixed(2)} USD`;
      this.coupon.style.border = 'solid 1px green';
      this.priceBreackDownHolder.innerHTML = ` <span style="text-decoration: none; color: black;">now</span> <span style="text-decoration: underline; color: #2db742">${afterCouponTotal}</span>`;
      this.setState({ amountToPay: afterCouponTotal });
    } catch (e) {
      this.coupon.style.border = 'solid 1px red';
      this.priceBreackDownHolder.innerHTML = '<span style="color: #2db742">$ 495.00 USD</span>';
      this.setState({ amountToPay: '$ 495.00 USD' });
    }
    this.setState({
      couponLoading: false,
    });
  }

  render() {
    const subscriptionStartDate = new Date();
    const subscriptionEndYear = subscriptionStartDate.getFullYear() + 1;
    const subscriptionEndDate = new Date(
      subscriptionEndYear,
      subscriptionStartDate.getMonth(),
      subscriptionStartDate.getDate(),
    );

    const { couponLoading, amountToPay, hasDealer } = this.state;

    return (
      <div style={{
        overflow: 'auto',
        display: this.props.show ? 'flex' : 'none',
        position: 'fixed',
        zIndex: 1010,
        width: '100%',
        height: '100%',
        margin: 'auto',
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
          <StripeProvider apiKey={StripeKey}>
            <Elements>
              <InjectedCheckoutForm
                innerFields={(
                  <div>
                    <h4>Register your dealer information</h4>
                    <div style={{ display: hasDealer ? 'none' : 'flex' }} className="section-2">
                      <Form.Field className="popup-form">
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder="Dealer name"
                          ref={(node) => { this.name = node; }}
                          required={!hasDealer}
                        />
                      </Form.Field>
                      <Form.Field className="popup-form">
                        <label>Phone number</label>
                        <input
                          type="tel"
                          placeholder="Phone number"
                          ref={(node) => { this.phone_number = node; }}
                          required={!hasDealer}
                        />
                      </Form.Field>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <h4>Subscription details</h4>
                      <SubscriptionCard planName="PierpontGlobal USA Access" endDate={subscriptionEndDate.toDateString()} />
                      <p style={{ textAlign: 'center' }}>
                        This subscription allows you to review and bid on inventory from licensed US based auctions. Annual subscription cost is
                        {' '}
                        <span
                          ref={(node) => { this.priceBreackDownHolder = node; }}
                          style={{ fontWeight: 900, color: '#2db742' }}
                        >
                          <span
                            id="total_to_pay"
                            ref={(node) => { this.totalAmount = node; }}
                          >
                          $ 495.00 USD
                          </span>
                        </span>
                        .
                      </p>
                      <Form.Field style={{ position: 'relative' }}>
                        <label>Coupon</label>
                        <input
                          type="tel"
                          placeholder="Add a coupon if any"
                          ref={(node) => { this.coupon = node; }}
                          onChange={this.verifyCoupon}
                        />
                        <i
                          style={{
                            color: 'rgb(59, 68, 75)',
                            position: 'absolute',
                            right: '10px',
                            bottom: '4.5px',
                            display: couponLoading ? 'block' : 'none',
                          }}
                          className="fas fa-spinner loading"
                        />
                      </Form.Field>
                    </div>
                  </div>
                  )}
                afterSubmit={() => { if (!hasDealer) { this.register(); } }}
                couponField={this.coupon}
                saveButtonText={`Pay ${amountToPay} and reload`}
              />
            </Elements>
          </StripeProvider>
        </div>

      </div>
    );
  }
}

export default DealerCreator;
