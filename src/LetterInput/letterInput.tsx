import React, { Component } from 'react';

interface InputProps {
    value: string,
    tabindex: number,
    hideLetter: boolean,
    itemIndex: number
}

const maxlength = 1;
class LetterInput extends Component<InputProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            value: '',
            hideLetter: false,
            tabindex: -1,
            itemIndex: 0
        }
    }
    componentDidMount() {
        this.setState((prevState: any) => ({
            value: this.props.value
        }));
    }
    componentDidUpdate(prevProps: any) {
        if (prevProps.value !== this.props.value) {
            console.log(this.props.value)
            this.setState({ value: this.props.value });
        }
    }
    render() {
        return (
            <><div className='form-input' data-aos='fade-up' data-aos-delay={this.props.itemIndex * 2 + "00"}>{this.props.hideLetter ? <input type="text" className='letterfield' minLength={maxlength} maxLength={maxlength} required /> : <input type="text" value={this.state.value || ''} readOnly tabIndex={this.props.tabindex} disabled />}</div></>
        );
    }
}

export default LetterInput;