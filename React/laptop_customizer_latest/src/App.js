import React, {Component} from 'react';
import Header from './Header/Header';
import FEATURES from './FEATURES';
import FeatureList from './FeatureList/FeatureList';
// Normalizes string as a slug - a string that is safe to use
// in both URLs and html attributes
import slugify from 'slugify';

import './App.css';

class App extends Component{
  state = {
    features: FEATURES
  }
  render() {
    const {features} = this.state;


    return (
      <div className="App">
      <Header />
      <main>
        <form className="main_form">
        </form>
        <section className="main_summary">
          <FeatureList features = {this.state.features} />
        </section>
      </main>
      </div>
    );
  
  }
}

export default App;
