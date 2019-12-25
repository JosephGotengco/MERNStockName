import React, { Component } from "react";
import { connect } from "react-redux";
import { changeGraphType } from "../../../actions/graphActions";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { inputWrapper, fieldWrapper, input, inputIcon } from "../input.module.css";
class GraphTypeControl extends Component {
    graphTypeOptions = [
        { type: "Line Chart", val: "line" },
        { type: "Bar Chart", val: "bar" }
        // {type: 'Point and Figure Chart', val: 'pF'},
        // {type: 'Candlestick Chart', val: 'Cs'},
        // {type: 'OHLC Chart', val: 'ohlc'}
    ];
    state = {};

    handleGraphType = e => {
        if (e.target.value) {
            this.props.changeGraphType(e.target.value);
        }
    };

    render() {
        return (
            <div className={inputWrapper}>
                <div>Graph Type</div>
                <div className={fieldWrapper}>
                    <select
                        id="graphType"
                        name="graphType"
                        onChange={this.handleGraphType}
                        className={input}
                        required
                    >
                        {this.graphTypeOptions.map(option => (
                            <option key={option.val} value={option.val}>
                                {option.type}
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
    graphType: state.trading.graphType
});

export default connect(
    mapStateToProps,
    { changeGraphType }
)(GraphTypeControl);
