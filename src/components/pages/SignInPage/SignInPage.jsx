import React, { useState, useEffect } from "react";
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
import { RecoverView } from "./RecoverView";
import { ChangePasswordView } from "./ChangePasswordView";

const queryString = require('query-string');

const SignInPage = props => {

  const [page, setPage] = useState(1);
  const [registerView, setRegisterView] = useState(false);
  const [rightSeparation, setRightSeparation] = useState(0);

  useEffect(() => {
    var params = queryString.parse(window.location.search, { ignoreQueryPrefix: true })
    var register = params.register === "true";
    if (register) {
      setRegisterView(true)
      setPage(2)
    }
  }, [])


  let view = <LoginView
    registerView={registerView}
    setRegisterView={setRegisterView}
    handleSignIn={props.handleSignIn}
  />;

  switch (page) {
    case 1: view = <LoginView
      registerView={registerView}
      setPage={setPage}
      handleSignIn={props.handleSignIn}
    />;
      break;
    case 2: view = <RegisterView handleSignIn={props.handleSignIn} setPage={setPage} />;
      break;
    case 3:
      view = <RecoverView setPage={setPage}></RecoverView>;
      break;
  }

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
          <SignInBox ref={measureRef} big={page == 2}>
            <GlassBlobLeft big={page == 2} rightSeparation={rightSeparation} src="/images/signinpage/blob.svg" />
            <GlassBlobRight big={page == 2} rightSeparation={rightSeparation} src="/images/signinpage/blob.svg" />
            <GlassMainImage big={page == 2} rightSeparation={rightSeparation} src="/images/signinpage/Dealer.svg" />
            <WhiteLayer>
              {view}
            </WhiteLayer>
          </SignInBox>
        )}
      </Measure>
    </SignInWrapper >
  );
};

export function RecoverPage(props) {
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
          <SignInBox ref={measureRef} big={false}>
            <GlassBlobLeft big={false} rightSeparation={rightSeparation} src="/images/signinpage/blob.svg" />
            <GlassBlobRight big={false} rightSeparation={rightSeparation} src="/images/signinpage/blob.svg" />
            <GlassMainImage big={false} rightSeparation={rightSeparation} src="/images/signinpage/Dealer.svg" />
            <WhiteLayer>
              <ChangePasswordView />
            </WhiteLayer>
          </SignInBox>
        )}
      </Measure>
    </SignInWrapper >
  );
}

export default SignInPage;
