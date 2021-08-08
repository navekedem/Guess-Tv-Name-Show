import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';


interface PopProps {
    handleNoClick: any,
    winGame: boolean,  
}

export class PopupMessage extends React.Component<PopProps, any> {
    constructor(props: any) {
        super(props)

    }
    componentWillMount() {

    }


    componentDidMount() {
    }

    // render will know everything!
    render() {
        return <div className="popup-box">
            <div className="box" data-aos='fade-down'>
                <div className='lost-popup-wrapper'>
                    <h3>{ this.props.winGame?  "You Win 😀"   : "Game Is Over 😥"}</h3> 
                    Would You Like To Try Again?
                    <div className='lostBtns'>
                        <button type='button' onClick={()=>{window.location.reload()}} className='yesBtn'>Yes</button>
                        <button type='button' onClick={this.props.handleNoClick} className='noBtn'>No</button>
                    </div>
                </div>
            </div>
        </div>
    }
}