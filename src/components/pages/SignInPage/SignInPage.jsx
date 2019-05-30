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
  BottomSection
} from "./SignInPage.styles";
import { AccentButton, ApiServer } from "../../../Defaults";

function submit(username, password, setCookies, getCookies) {
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
    err => {}
  );
}

const SignInPage = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies();

  console.log(cookies);

  return (
    <SignInWrapper>
      <BlobLeft src="/images/signinpage/blob.svg" />
      <BlobRight src="/images/signinpage/blob.svg" />
      {/* <MainImage src="/images/signinpage/Dealer.svg" /> */}
      <SignInBox>
        <GlassBlobLeft src="/images/signinpage/blob.svg" />
        <GlassBlobRight src="/images/signinpage/blob.svg" />
        {/* <GlassMainImage src="/images/signinpage/Dealer.svg" /> */}
        <WhiteLayer>
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
          <AccentButton
            style={{
              width: "90%",
              margin: "20px 5% 0",
              borderRadius: "15px",
              left: 0,
              right: 0
            }}
            onClick={() => {
              submit(username, password, setCookies, cookies);
            }}
          >
            Log In
          </AccentButton>
          <BottomSection>
            <a href="/support">Help?</a>
          </BottomSection>
        </WhiteLayer>
      </SignInBox>
    </SignInWrapper>
  );
};

export default SignInPage;
