import React, { Component } from "react";
import { connect } from "react-redux";
import {
    changeGraphPeriod,
    getGraphData
} from "../../../actions/graphActions";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { inputWrapper, fieldWrapper, input, inputIcon } from "../input.module.css";
class GraphPeriodControl extends Component {
    timeOptions = ["1m", "3m", "6m", "1y", "2y", "5y", "max"];

    state = {};
    componentDidUpdate(prevProps) {
        const { graphPeriod, ticker } = this.props;
        if (graphPeriod !== prevProps.graphPeriod && ticker === prevProps.ticker) {
            this.props.getGraphData(ticker, graphPeriod);
        }
    }
    handleGraphPeriod = e => {
        if (e.target.value) {
            this.props.changeGraphPeriod(e.target.value);
        }
    };
    render() {
        return (
            <div className={inputWrapper}>
                <div>Graph Range</div>
                <div className={fieldWrapper}>
                    <select
                        id="graphPeriod"
                        name="graphPeriod"
                        onChange={this.handleGraphPeriod}
                        className={input}
                        required
                    >
                        <option key="" value="" disabled hidden />
                        {this.timeOptions.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <ExpandMore className={inputIcon} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    ticker: state.trading.ticker,
    graphPeriod: state.trading.graphPeriod
});

export default connect(
    mapStateToProps,
    { changeGraphPeriod, getGraphData }
)(GraphPeriodControl);
