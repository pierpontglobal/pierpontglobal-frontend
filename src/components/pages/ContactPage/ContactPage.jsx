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
  height: 40%;
  background-color: #f7f7f7;
`;

const BottomBackground = styled.div`
  width: 100%;
  height: 60%;
  background-color: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FromWrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.1);
  top: -124px;
  height: 100%;
  width: 55%;
  position: absolute;
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
          Top content...
        </TopBackground>
        <BottomBackground>
          <FromWrapper>
            Awsome form here...
          </FromWrapper>
          Bottom content
        </BottomBackground>
      </Wrapper>
    );
  }
}

export default ContactPage;
