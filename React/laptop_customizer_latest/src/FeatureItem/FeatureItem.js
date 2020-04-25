import React, {Component} from 'react';
import FeatureDetails from '../FeatureDetails/FeatureDetails';

class FeatureItem extends Component{
    render() {

        console.log(this.props.feature);
        const featureItem = Object.keys(this.props.feature).map((key, idx) => 
         <FeatureDetails key={key} detail={this.props.feature[idx]} /> 
        )
        return (
            <div>
            {this.props.name}
            {featureItem}
            </div>
        )
    }
}

export default FeatureItem;