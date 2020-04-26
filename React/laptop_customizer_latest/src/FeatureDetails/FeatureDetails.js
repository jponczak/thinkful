import React, { Component } from 'react';
import slugify from 'slugify';

class FeatureDetails extends Component {
    render() {
        const USCurrencyFormat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          });

        const detailName = JSON.stringify(this.props.detail.name);
        const itemHash = `"name":${detailName},"cost":${this.props.detail.cost}`;
        return (
            <div key = {slugify(itemHash)} className="feature__item">
                <input type="radio"
                id={itemHash}
                className="feature__option"
                name={(this.props.categoryName)} 
                checked={this.props.detail.name === this.props.selectedItems[this.props.categoryName].name}
                onChange={e => this.props.handleFeatureChange(e)}
                />
            <label htmlFor={itemHash} className="feature__label">
              {this.props.detail.name} 
              ({USCurrencyFormat.format(this.props.detail.cost)})
            </label>

            </div>
        )
    }
}

export default FeatureDetails;