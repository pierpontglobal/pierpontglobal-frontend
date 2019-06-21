import React, { useState } from "react";
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
} from "./SignInPage.styles";
import { LoginView } from "./LoginView";
import { RegisterView } from "./RegisterView";

const SignInPage = props => {
  const [registerView, setRegisterView] = useState(false);

  return (
    <SignInWrapper>
      <BlobLeft src="/images/signinpage/blob.svg" />
      <BlobRight src="/images/signinpage/blob.svg" />
      <MainImage src="/images/signinpage/Dealer.svg" />
      <SignInBox big={registerView}>
        <GlassBlobLeft big={registerView} src="/images/signinpage/blob.svg" />
        <GlassBlobRight big={registerView} src="/images/signinpage/blob.svg" />
        <GlassMainImage big={registerView} src="/images/signinpage/Dealer.svg" />
        <WhiteLayer>
          {registerView ? (
            <RegisterView handleSignIn={props.handleSignIn} setRegisterView={setRegisterView} />
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
