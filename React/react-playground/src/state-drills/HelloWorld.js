import React from 'react';

class HelloWorld extends React.Component {

    state = {who: 'world'};
    // constructor(props) {
    //     super(props);
    //     console.log('props in constructor ', props);
    //     this.state = {who: 'world'};
    // }

    handleButtonDude = () => {
        this.setState({
            who: 'dude'
        });
    }
    handleButtonWorld = () => {
        this.setState({
            who: 'world'
        });
    }

    render() {
        return (
            <div>
                <p>Hello {this.state.who}!</p>
                <button onClick={this.handleButtonDude}>
                    Dude
                </button>
                <button onClick={this.handleButtonWorld}>
                    World
                </button>
            </div>
        )
    }
}

export default HelloWorld;