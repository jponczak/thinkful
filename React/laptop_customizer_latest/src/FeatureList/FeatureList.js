import React, {Component} from 'react';
import FeatureItem from '../FeatureItem/FeatureItem';

class FeatureList extends Component {
    render() {
        const features = Object.keys(this.props.features).map((key, idx) => 
            <FeatureItem 
                selected={this.props.selected} 
                key={key} 
                name={key} 
                feature={this.props.features[key]} 
                handleFeatureChange = {this.props.handleFeatureChange}
            />           
          );
        return (
            <div>
            {features}
            </div>
        );
    }
}

FeatureList.defaultProps = {
    features: []
};

export default FeatureList;