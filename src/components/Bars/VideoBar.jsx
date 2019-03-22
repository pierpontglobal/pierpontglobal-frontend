import React from 'react';
import VideoModal from 'react-modal-video';
import InfoBar from '../styles/InfoBar/InfoBar';
import Text from '../styles/Text/Text';
import Button from '../Btn/Btn';
import '../../../node_modules/react-modal-video/css/modal-video.min.css';
import './styles.css';

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
      <InfoBar
        className="info-bar-shinks"
        style={{
          height: 'auto',
        }}
      >
        <Text
          className="bar-text"
          style={{
            color: '#ffffff',
            marginRight: '20px',
            marginBottom: '0px',
            marginTop: '10px',
          }}
          fontWeight={600}
          lineHeight={1.31}
        >
        It’s never been easier to buy cars from the United States
        </Text>
        <VideoModal channel="youtube" isOpen={this.state.isOpen} videoId="XEcELW3hkuQ" onClose={() => this.setState({ isOpen: false })} />
        <Button height="50px" marginTop="10px" marginBottom="10px" onClick={this.openModal} color="#0bb761">Watch promo video</Button>
      </InfoBar>
    );
  }
}

export default VideoBar;
