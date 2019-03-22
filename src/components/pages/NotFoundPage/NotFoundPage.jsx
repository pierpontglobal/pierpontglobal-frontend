import React from 'react';
import './styles.css';
import posed from 'react-pose';

const FlyDownDiv = posed.div({
  normal: {
    y: -1000,
  },
  flyin: {
    y: 0,
    transition: {
      delay: 500,
      ease: 'backInOut',
    },
  },
});

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textPlace: 'normal',
    };
  }

  componentDidMount() {
    this.setState({ textPlace: 'flyin' });
  }

  render() {
    return (
      <div>
        <FlyDownDiv pose={this.state.textPlace} className="center-holder">
          <span className="big-text">404</span>
          <div>
              The page you are looking for does not exist
          </div>
        </FlyDownDiv>
      </div>
    );
  }
}

export default NotFoundPage;
