import React, { Component } from 'react';

class SummaryItem extends Component {
    render() {
        const USCurrencyFormat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          });

        
        return (
            <div className="summary__option">
                <div className="summary__option__label">{this.props.categoryName} </div>
                <div className="summary__option__value">{this.props.categorySelectedObject.name}</div>
                <div className="summary__option__cost">
                    {USCurrencyFormat.format(this.props.categorySelectedObject.cost)}
                </div>


            </div>
        )
    }
}


export default SummaryItem;