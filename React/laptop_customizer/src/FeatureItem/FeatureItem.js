import React, { Component } from 'react';

      // const options = this.props.features[feature].map(item => {
      //   const itemHash = slugify(JSON.stringify(item));
      //   return (
      //     <div key={itemHash} className="feature__item">
      //       <input
      //         type="radio"
      //         id={itemHash}
      //         className="feature__option"
      //         name={slugify(feature)}
      //         checked={item.name === this.state.selected[feature].name}
      //         onChange={e => this.updateFeature(feature, item)}
      //       />
      //       <label htmlFor={itemHash} className="feature__label">
      //         {item.name} ({USCurrencyFormat.format(item.cost)})
      //       </label>
      //     </div>
      //   );
      // });
class FeatureItem extends Component {
    render() {
        console.log('hi');
        return (
            <div className='featureItem123'>{this.props.feature}</div>
        );
    }
}

FeatureItem.defaultProps = {
    feature: []
};

export default FeatureItem;