import React from 'react';
import ReactApexChart from 'react-apexcharts';

import '../App.css';

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.poll.id,
            series: [
                {
                data: props.poll.votes
                }],
            options: {
                chart: {
                    type: 'bar',
                    height: 300,
                    width: 400,
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '45%',
                        distributed: true
                    },
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: props.poll.options,
                }
            },


        };
    }

    render() {
        return(
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={300}/>
            </div>
        )
    }
}

export default ApexChart;