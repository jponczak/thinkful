import React from 'react';

class Bomb extends React.Component {
    state = {
        count:0
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                count: this.state.count + 1
            })
        }, 1000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderDisplay() {
        const counter = this.state.count;

        if (counter >= 8) {
            clearInterval(this.interval);
            return 'BOOM';
        } else if (counter % 2 === 0) {
            return 'tick';
        } else {
            return 'tock';
        }
    }

    render() {
        return (
        <div>
            <p>{this.renderDisplay()}</p>
        </div>
        )
    }
}

export default Bomb;