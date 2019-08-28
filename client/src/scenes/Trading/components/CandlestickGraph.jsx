import React, { Component } from 'react';
import { Chart } from 'react-chartjs-2';
import ReactDOM from 'react-dom';

class CandlestickGraph extends Component {
    componentDidMount() {
        this.initializeChart(this.props.config);
    }

    initializeChart(options) {

        Chart.defaults.candlestick = Chart.defaults.bar;
        var candlestick = Chart.controllers.bar.extend({
            draw: function () {
                var ctx = this.chart.chart.ctx;
                var elements = this.getMeta().data;
                var dataset = this.getDataset();
                var ilen = elements.length;
                var i = 0;
                var d;
                Chart.canvasHelpers.clipArea(ctx, this.chart.chartArea);
                for (; i < ilen; ++i) {
                    d = dataset.data[i].o;
                    if (d !== null && d !== undefined && !isNaN(d)) {
                        console.log(elements[i].draw);
                        elements[i].draw();
                    }
                }

                Chart.canvasHelpers.unclipArea(ctx);
            }
        });

        var data = {
            labels: ['one', 'two', 'three'],
            datasets: [
                {
                    label: ['candlestick title'],
                    data: [
                        {h: 4, o: 3, c: 2, l: 1}
                    ]
                }
            ]
        };
        Chart.controllers.candlestick = candlestick;
        let el = ReactDOM.findDOMNode(this.refs.chart);
        var ctx = el.getContext('2d');

        new Chart(ctx, {
            type: 'candlestick',
            data: data,
            options: options
        });
    }

    state = {}
    render() {
        return (
            <div className="position-relative">
                <canvas ref="chart" width="500" height="500"></canvas>
            </div>
        );
    }
}

export default CandlestickGraph;