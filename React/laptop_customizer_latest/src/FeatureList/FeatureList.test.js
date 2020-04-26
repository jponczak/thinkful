import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import FeatureList from './FeatureList';
import FEATURES from '../FEATURES';

const featuresProp = FEATURES;

const state = {
    features: featuresProp,
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

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FeatureList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
    .create(<FeatureList 
        features = {featuresProp}
        selected = {state.selected}
    />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
  