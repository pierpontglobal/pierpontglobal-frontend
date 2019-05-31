import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
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
  LightInput,
  Fields,
  BottomSection,
  Loader,
  LoaderWrapper,
  StatusMessage,
  SubscribeButton
} from "./SignInPage.styles";
import { AccentButton, ApiServer } from "../../../Defaults";

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
  const {
    username,
    setUsername,
    password,
    setPassword,
    cookies,
    setCookies,
    loading,
    setLoading,
    status,
    setStatus,
    registerView,
    setRegisterView
  } = props;
  return <>Registration</>;
};

const LoginView = props => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    cookies,
    setCookies,
    loading,
    setLoading,
    status,
    setStatus,
    registerView,
    setRegisterView
  } = props;
  return (
    <>
      <Logo src="/images/signinpage/ppg_logo.svg" />
      <Title>Welcome to PierpontGlobal</Title>
      <Subtitle>Customer Login</Subtitle>
      <SignInForm>
        <Fields>
          <LightInput full={username.length > 0}>
            <input
              type="text"
              onChange={node => setUsername(node.target.value)}
            />
            <span>Username</span>
          </LightInput>
          <LightInput full={password.length > 0}>
            <input
              type="password"
              onChange={node => setPassword(node.target.value)}
            />
            <span>Password</span>
          </LightInput>
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);
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

          {registerView ? (
            <RegisterView />
          ) : (
            <LoginView
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              cookies={cookies}
              setCookies={setCookies}
              loading={loading}
              setLoading={setLoading}
              status={status}
              setStatus={setStatus}
              registerView={registerView}
              setRegisterView={setRegisterView}
            />
          )}
        </WhiteLayer>
      </SignInBox>
    </SignInWrapper>
  );
};

export default SignInPage;
