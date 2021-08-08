import React, { Component } from 'react';


interface PopProps {
    right: number,
    handleClose: any,
    wrong: number,
    hints: number
}

class Popup extends Component<PopProps, any> {
    constructor(props: any) {
        super(props)

    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="popup-box">
                <div className="box"  data-aos='fade-down'>
                    <span className="close-icon" onClick={this.props.handleClose}>x</span>
                    <div className='stats-results'>
                        <div className='rightbox'>Right answers:<br/><span className='bolder'>{this.props.right}</span></div>
                        <div className='wrongbox'>Wrong answers:<br/><span className='bolder'>{this.props.wrong}</span></div>
                        <div className='hintbox'>Hints used:<br/><span className='bolder'>{this.props.hints}</span></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;