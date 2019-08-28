import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class LineGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: this.props.graphLabels,
        datasets: [
          {
            label: this.props.graphTitle,
            backgroundColor: "rgba(255,0,255, 0.75)",
            data: this.props.graphData
          }
        ]
      }
    };
  }

  state = {};

  static propTypes = {
    ticker: PropTypes.string,
    graphLabels: PropTypes.array,
    graphData: PropTypes.array,
    graphTitle: PropTypes.string,
    graphType: PropTypes.string,
    graphPeriod: PropTypes.string
  };

  componentDidUpdate(prevProps) {
    const {
      graphLabels,
      graphData,
      graphType,
      graphPeriod,
      ticker
    } = this.props;
    if (
      (graphLabels !== prevProps.graphLabels ||
        graphData !== prevProps.graphData ||
        graphType !== prevProps.graphType ||
        graphPeriod !== prevProps.graphPeriod) &&
      (graphLabels && graphData)
    ) {
      let chart = this.chartReference.chartInstance;
      chart.options.legend.fullWidth = false;
      chart.options.legend.labels.boxWidth = 12;
      chart.options.responsive = true;
      chart.options.maintainAspectRatio = false;
      chart.data.labels = graphLabels;
      chart.data.datasets[0].data = graphData;
      chart.data.datasets[0].label = `${ticker} Price`;
      chart.update();
    }
  }

  setGradientColor = canvas => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 700, 0);
    gradient.addColorStop(0, "rgba(244, 67, 54, 0.5)");
    gradient.addColorStop(0.3, "rgba(245, 0, 87, 0.5)");
    gradient.addColorStop(0.6, "rgba(255, 64, 129, 0.5)");
    gradient.addColorStop(1, "rgba(255, 145, 0, 0.5)");
    return gradient;
  };

  getChartData = canvas => {
    const data = this.state.data;
    if (data.datasets) {
      data.datasets.forEach((set, i) => {
        set.backgroundColor = this.setGradientColor(canvas);
        set.borderColor = "white";
        set.borderWidth = 2;
      });
    }
    return data;
  };

  render() {
    const graphType = this.props.graphType;
    const lineGraph = (
      <React.Fragment>
        <Line
          ref={reference => (this.chartReference = reference)}
          options={{
            responsive: true
          }}
          data={this.getChartData}
        />
      </React.Fragment>
    );

    const barGraph = (
      <React.Fragment>
        <Bar
          ref={reference => (this.chartReference = reference)}
          options={{
            responsive: true
          }}
          data={this.getChartData}
        />
      </React.Fragment>
    );

    return (
      <div className="position-relative">
        {(() => {
          if (graphType === "line") {
            return lineGraph;
          } else {
            return barGraph;
          }
        })()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ticker: state.trading.ticker,
  graphLabels: state.trading.graphLabels,
  graphData: state.trading.graphData,
  graphTitle: state.trading.graphTitle,
  graphType: state.trading.graphType,
  graphPeriod: state.trading.graphPeriod
});

export default connect(
  mapStateToProps,
  null
)(LineGraph);
