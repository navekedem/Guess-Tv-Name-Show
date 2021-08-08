import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { GameService } from '../Services/GameHandler.service';


interface GuessTheNameProps {
    gameService: typeof GameService,
}

@inject('gameService')
@observer
export class LifePoint extends React.Component<GuessTheNameProps, any> {
    

    componentWillMount() {
            
    }


    componentDidMount() { 
    }

    // render will know everything!
    render() {
        return (<div className='lifepoints'><span className='bolder'>LIFE:</span> {this.props.gameService.userLife.map((val,index) => {
            let activeClass = "";
            if(val > 0) {
                activeClass = "active"
            }
            return <span className={'lifepoint '+ activeClass} data-aos="fade-right" key={index} data-aos-delay={index * 3 + "00"}>&#9733;</span>
        })}</div>)
    }
}