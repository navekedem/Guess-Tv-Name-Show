import { Movie } from "../Models/Movie";
import { makeObservable, observable, action } from "mobx"
import { UserStats } from "../Models/UserStats";
const axios = require('axios');


export class GameHandler {
    Movies: Movie[];
    singleMovie: Movie;
    showHint: boolean;
    togglePopup: boolean;
    gameMsg: string;
    userStat: UserStats;
    gameOver:boolean;
    winGame:boolean;
    userLife: number[] = [1, 1, 1];
    private readonly apiKey = '4c31da32576037f8c81d80f6407ea93c';
    private readonly apiUrl: string = `https://api.themoviedb.org/3/tv/top_rated?api_key=${this.apiKey}&language=en-US`
    constructor() {
        makeObservable(this, {
            Movies: observable,
            singleMovie: observable,
            showHint: observable,
            togglePopup: observable,
            userStat: observable,
            winGame:observable,
            gameMsg: observable,
            userLife: observable,
            gameOver:observable,
            ClearMovie: action,
            ConvertApiData: action,
            GetMovie: action,
            updateUserLife:action,
        })
    }
    @action
    async loadMovies(page:number) {
        const responseItems = await axios.get(this.apiUrl + "&page=" + page).then((response: any) => {
            return response.data.results
        }).catch((error: any) => {
            // handle error
            return error;
        });
        return responseItems;
    }
    ConvertApiData(moviesArr: any) {
        return moviesArr.map((movie: any) => {
            let movieModel: Movie = {
                id: movie.id,
                name: movie.name.replace(/[^a-zA-Z -]/g, ""),
                hint: movie.overview
            }
            return movieModel
        })
    }
    ClearMovie(moviesArr: Movie[],movieId: string) {
        if(this.Movies.length > 0) {
            return this.Movies.findIndex(selectedMovie => selectedMovie.id == movieId);
        } 
        return -1;
    }
    GetMovie(moviesArr: Movie[]) {
        return moviesArr[Math.floor(Math.random() * this.Movies.length)];
    }
    ShowHint() {
        return true;
    }
    TogglePopup(isToggle: boolean) {
        return !isToggle
    }
    checkAnswer(movieName: string, finalRes: string) {
        let filterdName = movieName.replace(/\s/g, '');
        if (filterdName?.toString().toLowerCase() === finalRes.toLowerCase()) { return true }
        return false;
    }
    updateUserLife() {
        let lifeRes = this.userLife.reduce((a, b) => a + b);
        switch (lifeRes) {
            case 3:
                this.userLife.pop();
                this.userLife.unshift(0)
                break;
            case 2:
                this.userLife.pop();
                this.userLife.unshift(0)
                break;
            case 1:
                this.userLife.pop();
                this.userLife.unshift(0)
                this.endGame()
                break;
            default:
                break;
        }

    }
    endGame(){
        this.gameOver = true;
    }
    updateUserRightStats() {
        this.userStat.rightGuesses++;
    }
    updateUserWrongStats() {
        this.userStat.wrongGuesses++
    }
    updateUserHintsStats() {
        this.userStat.usedHint++;
    }
    checkArrayCount(nameLength: number, itemIndex: number) {
        let val = 0;
        if (nameLength < 15) {
            val = 2
        } else if (nameLength > 15) {
            val = 3
        } else {
            val = 4
        }
        return this.checkIndex(val, itemIndex);
    }
    checkIndex(num: number, index: number) {
        if (index % num === 0) return true;
        return false;
    }

}

export const GameService = new GameHandler();