import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import FeatureList from './FeatureList';

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FeatureList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  