import React from 'react';
import VideoModal from 'react-modal-video';
import InfoBar from '../styles/InfoBar/InfoBar';
import Button from '../Btn/Btn';
import '../../../node_modules/react-modal-video/css/modal-video.min.css';
import './styles.css';
import styled from 'styled-components';

const VideoBarText = styled.div`
margin-right: 0;
margin-bottom: 10px;
text-align: center;
@media only screen and (min-width: 600px) {
  margin-right: 20px;
  margin-bottom: 0;
}
`;

class VideoBar extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  // Video banner
  render() {
    return (
      <InfoBar>
        <VideoBarText>
          It’s never been easier to buy cars from the United States
        </VideoBarText>
        <VideoModal channel="youtube" isOpen={this.state.isOpen} videoId="XEcELW3hkuQ" onClose={() => this.setState({ isOpen: false })} />
        <Button height="50px" onClick={this.openModal} color="#0bb761">Watch promo video</Button>
      </InfoBar>
    );
  }
}

export default VideoBar;
