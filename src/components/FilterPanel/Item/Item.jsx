import React from 'react';
import {Collapse} from 'reactstrap';
import Text from '../../styles/Text/Text';
import Icon from '../../styles/Icon/Icon';
import Container from '../../styles/Container/Container';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toggle : false}
    }

    onClick = () => this.setState(
        prev => ({toggle: !prev.toggle})
    );
    render() {
        const { name, children } = this.props;
        const { toggle } = this.state;
        const up = <Icon className="fas fa-chevron-up" />
        const down = <Icon className="fas fa-chevron-down" color="gray" />;
        return (
            <Container
                className="d-flex flex-column border-bottom"
                minHeight="54px"
            >
                <div 
                    className="d-flex mb-0 p-3 justify-content-between"
                    onClick={this.onClick}
                >
                    <Text
                        className="mb-0"
                        fontSize="1em"
                        fontWeight={600}
                        lineHeight={1.31}
                    >
                        {name}
                    </Text>
                        {toggle ? up : down}
                </div>
                <Collapse isOpen={toggle}>
                    {children}
                </Collapse>
            </Container>
        );
    }
}
