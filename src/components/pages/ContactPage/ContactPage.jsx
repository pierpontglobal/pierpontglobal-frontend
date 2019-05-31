/**
 * @desc Rebuild Contact page using clean and modern design
 * @author Daniel Peña
 */
import React from 'react';
import styled from 'styled-components';

import { AppNavHeight } from '../../../constants/ApplicationSettings';


const Wrapper = styled.div`
  width: 100%;
  height: ${`calc(100% - ${AppNavHeight}px)`};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TopBackground = styled.div`
  width: 100%;
  height: 60%;
  background-color: black;
  position: relative;
`;

const BottomBackground = styled.div`
  width: 100%;
  height: 40%;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > svg {
    position: absolute;
    top: -50%;
    left: 0;
  }
`;

const FromWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px 0px rgb(0, 0, 0, 0.15);
  top: -192px;
  height: 120%;
  width: 55%;
  position: absolute;
  z-index: 300;

  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

const FormContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;

  @media only screen and (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: auto;
  }
`;

const HeaderContent = styled.div`
  height: auto;
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 90;
  position: absolute;
  background: transparent;
  top: 25%;

  @media only screen and (max-width: 768px) {
    top: 2%;
  }
`;

const PageTitle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: 2.45rem;
    color: white;
    font-weight: 400;
  }

  @media only screen and (max-width: 768px) {
    & > span {
    font-size: 2.0rem;
    }
  }
`;

const PageDescripcion = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  & > span {
    font-size: 1.45rem;
    color: #fefefe;
    font-weight: 100;
  }

  @media only screen and (max-width: 768px) {
    & > span {
    font-size: 1.15rem;
    }
  }
`;

const FormLeftWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 3fr;
  grid-template-columns: auto;
`;

const FormTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 16px;
  & > span {
    font-weight: 600;
    font-size: 1.25rem;
  }
`;

const FormRightWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const FooterText = styled.div`
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  text-align: center;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  & > iframe {
    width: 100%;
    height: 100%;
    border: none;
    z-index: 100;
    opacity: 0.3;
  }
`;

const ContactForm = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      message: '',
    }
  }

  render() {
    return(
      <Wrapper>
        <TopBackground>
          <MapWrapper>
            <iframe title="Mobile map - miami florida" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.8792765692288!2d-80.19274648464578!3d25.774550783630893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69c2ad348bb%3A0x7b8117c2e431f3a7!2s199+E+Flagler+St%2C+Miami%2C+FL+33131%2C+USA!5e0!3m2!1sen!2sdo!4v1556557890802!5m2!1sen!2sdo" frameBorder="0" allowFullScreen />
          </MapWrapper>
          <HeaderContent>
            <PageTitle>
              <span>Get in touch</span>
            </PageTitle>
            <PageDescripcion>
              <span>Some awsome description for the page here.</span>
            </PageDescripcion>
          </HeaderContent>
        </TopBackground>
        <BottomBackground>
          {/* <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" fill="url(#fill-gradient);">
            <linearGradient id="fill-gradient" >
              <stop offset="50%" stop-color="white" />
              <stop offset="57%" stop-color="white" />
            </linearGradient>
            <path d="M0 50 C 21 10, 65 6, 50 50 S 79 94, 100 50 S" stroke="black" strokeWidth="0px" fill="url(#fill-gradient);" />
          </svg> */}
          <FromWrapper>
            <FormContentWrapper>
              <FormLeftWrapper>
                <FormTitle>
                  <span>
                    Write your message
                  </span>
                </FormTitle>
                <ContactForm>
                  Contact form here...
                </ContactForm>
              </FormLeftWrapper>
              <FormRightWrapper>
                some awsome desing here...
              </FormRightWrapper>
            </FormContentWrapper>
          </FromWrapper>
          <FooterText>
            &copy; 2019 - PierpontGlobal, Inc. All rights reserved.
          </FooterText>
        </BottomBackground>
      </Wrapper>
    );
  }
}

export default ContactPage;
