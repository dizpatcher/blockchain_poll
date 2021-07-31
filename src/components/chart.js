import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [
                {
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350
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
                    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                }
            },


        };
    }

    render() {
        return(
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350}/>
            </div>
        )
    }
}

export default ApexChart;