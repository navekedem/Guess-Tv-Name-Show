import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { UserStats } from '../Models/UserStats';
import LetterInput from '../LetterInput/letterInput';
import { Movie } from '../Models/Movie';
import { GameService } from '../Services/GameHandler.service';
import Popup from '../Statistics/statistics';
import { PopupMessage } from '../PopupMessage/popup-msg';

interface GuessTheNameProps {
    gameService: typeof GameService,
}

@inject('gameService')
@observer
export class GuessTheName extends React.Component<GuessTheNameProps, any> {

    constructor(props: any) {
        super(props)
        this.showHint = this.showHint.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.noClick = this.noClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.props.gameService.loadMovies(1).then((allMovies: Movie[]) => {
            this.props.gameService.Movies = this.props.gameService.ConvertApiData(allMovies);
            this.intailizeGameAndUserData();
        });
    }

    intailizeGameAndUserData() {
        this.props.gameService.showHint = false;
        this.props.gameService.togglePopup = false;
        this.props.gameService.gameMsg = '';
        this.props.gameService.winGame = false;
        this.props.gameService.userStat = { rightGuesses: 0, wrongGuesses: 0, usedHint: 0, } as UserStats
        this.props.gameService.singleMovie = this.props.gameService.GetMovie(this.props.gameService.Movies)
    }
    showHint() {
        this.props.gameService.showHint = true;
        this.props.gameService.updateUserHintsStats();
    }
    noClick() {
        this.props.gameService.gameOver = false;
    }
    handleSubmit(event: any) {
        event.preventDefault();
        let nameForTest = "";
        let movieID = event.target.elements.movieID.value;
        let formInputs = [...event.target.elements]
        formInputs = Array.from(event.target.elements);
        formInputs.forEach((element: any) => {
            if (element.value !== movieID) {
                nameForTest += element.value;
            }
        });
        if (this.props.gameService.checkAnswer(this.props.gameService.singleMovie.name, nameForTest)) {
            this.props.gameService.updateUserRightStats();
            let index = this.props.gameService.ClearMovie(this.props.gameService.Movies,movieID);
            this.props.gameService.gameMsg = "Correct Answer"
            this.props.gameService.showHint = false;
            if(index >= 0) {
                console.log(index);
                this.props.gameService.Movies.splice(index,1);
                if(this.props.gameService.Movies.length == 0) {
                    this.UpdateWin();
                    return;
                }
            } 
            //Hide the msg after 5 Seconds
            setTimeout(() => {
                this.props.gameService.gameMsg = '';
            }, 5000);
            let singleTv = this.props.gameService.GetMovie(this.props.gameService.Movies)
            if(singleTv) {this.props.gameService.singleMovie = singleTv;}
        } else {
            this.props.gameService.gameMsg = "Wrong Answer Try Again"
            this.props.gameService.updateUserWrongStats();
            this.props.gameService.updateUserLife();
        }
    }
    UpdateWin() {
        this.props.gameService.winGame = true;
        this.props.gameService.gameOver = true;

    }
    togglePopup() {
        this.props.gameService.togglePopup = !this.props.gameService.togglePopup;
    }
    render() {
        let wordArr: string[] = [];
        let tabindex: number;
        let hint: string = "";
        let movieID: string = "";
        let singleMovie: string = "";
        if (this.props.gameService.singleMovie) {
            tabindex = -1
            singleMovie = this.props.gameService.singleMovie.name;
            movieID = this.props.gameService.singleMovie.id;
            hint = this.props.gameService.singleMovie.hint; 
            
            wordArr = this.props.gameService.singleMovie.name.split('');
        }
        return <div className='genreted-form'>
            <form onSubmit={this.handleSubmit}> {wordArr.length > 0 ? wordArr.map((letter: string, index: number) => { if (!/\s/.test(letter)) { return <LetterInput value={letter} itemIndex={index} key={this.props.gameService.singleMovie.id + index} tabindex={tabindex} hideLetter={this.props.gameService.checkArrayCount(wordArr.length, index)} /> } else { return <div key={index} className='spacer'></div> } }) : ""}<input type='hidden' name='movieID' id='movieID' value={movieID} />
                <div className='btn checkGuess'><button data-aos='fade-up' disabled={this.props.gameService.userLife.reduce((a, b) => a + b) > 0 ? false : true} data-aos-delay='1000'>Check the guess</button></div>
            </form>
            <div className='btn-wrapper'>
                 {/*remove comment if you want to know to the answer {singleMovie} */}
                <div className='btn getHint'><button type="button" data-aos='fade-up' data-aos-delay='1200' onClick={this.showHint}>Hint</button></div>
                <div className='btn getStat'><button type="button" data-aos='fade-up' data-aos-delay='1400' onClick={this.togglePopup}>Statistics</button></div>
            </div>
            {this.props.gameService.gameMsg != '' ? <div className='gameMsg' data-aos='fade-right'>{this.props.gameService.gameMsg}</div> : null}
            {this.props.gameService.showHint ? <div className='hint-wrapper' data-aos-duration='800' data-aos="fade-right">
                {hint}
            </div> : null}
            {this.props.gameService.togglePopup ? <Popup right={this.props.gameService.userStat.rightGuesses} wrong={this.props.gameService.userStat.wrongGuesses} hints={this.props.gameService.userStat.usedHint} handleClose={this.togglePopup} /> : null}
            {this.props.gameService.gameOver ? <PopupMessage handleNoClick={this.noClick} winGame={this.props.gameService.winGame}/> : null}
        </div>

    }

}

