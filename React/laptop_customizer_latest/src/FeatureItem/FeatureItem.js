import React, {Component} from 'react';
import FeatureDetails from '../FeatureDetails/FeatureDetails';

class FeatureItem extends Component{
    render() {
        const selectedItems = this.props.selected;
        const featureHash = Object.keys(this.props.feature).map((key, idx) => {
            return key + '-' + idx;
        });
        const featureItem = Object.keys(this.props.feature).map((key, idx) => 
         <FeatureDetails 
         key={key} 
         detail={this.props.feature[idx]} 
         selectedItems={selectedItems}
         handleFeatureChange = {this.props.handleFeatureChange}
         categoryName = {this.props.name}    
         /> 
        )
        return (
            <fieldset className="feature" key = {featureHash}>
            <legend className="feature__name">
                <h3>{this.props.name}</h3>
            </legend>
            {featureItem}
            </fieldset>
        )
    }
}

export default FeatureItem;