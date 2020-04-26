import React, { Component } from 'react';

class SummaryTotal extends Component {
    render() {
        const total = Object.keys(this.props.selected).reduce(
            (acc, curr) => acc + this.props.selected[curr].cost,
            0
          );

          const USCurrencyFormat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          });

        return (
            <div className="summary__total">
              <div className="summary__total__label">Total</div>
              <div className="summary__total__value">
                {USCurrencyFormat.format(total)}
              </div>
            </div>
        )
    }
}

SummaryTotal.defaultProps = {
    total: []
};
export default SummaryTotal;