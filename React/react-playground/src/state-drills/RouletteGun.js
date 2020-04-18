import React from 'react';

class RouletteGun extends React.Component {

    state = {
        chamber: null,
        spinningTheChamber: false
    }

    constructor(props) {
        super(props);
        console.log(this.props);
    }

    componentDidMount() {
        const min = 1;
        const max = 8;
        this.interval = setInterval(() => {
            const randomNumber = min + Math.random() * (max - min);
            console.log(randomNumber);
        }, 2000);
    }


    renderDisplay() {
        return 'goo';
    }

    trigger() {
        this.setState({
            spinningTheChamber: true
        })

    }

    render() {
        return (
            <div>
                <p>{this.renderDisplay()}</p>
                <button onClick = {this.trigger()}>
                    Trigger
                </button>
            </div>
        )
    }
}

export default RouletteGun;