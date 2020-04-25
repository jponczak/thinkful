import React, {Component} from 'react';
import FeatureItem from '../FeatureItem/FeatureItem';

class FeatureList extends Component {
    render() {
        console.log(this.props.features);

        // const featureName = Object.keys(this.props.features).map((key, idx) => {
        //     return key;
        // });

        const features = Object.keys(this.props.features).map((key, idx) => 
            <FeatureItem key={key} name = {key} feature = {this.props.features[key]} />           
          );
        return (
            <div>
            {/* {featureName} */}
            {features}
            </div>
        );
    }
}

FeatureList.defaultProps = {
    features: []
};

export default FeatureList;