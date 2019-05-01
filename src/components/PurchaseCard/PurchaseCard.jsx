import React from 'react';
import {Collapse} from 'reactstrap';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';
import Step from './Step/Step';

const iconColor = {
    color: '#000000',
    opacity: 0.50,
    fontSize: '0.8125em'
}

export default class PurchaseCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
    }

    toggleCard = () => this.setState(prev => ({
        open: !prev.open
    }));

    render() {
        const {
            orderNumber, 
            steps, 
            car
        } = this.props;

        const {open} = this.state;
        return (
          <Container
            className="mb-3" 
            backgroundColor="#fafafa"
            boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
          >
            <Container
              className="d-flex flex-row justify-content-between pl-3 pr-4"
              height="70px"
              hoverCursor="pointer"
              onClick={this.toggleCard}
            >
              <div>
                <Text
                  className="mb-0 pt-3"
                  opacity={0.87}
                  fontWeight={600}
                  lineHeight={1.25}
                >
                  {car}
                </Text>
                <Text
                  className="mb-0"
                  opacity={0.54}
                  fontSize="0.75em"
                  lineHeight={1.67} 
                >
                  {`Order Number: ${orderNumber}`}
                </Text>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <i 
                  className={`fas fa-chevron-${open ? 'up': 'down'}`}
                  style={iconColor} 
                />
              </div>
            </Container>
            <Collapse isOpen={open}>
              {steps.map((s, i) => 
                <Step 
                  key={i}
                  number={i + 1}
                  date={s.date}
                  completed={s.completed}
                  text={s.text}
                />)}
            </Collapse>
          </Container>
        );
    }
}
