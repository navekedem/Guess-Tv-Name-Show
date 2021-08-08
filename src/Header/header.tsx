import React, { Component } from 'react';
import logo from '../logo.svg';


export class Header extends Component {

    // render will know everything!
    render() {
        return <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    }
}