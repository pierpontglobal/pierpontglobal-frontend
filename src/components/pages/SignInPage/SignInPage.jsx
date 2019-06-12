import React, { useState } from "react";
import axios from "axios";
import { useCookies, withCookies } from "react-cookie";
import MediaQuery from "react-responsive";
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
  SignInWrapper,
  SignInBox,
  BlobLeft,
  GlassBlobLeft,
  WhiteLayer,
  BlobRight,
  GlassBlobRight,
  MainImage,
  GlassMainImage,
  VerifyWrapper,
  Logo,
  Title,
  Subtitle,
  SignInForm,
  Fields,
  BottomSection,
  Loader,
  LoaderWrapper,
  StatusMessage,
  SubscribeButton,
  RegistrationForm,
  RegistrationWrapper,
  Stepper,
  LargeSteps,
  ButtonHolders,
  RegistartionWrapper
} from "./SignInPage.styles";
import {
  AccentButton,
  ApiServer,
  CountriesList,
  WSConnection,
  StripeKey
} from "../../../Defaults";
import SimpleInput from "./SimpleInput/SimpleInput";
import { Steps, Icon } from "antd";
import "antd/dist/antd.css";
import "antd/lib/steps/style";
import "./SignInPage.styles.less";
import { LightButton } from "../sign-in-page/styles/sign_in_styles";
import { TextField, InputAdornment, MenuItem } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SubscriptionCard from "../ProfilePage/SubscriptionSide/Components/SubscriptionCard";

const { Step } = Steps;

function submit(
  username,
  password,
  setCookies,
  getCookies,
  setLoading,
  setStatus,
  handleSignIn
) {
  setLoading(true);
  const data = {
    username,
    password,
    grant_type: "password"
  };
  axios.post(`${ApiServer}/oauth/token`, data).then(
    data => {
      setCookies("token", data.data.access_token, {
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      });
      axios.post(`${ApiServer}/api/v1/user/notifier`, {
        one_signal_uuid: getCookies["one_signal_uuid"]
      });
      handleSignIn();
    },
    err => {
      setLoading(false);
      setStatus(false);
    }
  );
}

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
        <ButtonHolders
          style={{ justifyContent: "flex-end", justifyItems: "flex-end" }}
        >
          <LightButton
            onClick={() => {
              if (current + 1 < 4) {
                setCurrent(current + 1);
              }
            }}
          >
            Next Step
          </LightButton>
        </ButtonHolders>
      </MediaQuery>
    </>
  );
};

async function sendSubscription(completeName, email, phoneNumber) {
  await axios.post(`${ApiServer}/api/v1/user/subscription`, {
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
            Previews Step
          </LightButton>
          <LightButton
            disabled={!verified}
            onClick={() => {
              if (current + 1 < 4) {
                setCurrent(current + 1);
              }
            }}
          >
            Next Step
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
          helperText="Please select your country"
          margin="normal"
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
            Previews Step
          </LightButton>
          <LightButton
            onClick={() => {
              if (current + 1 < 4) {
                setCurrent(current + 1);
              }
            }}
          >
            Next Step
          </LightButton>
        </ButtonHolders>
      </MediaQuery>
    </>
  );
};

// TODO: Manage errors
async function createUser(props) {
  console.log(props);

  const {
    email,
    password,
    username,
    phoneNumber,
    completeName,
    country,
    city,
    address
  } = props;

  const data = {
    email,
    password,
    username,
    phone_number: phoneNumber,
    first_name: completeName,
    address: {
      country,
      city,
      primary_address: address
    }
  };
  try {
    const response = await axios.post(`${ApiServer}/api/v1/users`, data);
    if (response.status === 200) {
      console.log(response.data);
    }
  } catch (e) {
    console.log(e);
  }
}

// TODO: Manage erros
async function registerCard(token, coupon) {
  await axios.post(`${ApiServer}/api/v1/user/cards`, {
    card_token: token,
    coupon: coupon ? coupon : null
  });
}

async function setToken(props, cookies, setCookies) {
  const data = {
    username: props.username,
    password: props.password,
    grant_type: "password"
  };

  await axios.post(`${ApiServer}/oauth/token`, data).then(data => {
    setCookies("token", data.data.access_token, {
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    });
    axios.post(`${ApiServer}/api/v1/user/notifier`, {
      one_signal_uuid: cookies["one_signal_uuid"]
    });
  });
}

const SubscriptionSection = injectStripe(props => {
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookies] = useCookies();

  const {
    completeName,
    current,
    setCurrent,
    username,
    setUsername,
    password,
    setPassword,
    coupon,
    setCoupon,
    amountToPay,
    setAmountToPay,
    cardToken,
    setCardToken
  } = props;

  const subscriptionStartDate = new Date();
  const subscriptionEndYear = subscriptionStartDate.getFullYear() + 1;
  const subscriptionEndDate = new Date(
    subscriptionEndYear,
    subscriptionStartDate.getMonth(),
    subscriptionStartDate.getDate()
  );

  return (
    <>
      <RegistrationForm>
        <SubscriptionCard
          planName="PierpontGlobal USA Access"
          endDate={subscriptionEndDate.toDateString()}
        />
        <TextField
          id="standard-usename"
          label="Username"
          autoComplete="username"
          margin="normal"
          required
          defaultValue={username}
          onChange={node => setUsername(node.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon type="user" />
              </InputAdornment>
            )
          }}
        />
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
                  onClick={() => setShowPassword(!showPassword)}
                >
                  APPLY
                </LightButton>
              </InputAdornment>
            )
          }}
        />
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
              await setCardToken(token);
              await createUser({ ...props });
              await setToken({ ...props }, cookies, setCookies);
              await registerCard(token, coupon);
            }}
          >
            Pay $ 495.00 USD and sign in
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
            Previews Step
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

const RegisterView = props => {
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

  return (
    <RegistrationWrapper>
      <Stepper>
        <MediaQuery minDeviceWidth={769}>
          <LargeSteps direction="vertical" current={current}>
            <Step
              title="User information"
              description="Provide your basic user information"
              icon={<Icon type="user" />}
            />
            <Step
              title="Verify your account"
              description="Verify that you are you, check your email!"
              icon={<Icon type="solution" />}
            />
            <Step
              title="Dealer information"
              description="Tell us about your dealer"
              icon={<Icon type="environment" />}
            />
            <Step
              title="Subscription"
              description="Process the payment of your subscription"
              icon={<Icon type="credit-card" />}
            />
          </LargeSteps>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={768}>{mobileTitle(current)}</MediaQuery>
      </Stepper>
      <RegistartionWrapper>
        <Section
          current={current}
          setCurrent={setCurrent}
          completeName={completeName}
          setCompleteName={setCompleteName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}
          verified={verified}
          setVerified={setVerified}
          dealerName={dealerName}
          setDealerName={setDealerName}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          address={address}
          setAddress={setAddress}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          coupon={coupon}
          setCoupon={setCoupon}
          amountToPay={amountToPay}
          setAmountToPay={setAmountToPay}
          cardToken={cardToken}
          setCardToken={setCardToken}
        />
      </RegistartionWrapper>
      <MediaQuery maxDeviceWidth={769}>
        <ButtonHolders
          style={
            current === 0
              ? { justifyContent: "flex-end", justifyItems: "flex-end" }
              : {}
          }
        >
          {current > 0 ? (
            <LightButton
              onClick={() => {
                if (current - 1 > -1) {
                  setCurrent(current - 1);
                }
              }}
            >
              Previews Step
            </LightButton>
          ) : (
            ""
          )}
          {current < 3 ? (
            <LightButton
              disabled={!verified && current === 1}
              onClick={() => {
                if (current + 1 < 4) {
                  setCurrent(current + 1);
                }
              }}
            >
              Next Step
            </LightButton>
          ) : (
            ""
          )}
        </ButtonHolders>
      </MediaQuery>
    </RegistrationWrapper>
  );
};

const LoginView = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);

  return (
    <>
      <Logo src="/images/signinpage/ppg_logo.svg" />
      <Title>Welcome to PierpontGlobal</Title>
      <Subtitle>Customer Login</Subtitle>
      <SignInForm>
        <Fields>
          <SimpleInput
            value={username}
            label="Username"
            type="text"
            onChange={node => setUsername(node.target.value)}
          />
          <SimpleInput
            value={password}
            label="Password"
            type="password"
            onChange={node => setPassword(node.target.value)}
          />
        </Fields>
      </SignInForm>
      <StatusMessage status={status}>
        Something went wrong, verify your credentials
      </StatusMessage>
      <AccentButton
        style={{
          width: "90%",
          margin: "20px 5% 0",
          borderRadius: "15px",
          left: 0,
          right: 0
        }}
        onClick={() => {
          submit(
            username,
            password,
            setCookies,
            cookies,
            setLoading,
            setStatus,
            props.handleSignIn
          );
        }}
      >
        Log In
      </AccentButton>
      <LoaderWrapper loading={loading}>
        <Loader />
      </LoaderWrapper>
      <BottomSection>
        <span>
          Don't have an account?{" "}
          <a
            onClick={() => {
              props.setRegisterView(!props.registerView);
            }}
          >
            Subscribe!
          </a>
        </span>
      </BottomSection>
    </>
  );
};

const SignInPage = props => {
  const [registerView, setRegisterView] = useState(false);

  return (
    <SignInWrapper>
      <BlobLeft src="/images/signinpage/blob.svg" />
      <BlobRight src="/images/signinpage/blob.svg" />
      {/* <MainImage src="/images/signinpage/Dealer.svg" /> */}
      <SignInBox big={registerView}>
        <GlassBlobLeft big={registerView} src="/images/signinpage/blob.svg" />
        <GlassBlobRight big={registerView} src="/images/signinpage/blob.svg" />
        {/* <GlassMainImage src="/images/signinpage/Dealer.svg" /> */}
        <WhiteLayer>
          {registerView ? (
            <RegisterView />
          ) : (
            <LoginView
              registerView={registerView}
              setRegisterView={setRegisterView}
              handleSignIn={props.handleSignIn}
            />
          )}
        </WhiteLayer>
      </SignInBox>
    </SignInWrapper>
  );
};

export default SignInPage;
