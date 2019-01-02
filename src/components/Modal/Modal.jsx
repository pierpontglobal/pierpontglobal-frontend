import React from 'react';
import './style.css';

const headerStyle = {
    height: '72px',
    fontSize: '1.5em',
    fontWeight: 600,
    lineHeight: 1.33,
    color:' #000000',
}

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    autoCloseModal = e => {
        e.stopPropagation();
        let {className} = e.target;
        if (className.includes('my-modal')){
            this.setState({open: false});
            try {
                this.props.notifyClosed()
            } catch(e) {
                console.log(e);
            }
        }
    };

    componentDidMount() {
        this.setState({
            open: this.props.show
        })
    }
    render() {
        let current = 
            this.state.open ? "my-modal my-display-block" : "my-modal my-display-none";
        return(
            <div
                onClick={this.autoCloseModal} 
                className={current}>
                <section style={{height: this.props.height}} className="d-flex my-modal-main">
                    <div className="d-flex flex-column flex-fill">
                        <div style={{backgroundColor: '#fafafa'}}>
                            <h1
                                className="px-3 pt-3 mb-0" 
                                style={headerStyle}
                            >
                                {this.props.title}
                            </h1>
                        </div>
                        <div className="px-3 pb-3 pt-2 d-flex flex-column flex-fill justify-content-between">
                            {this.props.children}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}