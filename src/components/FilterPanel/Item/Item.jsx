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
        const up = <i style={{ color: 'rgb(58, 62, 67)' }} className="fas fa-caret-up"></i>;
        const down = <i style={{ color: 'rgb(58, 62, 67)' }} className="fas fa-caret-down"></i>;

        return (
            <Container
                className="d-flex flex-column border-bottom"
                minHeight="54px"
            >
                <div 
                    className="d-flex mb-0 p-3 justify-content-between"
                    onClick={this.onClick}
                >
                    <div
                        className="mb-0"
                        style={{
                            display: 'flex',
                            fontSize: '16px',
                            alignContent: 'center',
                            alignItems: 'center',
                            fontWeight: '600',
                        }}
                    >
                    <span>{name}</span>
                    </div>
                        {toggle ? up : down}
                </div>
                <Collapse isOpen={toggle}>
                    {children}
                </Collapse>
            </Container>
        );
    }
}
