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
import Measure from 'react-measure'

const SignInPage = props => {
  const [registerView, setRegisterView] = useState(false);
  const [rightSeparation, setRightSeparation] = useState(0);

  return (
    <SignInWrapper>
      <BlobLeft src="/images/signinpage/blob.svg" />
      <BlobRight src="/images/signinpage/blob.svg" />
      <MainImage src="/images/signinpage/Dealer.svg" />

      <Measure
        bounds
        onResize={contentRect => {
          let bounds = contentRect.bounds;
          setRightSeparation(bounds.right);
        }}
      >
        {({ measureRef }) => (
          <SignInBox ref={measureRef} big={registerView}>
            <GlassBlobLeft big={registerView} rightSeparation={rightSeparation} src="/images/signinpage/blob.svg" />
            <GlassBlobRight big={registerView} rightSeparation={rightSeparation} src="/images/signinpage/blob.svg" />
            <GlassMainImage big={registerView} rightSeparation={rightSeparation} src="/images/signinpage/Dealer.svg" />
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
        )}
      </Measure>
    </SignInWrapper >
  );
};

export default SignInPage;
