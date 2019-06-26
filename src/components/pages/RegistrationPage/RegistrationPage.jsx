import React from "react";
import "./styles.css";
import Axios from "axios";
import { ApiServer } from "../../../Defaults";
import {
  SignInWrapper,
  SignInBox,
  BlobLeft,
  GlassBlobLeft,
  WhiteLayer,
  BlobRight,
  GlassBlobRight,
  MainImage,
  GlassMainImage
} from "../SignInPage/SignInPage.styles";
import Measure from 'react-measure'
import { WhiteLayerCentered, IconBig, H4 } from "./RegistrationPaje.styles";
const qs = require("query-string");

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      rightSeparation: 0,
    };
  }

  async verifyEmail() {
    this.params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    console.log(this.params);
    await Axios.post(
      `${ApiServer}/api/v1/user/verify?token=${this.params["token"]}`
    ).then(response => {
      this.setState({ status: `${response.data.verified}` }, () => {
        setTimeout(() => {
          window.close();
        }, 20000);
      });
    });
  }

  componentDidMount() {
    this.verifyEmail();
  }

  render() {

    const { rightSeparation } = this.state;

    return (
      <SignInWrapper>
        <BlobLeft src="/images/signinpage/blob.svg" />
        <BlobRight src="/images/signinpage/blob.svg" />
        <MainImage src="/images/signinpage/Dealer.svg" />

        <Measure
          bounds
          onResize={contentRect => {
            let bounds = contentRect.bounds;
            this.setState({ rightSeparation: bounds.right });
          }}
        >
          {({ measureRef }) => (
            <SignInBox ref={measureRef} big={true}>
              <GlassBlobLeft big={true} rightSeparation={rightSeparation} src="/images/signinpage/blob.svg" />
              <GlassBlobRight big={true} rightSeparation={rightSeparation} src="/images/signinpage/blob.svg" />
              <GlassMainImage big={true} rightSeparation={rightSeparation} src="/images/signinpage/Dealer.svg" />
              <WhiteLayerCentered>
                {this.state.status === 'loading' ?
                  <>
                    <h1>Verifying account</h1>
                    <IconBig type="loading" />
                    <H4>Wait a moment we are verifying your account</H4>
                  </> :
                  (this.state.status === 'true' ?
                    <>
                      <h1>Account verified!</h1>
                      <IconBig type="check" />
                      <H4>Your account has been verified go back to the registration screen</H4>
                    </> :
                    <>
                      <h1>Something wrong happened</h1>
                      <IconBig type="close" />
                      <H4>Something wrong happened, resend the verification email</H4>
                    </>
                  )
                }
              </WhiteLayerCentered>
            </SignInBox>
          )}
        </Measure>
      </SignInWrapper >
    );
  }
}

export default RegistrationPage;
