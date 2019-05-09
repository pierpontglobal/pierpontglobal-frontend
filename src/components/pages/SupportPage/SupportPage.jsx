import React from 'react';
import { withCookies } from 'react-cookie';
import styled from 'styled-components';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';

const Container = styled.div`
display: grid;
grid-template-rows: 10% 90%;
grid-template-areas: 
  "menu"
  "body";

@media only screen and (min-width: 768px) {
  grid-template-columns: 30% 70%;
  grid-template-rows: 100%;
  grid-template-areas: 
    "menu body";
  }
`;

const BodyContainer = styled.div`
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 48px;
  font-weight: 300;
  padding: 30px;
`;

const Subtitle = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 300;
  padding: 0 30px;
`;

const TextBody = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 200;
  padding: 30px;
`;

const MenuContainer = styled.div`
grid-area: menu;
display: flex;
flex-direction: column;
background: #fafafa;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
overflow: auto;
`;

const MenuItemHeading = styled.div`
  width: 100%;
  height: 40px;
  line-height: 20px;
  font-weight: 600;
  padding: 10px;
  font-size: 16px;
`;

const VideoHolder = styled.div`
   margin: 30px;
`;

const MenuItem = styled.div`

  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-items: center;
  font-weight: 200;
  padding-left: 20px;
  position: relative;
  background: #fafafa;
  cursor: pointer;
  transition: 1s;
  
  :hover {
    background: #dedede;
    transition: 1s;
  }

  :hover::after {
    right: 10px;
    color: #fafafa;
    transition: 1s;
  }

  ::after {
    content: 'keyboard_arrow_right';
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    position: absolute;
    right: 15px;
    color: #dedede;
    font-weight: 900;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    transition: 1s;
  }
`;

const tutorials = [
  {
    id: 1,
    category: 'basics',
    title: 'Sample Item 1',
    video: {
      url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
      sample: 'https://via.placeholder.com/550',
    },
    body: [
      {
        heading: 'TestHeading 1', content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id quam vel sapien maximus egestas non efficitur mi. Donec nec feugiat urna, a efficitur ex. Fusce ullamcorper eros felis, quis egestas lacus pulvinar at. Maecenas maximus interdum facilisis. Vivamus mattis consequat metus, lobortis aliquam lacus. Etiam dapibus vulputate nibh. Morbi egestas blandit neque vel condimentum. Aliquam elementum eget quam laoreet scelerisque. Fusce sit amet velit mollis, fermentum tellus vitae, bibendum nulla. Proin elementum odio nec justo vehicula euismod.
      Fusce quis cursus lectus. Ut ac nisl sed turpis pellentesque faucibus nec id purus. Duis pretium, neque quis blandit tempus, elit quam pretium nibh, id aliquam lorem ligula eget odio. Maecenas iaculis condimentum eros quis iaculis. Nulla vestibulum ornare sollicitudin. Pellentesque porttitor libero tempus, ultrices metus vitae, placerat tortor. Duis rhoncus dictum ipsum non laoreet.
      Donec ut nisi vel enim commodo facilisis in vitae ligula. Maecenas ultricies velit sed nunc ultricies aliquam.`,
      },
      {
        heading: 'TestHeading 2',
        content: <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id quam vel sapien maximus egestas non efficitur mi. Donec nec feugiat urna, a efficitur ex. Fusce ullamcorper eros felis, quis egestas lacus pulvinar at. Maecenas maximus interdum facilisis. Vivamus mattis consequat metus, lobortis aliquam lacus. Etiam dapibus vulputate nibh. Morbi egestas blandit neque vel condimentum. Aliquam elementum eget quam laoreet scelerisque. Fusce sit amet velit mollis, fermentum tellus vitae, bibendum nulla. Proin elementum odio nec justo vehicula euismod.
          Fusce quis cursus lectus. Ut ac nisl sed turpis pellentesque faucibus nec id purus. Duis pretium, neque quis blandit tempus, elit quam pretium nibh, id aliquam lorem ligula eget odio. Maecenas iaculis condimentum eros quis iaculis. Nulla vestibulum ornare sollicitudin. Pellentesque porttitor libero tempus, ultrices metus vitae, placerat tortor. Duis rhoncus dictum ipsum non laoreet.
          Donec ut nisi vel enim commodo facilisis in vitae
          {' '}
          <span style={{ color: 'red' }}>ligula</span>
          . Maecenas ultricies velit sed nunc ultricies aliquam.
                 </p>,
      },
    ],
  },
  {
    id: 2,
    category: 'basics',
    title: 'Sample Item 2',
    video: {
      url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
      sample: 'https://via.placeholder.com/550',
    },
    body: [
      {
        heading: 'TestHeading 1', content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id quam vel sapien maximus egestas non efficitur mi. Donec nec feugiat urna, a efficitur ex. Fusce ullamcorper eros felis, quis egestas lacus pulvinar at. Maecenas maximus interdum facilisis. Vivamus mattis consequat metus, lobortis aliquam lacus. Etiam dapibus vulputate nibh. Morbi egestas blandit neque vel condimentum. Aliquam elementum eget quam laoreet scelerisque. Fusce sit amet velit mollis, fermentum tellus vitae, bibendum nulla. Proin elementum odio nec justo vehicula euismod.
      Fusce quis cursus lectus. Ut ac nisl sed turpis pellentesque faucibus nec id purus. Duis pretium, neque quis blandit tempus, elit quam pretium nibh, id aliquam lorem ligula eget odio. Maecenas iaculis condimentum eros quis iaculis. Nulla vestibulum ornare sollicitudin. Pellentesque porttitor libero tempus, ultrices metus vitae, placerat tortor. Duis rhoncus dictum ipsum non laoreet.
      Donec ut nisi vel enim commodo facilisis in vitae ligula. Maecenas ultricies velit sed nunc ultricies aliquam.`,
      },
      {
        heading: 'TestHeading 2',
        content: <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id quam vel sapien maximus egestas non efficitur mi. Donec nec feugiat urna, a efficitur ex. Fusce ullamcorper eros felis, quis egestas lacus pulvinar at. Maecenas maximus interdum facilisis. Vivamus mattis consequat metus, lobortis aliquam lacus. Etiam dapibus vulputate nibh. Morbi egestas blandit neque vel condimentum. Aliquam elementum eget quam laoreet scelerisque. Fusce sit amet velit mollis, fermentum tellus vitae, bibendum nulla. Proin elementum odio nec justo vehicula euismod.
          Fusce quis cursus lectus. Ut ac nisl sed turpis pellentesque faucibus nec id purus. Duis pretium, neque quis blandit tempus, elit quam pretium nibh, id aliquam lorem ligula eget odio. Maecenas iaculis condimentum eros quis iaculis. Nulla vestibulum ornare sollicitudin. Pellentesque porttitor libero tempus, ultrices metus vitae, placerat tortor. Duis rhoncus dictum ipsum non laoreet.
          Donec ut nisi vel enim commodo facilisis in vitae
          {' '}
          <span style={{ color: 'red' }}>ligula</span>
          . Maecenas ultricies velit sed nunc ultricies aliquam.
                 </p>,
      },
    ],
  },
];

function getTutorial(id) {
  return tutorials.find(tutorial => tutorial.id === id);
}

class SupportPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorialId: 1,
    };
  }

  render() {
    const { tutorialId } = this.state;
    const tutorial = getTutorial(tutorialId);

    return (
      <Container>
        <MenuContainer>
          <MenuItemHeading>Basics</MenuItemHeading>
          <MenuItem>Sample Item</MenuItem>
        </MenuContainer>
        <BodyContainer>
          <Title>{tutorial.title}</Title>
          <hr style={{ margin: '0 30px' }} />
          <VideoHolder>
            <Player
              laysInline
              poster={tutorial.video.sample}
              src={tutorial.video.url}
            />
          </VideoHolder>

          {tutorial.body.map((textBody, i) => (
            <div key={i}>
              <Subtitle>{textBody.heading}</Subtitle>
              <TextBody>
                {textBody.content}
              </TextBody>
            </div>
          ))}
        </BodyContainer>
      </Container>
    );
  }
}

export default withCookies(SupportPage);
