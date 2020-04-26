import React, {
    Component
} from 'react';
import FeatureItem from '../FeatureItem/FeatureItem';
import slugify from 'slugify';

const USCurrencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

class FeatureList extends Component {

    render() {
        console.log('featureList');
        const foo = 'featureList';
        const features = Object.keys(this.props.features).map((feature, idx) => {
            const featureHash = feature + '-' + idx;
            const options = this.props.features[feature].map(item => {
                console.log('item' + item.cost);
                const itemHash = slugify(JSON.stringify(item));
                return ( <
                    FeatureItem />
                )
            });
            return (
                <fieldset className="feature" key={featureHash}>
                  <legend className="feature__name">
                    <h3>{feature}</h3>
                  </legend>
                  {options}
                </fieldset>
              );
        });
        return ( <div className = 'foo' > {features} </div>
        )
    }
}

FeatureList.defaultProps = {
    features: []
};
export default FeatureList;