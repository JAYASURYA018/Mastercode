import React, { useRef } from "react";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from "highcharts/highcharts-3d";
import HighchartsExporting from 'highcharts/modules/exporting';
highcharts3d(Highcharts);
import "./_highchart.scss";

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

const BusinessOutcome = (props: HighchartsReact.Props) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    let responseData = [
        {
            "key": "Failure BO",
            "value": 2
        },
        {
            "key": "Required but not urgent",
            "value": 1
        },
        {
            "key": "Will pay before the Due time",
            "value": 1
        }
    ];

    const filterData = (data) => {
        let newArray = [];
        data.map((item) => {
            newArray.push({ name: item.key + " : " + item.value, y: item.value })
        })
        return newArray
    }




    const options = {

        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Business Outcome'
        },
        exporting: {
            chartOptions: {
                title: {
                    text: 'Business Outcome'
                },
            }
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            //  name: 'Browser share',
            data: filterData(responseData)
            //data: [
            //    ['Firefox', 45.0],
            //    ['IE', 26.8],
            //    {
            //        name: 'Chrome',
            //        y: 12.8,
            //        sliced: true,
            //        selected: true
            //    },
            //    ['Safari', 8.5],
            //    ['Opera', 6.2],
            //    ['Others', 0.7]
            //]
        }]
    };


    return (
        <div id="container">

            <figure className="highcharts-figure">  
                <p className="highcharts-description">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                        ref={chartComponentRef}
                        {...props}
                    />

                </p>
            </figure>

        </div>

    )

}
export default BusinessOutcome