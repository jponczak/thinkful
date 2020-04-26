import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import FeatureItem from './FeatureItem';
import FEATURES from '../FEATURES';

const featuresProp = FEATURES;
const featureObj = {
    Processor: {
        name: '17th Generation Intel Core HB (7 Core with donut spare)',
        cost: 700
      }
}

const Processor = [
    {
    name: '17th Generation Intel Core HB (7 Core with donut spare)',
    cost: 700
    },
    {
    name: 'Professor X AMD Fire Breather with sidewinder technology',
    cost: 1200
    }
]
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
    ReactDOM.render(
    <FeatureItem 
        selected={state.selected} 
        feature={Processor} 
        key={state.features} 
        name={featureObj.Processor.name} 
        categoryName = {featureObj.Processor}
        selectedItems = {featureObj.Processor}
    />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

//   it('renders the UI as expected', () => {
//       console.log('test features: ' + state.features);
//     const tree = renderer
//     .create(
//     <FeatureItem
//         selected={state.selected} 
//         feature={state.selected} 
//         key={state.features} 
//         name={state.features} 
//     />)
//     .toJSON();
//     expect(tree).toMatchSnapshot();
//   });