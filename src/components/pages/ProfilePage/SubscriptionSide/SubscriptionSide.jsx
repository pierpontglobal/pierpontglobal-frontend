import React from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react';
import UnderLine from '../../../Underline/Underline';
import './styles.css';

import CardComponent from './Components/CardComponent';
import SubscriptionCard from './Components/SubscriptionCard';
import PaymentHistory from './Components/PaymentHistory';

import { ApiServer } from '../../../../Defaults';

class SubscriptionSide extends React.Component {
  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      paymentMethods: [],
      token: cookies.get('token'),
      endDate: '',
      planName: '',
      renewable: false,
      renewLoading: false,
      subscription: 'available',
    };

    this.changeRenewBehavior = this.changeRenewBehavior.bind(this);
  }

  componentDidMount() {
    this.getSubscriptionDetails();
  }

  async getSubscriptionDetails() {
    try {
      const { token } = this.state;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = (await axios.get(`${ApiServer}/api/v1/user/subscriptions/view`, config)).data;
      const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      };

      const {
        subscription_info, primary_payment_method, payments_history, pending_invoices,
      } = response;

      this.setState({
        planName: subscription_info.plan_name,
        endDate: (new Date(subscription_info.current_period_end)).toLocaleDateString('en-US', options),
        renewable: subscription_info.billing_type === 'charge_automatically',
        paymentMethod: primary_payment_method,
        pendingInvoices: pending_invoices,
        paymentsHistory: payments_history,
        subscription: 'available',
      });
    } catch (e) {
      this.setState({
        subscription: 'none',
      });
    }
  }

  async changeRenewBehavior(status) {
    this.setState({
      renewLoading: true,
    });

    const { token } = this.state;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.patch(`${ApiServer}/api/v1/user/subscriptions/renew?status=${status}`, {}, config);
    this.setState({
      renewLoading: false,
    });
  }

  render() {
    let paymentMethodsView = null;
    const {
      paymentMethod,
      renewable,
      renewLoading,
      planName,
      endDate,
      paymentsHistory,
      pendingInvoices,
    } = this.state;


    const { token } = this.state;

    if (paymentMethod !== undefined && paymentMethod !== null) {
      const view = (
        <CardComponent
          cardInfo={paymentMethod}
          renewable={renewable}
          onChangeRenew={this.changeRenewBehavior}
          loading={renewLoading}
        />
      );
      paymentMethodsView = view;
    } else {
      paymentMethodsView = (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100px',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          justifyItems: 'center',
          textAlign: 'center',
          backgroundColor: '#dedede',
        }}
        >
          <button onClick={() => { document.location.href = '/user'; }} style={{ backgroundColor: 'white', color: 'black' }} className="save-information-btn">Go to settings</button>
        </div>
      );
    }

    if (this.state.subscription === 'available') {
      return (
        <div style={{ padding: '20px 40px' }}>
          <Card style={{ width: '100%' }}>
            <UnderLine>
              <h4 className="mb-0">Plan</h4>
            </UnderLine>
            <div style={{ margin: '0 20px 20px 20px' }}>
              <SubscriptionCard planName={planName} endDate={endDate} />
            </div>
          </Card>
          <Card style={{ width: '100%' }}>
            <UnderLine>
              <h4 className="mb-0">Billing and payment information</h4>
            </UnderLine>
            <div style={{ margin: '0 20px 20px 20px' }}>
            Selected payment method
              {' '}
              <button
                type="button"
                className="border-0"
                style={{
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
                onClick={() => { window.location.href = '/user'; }}
              >
                <i
                  style={{
                    color: 'rgb(59, 68, 75)',
                    fontSize: '12px',
                  }}
                  className="fas fa-pen"
                />
              </button>
              <div>
                { paymentMethodsView }
              </div>
            </div>
          </Card>
          <Card style={{ width: '100%' }}>
            <UnderLine>
              <h4 className="mb-0">
              Payment history
                {' & '}
              Pending invoices
              </h4>
            </UnderLine>
            { paymentsHistory || pendingInvoices ? <PaymentHistory token={token} paymentsHistory={paymentsHistory} pendingInvoices={pendingInvoices} /> : <div />}
          </Card>
        </div>
      );
    }
  }
}

export default SubscriptionSide;
