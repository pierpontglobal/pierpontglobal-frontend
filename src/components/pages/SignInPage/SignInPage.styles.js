import styled from "styled-components";
import { TextField } from "@material-ui/core";

export const SignInWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  justify-items: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  justify-self: center;
  align-self: center;
`;

export const WhiteLayer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  top: 0;
  left: 0;
  padding: 40px;
  background: rgba(255, 255, 255, 0.8);
  z-index: 4;
`;

export const Logo = styled.img`
  width: 50px;
`;

export const Title = styled.div`
  font-weight: 900;
  font-size: 24px;
  margin-top: 20px;
  color: #44539e;
`;

export const Subtitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 20px;
  color: #44539e;
`;

export const SignInForm = styled.div`
  width: 90%;
  height: 160px;
  background-color: white;
  margin: 60px auto 0;
  border-radius: 15px;
  box-shadow: rgba(47, 64, 163, 0.3) 0px 0px 50px -10px !important;
  padding: 10px;
`;

export const SignInBox = styled.div`
  overflow: hidden;
  width: 450px;
  height: 70vh;
  position: absolute;
  background: rgba(255, 255, 255, 1);
  margin-left: 15vw;
  margin-top: 15vh;
  border-radius: 15px;
  z-index: 2;
  box-shadow: rgba(47, 64, 163, 0.3) 0px 0px 50px -10px !important;
  @media only screen and (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    margin-left: 0vw;
    margin-top: 0vh;
    border-radius: 0;
  }
`;

export const BlobLeft = styled.img`
  position: absolute;
  width: 69vw;
  max-width: 700px;
  min-width: 400px;
  left: -300px;
  bottom: -160px;
  z-index: 1;
  transform: rotateZ(173deg);
`;

export const GlassBlobLeft = styled(BlobLeft)`
  position: absolute;
  filter: blur(5px);
  bottom: calc(-160px - 15vh);
  left: calc(-300px - 15vw);
  z-index: 3;
  @media only screen and (max-width: 768px) {
    bottom: calc(-14vh);
    left: calc(-20vw);
  }
`;

export const BlobRight = styled.img`
  position: absolute;
  width: 88vw;
  max-width: 1440px;
  min-width: 800px;
  right: -400px;
  top: -500px;
  z-index: 1;
  transform: rotateZ(190deg);
`;

export const GlassBlobRight = styled(BlobRight)`
  position: absolute;
  filter: blur(5px);
  top: calc(-500px - 15vh);
  right: calc(-400px - (100vw - 15vw - 450px));
  z-index: 3;
  @media only screen and (max-width: 768px) {
    bottom: calc(-50vh);
    left: calc(40vw);
  }
`;

export const MainImage = styled.img`
  position: absolute;
  z-index: 2;
  right: 100px;
  top: 300px;
  width: 44vw;
  max-width: 640px;
  min-width: 450px;
`;

export const GlassMainImage = styled(MainImage)`
  position: absolute;
  filter: blur(5px);
  top: calc(300px - 15vh);
  right: calc(100px - (100vw - 15vw - 450px));
  z-index: 3;
  @media only screen and (max-width: 768px) {
    bottom: calc(20vh);
    left: calc(50vw);
  }
`;

export const Fields = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  padding: 20px 20px 0 20px;
  grid-template-columns: 100%;
  grid-template-rows: 50% 50%;
`;

export const LightInput = styled.div`
  position: relative;
  > span {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 28px;
    cursor: text;
    left: 20px;
    color: gray;
    font-size: 20px;
    font-weight: 200;
    z-index: ${props => (props.full === true ? "60" : "20")};
    transition: all 0.5s;
    transform: ${props =>
      props.full === true
        ? "translateY(-23px) translateX(-30px) scale(0.8)"
        : ""};
  }
  > input {
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 40;
    font-size: 24px;
    position: absolute;
    border: none;
    outline: none;
    :focus + span {
      transform: translateY(-23px) translateX(-30px) scale(0.8);
      z-index: 60;
    }
  }
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  justify-items: space-between;
  padding-top: 40px;
  > a {
    color: #159dd6;
    text-decoration: none;
  }
  > span {
    color: gray;
  }
`;
