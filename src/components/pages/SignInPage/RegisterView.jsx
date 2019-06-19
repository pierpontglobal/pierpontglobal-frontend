import React, { useState } from "react";
import MediaQuery from "react-responsive";
import {
  RegistrationWrapper,
  LargeSteps,
  ButtonHolders,
  RegistartionWrapper,
  VerifyWrapper,
  Logo,
  Title,
  Subtitle,
  StatusMessage,
  RegistrationForm,
  StepperWrapper,
  MobileStepperCustom
} from "./SignInPage.styles";
import { LightButton } from "../sign-in-page/styles/sign_in_styles";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  ActionCableConsumer,
  ActionCableProvider
} from "react-actioncable-provider";
import ActionCable from "actioncable";
import {
  Elements,
  StripeProvider,
  CardElement,
  injectStripe
} from "react-stripe-elements";
import {
  AccentButton,
  ApiServer,
  CountriesList,
  WSConnection,
  StripeKey
} from "../../../Defaults";
import { TextField, InputAdornment, MenuItem } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";


import { Icon } from "antd";
import "antd/dist/antd.css";
import "antd/lib/steps/style";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const UserSection = props => {
  const {
    current,
    setCurrent,
    completeName,
    setCompleteName,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail
  } = props;

  return (
    <>
      <RegistrationForm>
        <Logo src="/images/signinpage/ppg_logo.svg" />
        <Title>Welcome to PierpontGlobal</Title>
        <Subtitle>Customer Registration</Subtitle>
        <TextField
          name="name"
          autoComplete="name"
          id="standard-name"
          label="Complete name"
          margin="normal"
          defaultValue={completeName}
          onChange={node => setCompleteName(node.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="user" />
              </InputAdornment>
            )
          }}
        />
        <TextField
          name="mobile"
          autoComplete="tel"
          id="standard-phone"
          label="Phone number"
          margin="normal"
          type="tel"
          defaultValue={phoneNumber}
          onChange={node => setPhoneNumber(node.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="phone" />
              </InputAdornment>
            )
          }}
        />
        <TextField
          name="email"
          autoComplete="email"
          id="standard-email"
          label="E-mail"
          margin="normal"
          type="email"
          defaultValue={email}
          onChange={node => setEmail(node.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="mail" />
              </InputAdornment>
            )
          }}
        />
      </RegistrationForm>
      <MediaQuery minDeviceWidth={769}>
        <ButtonHolders>
          <LightButton onClick={() => { props.setRegisterView(false) }}> <Icon type="left" /> Sign in</LightButton>
          <LightButton
            onClick={() => {
              if (current + 1 < 4) {
                setCurrent(current + 1);
              }
            }}
          >
            Next <Icon type="right" />
          </LightButton>
        </ButtonHolders>
      </MediaQuery>
    </>
  );
};

async function sendSubscription(completeName, email, phoneNumber) {
  await axios.post(`${ApiServer}/api/v2/users/subscription`, {
    first_name: completeName,
    last_name: "",
    email: email,
    phone_number: phoneNumber
  });
}

const VerifySection = props => {
  const {
    current,
    setCurrent,
    verified,
    setVerified,
    completeName,
    email,
    phoneNumber
  } = props;
  let cable = null;
  if (!verified) {
    sendSubscription(completeName, email, phoneNumber);
    cable = ActionCable.createConsumer(`${WSConnection}?hash=${email}`);
  }
  return (
    <>
      <RegistrationForm>
        <ActionCableProvider cable={cable}>
          <ActionCableConsumer
            channel="VerificationChannel"
            onReceived={message => {
              console.log(message);
              setVerified(message["verified"]);
            }}
          />
        </ActionCableProvider>
        <VerifyWrapper>
          <Title>Verify that it is you</Title>
          <Icon
            style={{ fontSize: "100px", margin: "20px" }}
            type={verified ? "check" : "loading"}
          />
          <Subtitle>
            Check your email and click the verification link before the folowing
            10 minutes, then comeback here to continue your registration process
          </Subtitle>
        </VerifyWrapper>
      </RegistrationForm>
      <MediaQuery minDeviceWidth={769}>
        <ButtonHolders>
          <LightButton
            onClick={() => {
              if (current - 1 > -1) {
                setCurrent(current - 1);
              }
            }}
          >
            <Icon type="left" /> Back
          </LightButton>
          <LightButton
            disabled={!verified}
            onClick={() => {
              if (current + 1 < 4) {
                setCurrent(current + 1);
              }
            }}
          >
            Next <Icon type="right" />
          </LightButton>
        </ButtonHolders>
      </MediaQuery>
    </>
  );
};

const DealerSection = props => {
  const {
    current,
    setCurrent,
    country,
    setCountry,
    dealerName,
    setDealerName,
    city,
    setCity,
    address,
    setAddress
  } = props;
  return (
    <>
      <RegistrationForm>
        <Title>Dealer</Title>
        <Subtitle>Dealer registration</Subtitle>
        <TextField
          id="standard-name"
          label="Dealer name"
          margin="normal"
          required
          defaultValue={dealerName}
          onChange={node => setDealerName(node.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="shop" />
              </InputAdornment>
            )
          }}
        />
        <TextField
          margin="normal"
          id="standard-select-country"
          required
          select
          label="Country"
          value={country}
          onChange={node => setCountry(node.target.value)}
          SelectProps={{
            name: "country",
            autoComplete: "country",
            MenuProps: {}
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="global" />
              </InputAdornment>
            )
          }}
          helperText="Please select your country" m
        >
          {CountriesList.map(option => (
            <MenuItem key={option.key} value={option.name.en}>
              {option.name.en}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="environment" />
              </InputAdornment>
            )
          }}
          required
          defaultValue={city}
          onChange={node => setCity(node.target.value)}
          label="City"
          name="city"
          autoComplete="address-level2"
        />
        <TextField
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="environment" />
              </InputAdornment>
            )
          }}
          required
          defaultValue={address}
          onChange={node => setAddress(node.target.value)}
          name="address"
          autoComplete="address-line1"
          label="Address"
        />
      </RegistrationForm>
      <MediaQuery minDeviceWidth={769}>
        <ButtonHolders>
          <LightButton
            onClick={() => {
              if (current - 1 > -1) {
                setCurrent(current - 1);
              }
            }}
          >
            <Icon type="left" /> Back
          </LightButton>
          <LightButton
            onClick={() => {
              if (current + 1 < 4) {
                setCurrent(current + 1);
              }
            }}
          >
            Next <Icon type="right" />
          </LightButton>
        </ButtonHolders>
      </MediaQuery>
    </>
  );
};

const SubscriptionSection = injectStripe(props => {
  const [showPassword, setShowPassword] = useState(false);
  const [fieldsCorrect, setFieldsCorrect] = useState(true);
  const [couponVerified, setCouponVerified] = useState(undefined);
  const [basePrice, setBasePrice] = useState(495);
  const [cookies, setCookies] = useCookies();

  const {
    completeName,
    current,
    setCurrent,
    password,
    setPassword,
    coupon,
    setCoupon,
  } = props;

  return (
    <>
      <RegistrationForm>
        <TextField
          id="standard-password"
          label="Password"
          autoComplete="new-password"
          margin="normal"
          required
          type={showPassword ? "text" : "password"}
          defaultValue={password}
          onChange={node => setPassword(node.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="lock" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Icon type="eye" />
                  ) : (
                      <Icon type="eye-invisible" />
                    )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Title>Payment</Title>
        <br />
        <CardElement />
        <br />

        <TextField
          id="standard-coupon"
          label="Coupon"
          autoComplete="off"
          margin="normal"
          defaultValue={coupon}
          onChange={node => setCoupon(node.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="gift" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <LightButton
                  aria-label="Apply coupon"
                  onClick={() => {
                    setCouponVerified(null);
                    axios.get(`${ApiServer}/api/v1/user/cards/coupon?coupon=${coupon}`).then((response) => {
                      console.log(response);
                      setBasePrice(495 - (response.data.amount_off / 100))
                      setCouponVerified(true);
                    }).catch((error) => {
                      setBasePrice(495)
                      setCouponVerified(false);
                    })
                  }}
                >
                  APPLY
                </LightButton>
                {couponVerified !== undefined ? couponVerified === null ? <Icon type="loading" /> : <Icon type={couponVerified ? "check-circle" : "close-circle"} /> : <></>}
              </InputAdornment>
            )
          }}
        />
        <StatusMessage status={fieldsCorrect}>
          Something went wrong please review payment information
        </StatusMessage>
        <div>
          <AccentButton
            style={{
              marginTop: "40px",
              width: "100%",
              borderRadius: "15px"
            }}
            onClick={async ev => {
              let { token } = await props.stripe.createToken({
                name: completeName
              });
              console.log(props.password);
              if (token !== undefined) {
                let payload = {
                  coupon: props.coupon,
                  user: {
                    first_name: props.completeName,
                    email: props.email,
                    source: token,
                    phone_number: props.phoneNumber,
                    password: props.password,
                  },
                  dealer: {
                    name: props.dealerName,
                    country: props.country,
                    city: props.city,
                    address1: props.address,
                  }
                }
                axios.post(`${ApiServer}/api/v2/users/signup`, payload).then((response) => {
                  const data = {
                    user: {
                      email: props.email,
                      password: props.password
                    }
                  };
                  axios.post(`${ApiServer}/api/v2/users/login`, data).then(
                    response => {
                      setCookies("token", response.headers['authorization'], {
                        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                      });
                      axios.post(`${ApiServer}/api/v1/user/notifier`, {
                        one_signal_uuid: cookies["one_signal_uuid"]
                      });
                    }
                  );
                }).catch((error) => {
                  setFieldsCorrect(false);
                });
              } else {
                setFieldsCorrect(false);
              }
            }}
          >
            <span style={{ fontWeight: 900 }}>
              Pay $ {basePrice.toFixed(2)} USD and sign in
            </span>
          </AccentButton>
        </div>
      </RegistrationForm>

      <MediaQuery minDeviceWidth={769}>
        <ButtonHolders>
          <LightButton
            onClick={() => {
              if (current - 1 > -1) {
                setCurrent(current - 1);
              }
            }}
          >
            <Icon type="left" /> Back
          </LightButton>
        </ButtonHolders>
      </MediaQuery>
    </>
  );
});

const Section = props => {
  const { current } = props;
  switch (current) {
    case 0:
      return <UserSection {...props} />;
    case 1:
      return <VerifySection {...props} />;
    case 2:
      return <DealerSection {...props} />;
    case 3:
      return (
        <>
          <StripeProvider apiKey={StripeKey}>
            <Elements>
              <SubscriptionSection {...props} />
            </Elements>
          </StripeProvider>
        </>
      );
    default:
      return <UserSection {...props} />;
  }
};

function mobileTitle(index) {
  switch (index) {
    case 1:
      return (
        <>
          <Title>Verify your account</Title>
          <Subtitle>Verify that you are you, check your email!</Subtitle>
        </>
      );
    case 2:
      return (
        <>
          <Title>Dealer information</Title>
          <Subtitle>Tell us about your dealer</Subtitle>
        </>
      );
    case 3:
      return (
        <>
          <Title>Subscription</Title>
          <Subtitle>Process the payment of your subscription</Subtitle>
        </>
      );
    default:
      return (
        <>
          <Title>User information</Title>
          <Subtitle>Provide your basic user information</Subtitle>
        </>
      );
  }
}

function getSteps() {
  return ['User information', 'Verify your account', 'Dealer information', 'Subscription'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Provide your basic user information`;
    case 1:
      return 'Verify that you are you, check your email!';
    case 2:
      return `Tell us about your dealer`;
    case 3:
      return 'Process the payment of your subscription';
    default:
      return 'Unknown step';
  }
}

export const RegisterView = props => {
  const [current, setCurrent] = useState(0);
  const [completeName, setCompleteName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [dealerName, setDealerName] = useState("");
  const [country, setCountry] = useState("DO");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [coupon, setCoupon] = useState("");
  const [amountToPay, setAmountToPay] = useState("495.00");
  const [cardToken, setCardToken] = useState("");

  const steps = getSteps();

  return (<RegistrationWrapper>

    <MediaQuery minDeviceWidth={769}>
      <StepperWrapper>
        <Stepper activeStep={current} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </StepperWrapper>
    </MediaQuery>
    <RegistartionWrapper>
      <Section setRegisterView={props.setRegisterView} current={current} setCurrent={setCurrent} completeName={completeName} setCompleteName={setCompleteName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} email={email} setEmail={setEmail} verified={verified} setVerified={setVerified} dealerName={dealerName} setDealerName={setDealerName} country={country} setCountry={setCountry} city={city} setCity={setCity} address={address} setAddress={setAddress} username={username} setUsername={setUsername} password={password} setPassword={setPassword} coupon={coupon} setCoupon={setCoupon} amountToPay={amountToPay} setAmountToPay={setAmountToPay} cardToken={cardToken} setCardToken={setCardToken} />
    </RegistartionWrapper>
    <MediaQuery maxDeviceWidth={769}>
      <ButtonHolders>

        <MobileStepperCustom
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={current}
        />

        {current > 0 ? (<LightButton onClick={() => {
          if (current - 1 > -1) {
            setCurrent(current - 1);
          }
        }}>
          <Icon type="left" /> Back
            </LightButton>) : (<LightButton onClick={() => { props.setRegisterView(false) }}> <Icon type="left" /> Sign in</LightButton>)}

        {current < 3 ? (<LightButton disabled={!verified && current === 1} onClick={() => {
          if (current + 1 < 4) {
            setCurrent(current + 1);
          }
        }}>
          Next <Icon type="right" />
        </LightButton>) : ("")}
      </ButtonHolders>
    </MediaQuery>
  </RegistrationWrapper >);
};
