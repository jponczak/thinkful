import React, { Component } from 'react';

class FeatureDetails extends Component {
    render() {
        return (
            <div>
                {this.props.detail.name}
                {this.props.detail.cost}
            </div>
        )
    }
}

export default FeatureDetails;