import React, { Component } from 'react';
import SummaryItem from '../SummaryItem/SummaryItem';

class SummaryList extends Component {
    render() {

        const summary = Object.keys(this.props.selected).map((summary, idx) => 
            <SummaryItem 
                key = {summary}
                categoryName = {summary}
                categorySelectedObject = {this.props.selected[summary]}
            />
        );

        return (
            <div>
                {summary}
            </div>
        )
    }
}

SummaryList.defaultProps = {
    summary: []
};

export default SummaryList;