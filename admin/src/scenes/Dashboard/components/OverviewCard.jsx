import React, { Component } from 'react';

import { overviewCardWrapper, overviewTitle, overviewData } from '../styles.module.css'

class OverviewCard extends Component {
    state = {  }
    render() {
        const { title, data } = this.props;
        return ( 
            <div className={overviewCardWrapper + ' ' + this.props.className}>
                <div className={overviewTitle}>{title}</div>
                <div className={overviewData}>{data}</div>
            </div>
        );
    }
}
 
export default OverviewCard;