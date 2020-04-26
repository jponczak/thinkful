import React, {Component} from 'react';
import FEATURES from './FEATURES';
import Header from './Header/Header';
import FeatureList from './FeatureList/FeatureList';
import SummaryList from './SummaryList/SummaryList';
import SummaryTotal from './SummaryTotal/SummaryTotal';
// Normalizes string as a slug - a string that is safe to use
// in both URLs and html attributes

import './App.css';

class App extends Component{


  constructor(props) {
    super(props);
    this.state = {
      features: FEATURES,
      selected: {
        Processor: {
          name: '17th Generation Intel Core HB (7 Core with donut spare)',
          cost: 700
        },
        'Operating System': {
          name: 'Ubuntu Linux 16.04',
          cost: 200
        },
        'Video Card': {
          name: 'Toyota Corolla 1.5v',
          cost: 1150.98
        },
        Display: {
          name: '15.6" UHD (3840 x 2160) 60Hz Bright Lights and Knobs',
          cost: 1500
        }
      }
    }
  }
  
  updateFeatureOption = (feature) => {

    const newValue = JSON.parse("{" + feature.target.id + "}");
    const selected = Object.assign({}, this.state.selected);

    selected[feature.target.name] = newValue;
    this.setState({
      selected
    });
  };

  render() {
    return (
      <div className="App">
      <Header />
      <main>
        <form className="main_form">
        <h2>Customize your laptop</h2>
        <FeatureList 
        features = {this.state.features} 
        selected = {this.state.selected}
        handleFeatureChange = {feature => this.updateFeatureOption(feature)}
         />
        </form>
        <section className="main_summary">
        <h2>Your cart</h2>
          <SummaryList 
            selected = {this.state.selected}
          />
          <SummaryTotal 
            selected = {this.state.selected}
          />
        </section>
      </main>
      </div>
    );
  
  }
}

export default App;
