import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import MediaQuery from "react-responsive";
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
  RegistrationWrapper,
  Stepper,
  LargeSteps
} from "./SignInPage.styles";
import { AccentButton, ApiServer } from "../../../Defaults";
import SimpleInput from "./SimpleInput/SimpleInput";
import styled from "styled-components";

import { Steps, Icon } from "antd";
import "antd/dist/antd.css";
import "antd/lib/steps/style";
import "./SignInPage.styles.less";
import { LightButton } from "../sign-in-page/styles/sign_in_styles";
const { Step } = Steps;

function submit(
  username,
  password,
  setCookies,
  getCookies,
  setLoading,
  setStatus
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
    },
    err => {
      setLoading(false);
      setStatus(false);
    }
  );
}

const RegisterView = props => {
  const [current, setCurrent] = useState(0);

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
        <MediaQuery maxDeviceWidth={768}>
          {() => {
            switch (current) {
              case 1:
                return (
                  <>
                    <Title>Verify your account</Title>
                    <Subtitle>
                      Verify that you are you, check your email!
                    </Subtitle>
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
                    <Subtitle>
                      Process the payment of your subscription
                    </Subtitle>
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
          }}
        </MediaQuery>
      </Stepper>
      <div>
        <LightButton
          onClick={() => {
            if (current - 1 > -1) {
              setCurrent(current - 1);
            }
          }}
        >
          Back Step
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
      </div>
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
            setStatus
          );
        }}
      >
        Log In
      </AccentButton>
      <LoaderWrapper loading={loading}>
        <Loader />
      </LoaderWrapper>
      {/* <BottomSection><a href="/support">Help?</a></BottomSection> */}
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
          <SubscribeButton
            onClick={() => {
              setRegisterView(!registerView);
            }}
          >
            {registerView ? (
              <>
                <i className="material-icons">arrow_back</i>
                Login to the platform{" "}
              </>
            ) : (
              <>
                Subscribe to the platform{" "}
                <i className="material-icons">arrow_forward</i>
              </>
            )}
          </SubscribeButton>

          {registerView ? <RegisterView /> : <LoginView />}
        </WhiteLayer>
      </SignInBox>
    </SignInWrapper>
  );
};

export default SignInPage;
