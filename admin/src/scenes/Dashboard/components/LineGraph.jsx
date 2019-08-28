import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import { connect } from "react-redux";

import { getUsers } from "../../../actions/admin";

import moment from "moment";

class LineGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: this.props.graphLabels,
        datasets: [
          {
            label: 'User Count',
            backgroundColor: "rgba(255,0,255, 0.75)",
            data: this.props.graphData
          }
        ]
      }
    };
  }

  state = {};

  componentDidMount() {
    this.props.getUsers();
  }

  componentDidUpdate(prevProps) {
    const { users } = this.props;
    let countedDates = {};
    for (var i = 0; i < users.length; i++) {
      let user = users[i];
      let formattedDate = moment(user.registrationDate).format("MMM Do YYYY");
      if (countedDates[formattedDate]) {
        countedDates[formattedDate] += 1;
      } else {
        countedDates[formattedDate] = 1;
      }
    }
  
  let labels = Object.keys(countedDates);
  let data = Object.values(countedDates);
  let chart = this.chartReference.chartInstance;
  chart.options.legend.fullWidth = false;
  chart.options.legend.labels.boxWidth = 12;
  chart.options.responsive = true;
  chart.options.maintainAspectRatio = false;
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.update();
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
    // let users = this.props.users;

    // // Gather data on registration dates key = date, value = # of users who signed up on that date
    // let countedDates = {};
    // for (var i = 0; i < users.length; i++) {
    //   let user = users[i];
    //   let formattedDate = moment(user.registrationDate).format("MMM Do YYYY");
    //   if (countedDates[formattedDate]) {
    //     countedDates[formattedDate] += 1;
    //   } else {
    //     countedDates[formattedDate] = 1;
    //   }
    // }

    // let data = {
    //   labels: Object.keys(countedDates),
    //   datasets: [
    //     {
    //       label: 'User Count',
    //       backgroundColor: "rgba(255,0,255, 0.75)",
    //       data: Object.values(countedDates)
    //     }
    //   ]
    // };

    let data = this.state.data;

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
    return (
      <div className="position-relative">
        <React.Fragment>
          <Line
            ref={reference => (this.chartReference = reference)}
            options={{
              responsive: true
            }}
            data={this.getChartData}
          />
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.admin.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(LineGraph);
