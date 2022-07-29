import React, { useRef } from "react";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CampaignDetailsChart, nameValueEntity } from "./realTimeStatistics";

export interface CampaignsStatusProps {
    chartData: CampaignDetailsChart;
}

const CampaignsStatus = (props: CampaignsStatusProps) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    let chartData: nameValueEntity[] = [
        { name: "Active", y: props.chartData.active },
        { name: "In Active", y: props.chartData.inActive },
        { name: "Terminated", y: props.chartData.elapsed }
    ];

    const viewFullScreen = () => {
        chartComponentRef.current.chart.fullscreen.toggle()

    }

    const options = {
        colors: ['#00b3a0', '#fdbf59', '#ff5c49'],
        chart: {
            type: 'pie',
            height: 195,
            spacingBottom: 0,
            spacingTop: 10,
            spacingLeft: 0,
            spacingRight: 10,
            marginBottom: 0,
            marginTop: 10,
            marginLeft: -90,
            marginRight: 0,
            borderRadius: 6,
            events: {
                beforePrint: function () {
                    this.oldhasUserSize = this.hasUserSize;
                    this.resetParams = [this.chartWidth, this.chartHeight, false];

                    this.setSize(1400, 1000, false);
                    this.exportSVGElements[0].box.hide();
                    this.exportSVGElements[1].hide();
                },
                afterPrint: function () {
                    this.setSize.apply(this, this.resetParams);
                    this.hasUserSize = this.oldhasUserSize;
                    this.exportSVGElements[0].box.show();
                    this.exportSVGElements[1].show();

                },
            }
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '{point.name}' +
                '<br/>Count : <b>{point.y}'
        },
        legend: {
            labelFormat: '{name} <span>{y}</span>',
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'middle',
            x: 15,
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false
                },
                showInLegend: {
                    enabled: true,
                }
            }
        },
        title: {
            text: '<span class="chartLabel">Campaign Status </span>',
            y: 15,
            x: -20,
        },
        subtitle: {
            text: '<p style="fill:#f26525">' + props.chartData.total + '</p><br /><span>Total</span>',
            align: 'center',
            verticalAlign: 'middle',
            style: {
                color: '#666666',
                fontSize: '15px',
                fill: '#666666'
            },
            y: 15,
            x: -40,
        },
        series: [{
            name: 'Total-Campaigns',
            size: '50%',
            innerSize: "70%",
            data: chartData
        }],
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: [
                        'printChart',
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadSVG',
                        {
                            text: 'DownloadXLSX',
                            onclick() {
                                this.downloadXLSX();
                            },
                        },
                        {
                            text: 'DownloadCSV',
                            onclick() {
                                this.getCSV();
                            },
                        },
                    ],
                    enabled: true
                },
            }
        },
    }
    return (
        <div className="chartContainer">
            <figure className="highcharts-figure">
                <p className="highcharts-description">
                    <svg onClick={() => viewFullScreen()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen custumeFullScreenBtn" viewBox="0 0 16 16">
                        <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                    </svg>
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
export default CampaignsStatus 