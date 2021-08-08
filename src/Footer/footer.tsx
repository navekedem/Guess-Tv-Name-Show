import React, { Component } from 'react';
import logo from '../logo.svg';


export class Footer extends Component {

   
    render() {
        return <footer className="App-footer">
        <img src={logo} className="App-logo" alt="logo" />
       <span className='bolder'>Nave Kedem</span> 
      </footer>
    }
}