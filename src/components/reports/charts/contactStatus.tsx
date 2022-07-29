import React, { useRef } from "react";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
// import "./highChart.scss";

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}
const ContactStatus = (props: HighchartsReact.Props) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    let responseData = [
        {
            "campaignName": "Appointment_Notification_SMS", "x": "0", "y": "0", "z": "7"
        },
        {
            "campaignName": "Appt_Not_SMS_Automation", "x": "0", "y": "0", "z": "26"
        },
        {
            "campaignName": "CC collections-email", "x": "0", "y": "0", "z": "8"
        },
        {
            "campaignName": "CC Email collections", "x": "0", "y": "1", "z": "38"
        },
        {
            "campaignName": "CC_QBR_Camp", "x": "1800", "y": "0", "z": "19000"
        },
        {
            "campaignName": "CC_Winback", "x": "1800", "y": "0", "z": "19000"
        },
        {
            "campaignName": "CC-Debits_CL", "x": "1800", "y": "0", "z": "0"
        },
        {
            "campaignName": "Collection_Automation1", "x": "0", "y": "0", "z": "36"
        },
        {
            "campaignName": "Collection_Predictive", "x": "0", "y": "0", "z": "1"
        },
        {
            "campaignName": "Collection_Progressive", "x": "0", "y": "0", "z": "1"
        },
        {
            "campaignName": "Collections", "x": "0", "y": "0", "z": "6"
        },
        {
            "campaignName": "Collections_loan", "x": "0", "y": "0", "z": "4"
        },
        {
            "campaignName": "Collections_loan_CSR", "x": "0", "y": "0", "z": "4"
        },
        {
            "campaignName": "Credit_Card_Campaign", "x": "6", "y": "0", "z": "0"
        },
        {
            "campaignName": "CRM Campaign", "x": "2", "y": "0", "z": "23"
        },
        {
            "campaignName": "Housing Loan", "x": "7", "y": "0", "z": "0"
        },
        {
            "campaignName": "Kyc_Update", "x": "7", "y": "0", "z": "0"
        },
        {
            "campaignName": "Payment_Reminder_Email", "x": "0", "y": "0", "z": "52"
        },
        {
            "campaignName": "Payment_Reminders_SMS", "x": "0", "y": "0", "z": "6"
        },
        {
            "campaignName": "Salesforce_CRMAdapter", "x": "0", "y": "1", "z": "12"
        },
        {
            "campaignName": "Test_Twilio_IVR", "x": "1", "y": "0", "z": "0"
        }
    ]
    let data = [
        { campaignName: "Appointment_Notification_SMS", x: "0", y: "0", z: "7" },
        { campaignName: "Appt_Not_SMS_Automation", x: "0", y: "0", z: "26" },
        { campaignName: "CC collections-email", x: "0", y: "0", z: "8" },
        { campaignName: "CC Email collections", x: "0", y: "1", z: "38" },
        { campaignName: "CC_QBR_Camp", x: "1800", y: "0", z: "19000" },
        { campaignName: "CC_Winback", x: "1800", y: "0", z: "19000" },
        { campaignName: "CC-Debits_CL", x: "1800", y: "0", z: "0" },
        { campaignName: "Collection_Automation1", x: "0", y: "0", z: "36" },
        { campaignName: "Collection_Loan_V", x: "3", y: "0", z: "2" },
        { campaignName: "Collection_Predictive", x: "0", y: "0", z: "1" },
        { campaignName: "Collection_Progressive", x: "0", y: "0", z: "1" },
        { campaignName: "Collections", x: "0", y: "0", z: "6" },
        { campaignName: "Collections_loan", x: "0", y: "0", z: "4" },
        { campaignName: "Collections_loan_CSR", x: "0", y: "0", z: "4" },
        { campaignName: "Credit_Card_Campaign", x: "6", y: "0", z: "0" },
        { campaignName: "CRM Campaign", x: "4", y: "0", z: "24" },
        { campaignName: "Housing Loan", x: "7", y: "0", z: "0" },
        { campaignName: "Kyc_Update", x: "7", y: "0", z: "0" },
        { campaignName: "Payment_Reminder_Email", x: "0", y: "0", z: "52" },
        { campaignName: "Payment_Reminders_SMS", x: "0", y: "0", z: "6" },
        { campaignName: "Salesforce_CRMAdapter", x: "0", y: "1", z: "12" },
        { campaignName: "Test_Twilio_IVR", x: "1", y: "0", z: "0" }
    ]
    const filterData = (getData) => {
        let newArray = [];
        getData.map((item) => {
            newArray.push([item.campaignName, parseInt(item.z)])
        })
        return newArray
    }
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Contact Status'
        },
        xAxis: {
            type: 'category',
            title: {
                text: 'Campaign(s)'
            },
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Contacts'
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
        },

        series: [{
            name: "Fresh",
            data: filterData(responseData),
            color: '#FC751A',
            dataLabels: {
                enabled: true,
                align: 'right',
                style: {
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: 'gray',
                    textOutline: '1px contrast',
                    fontFamily: 'roboto',
                }
            }
        },
        {
            name: "Reschedule",
            data: filterData(data),
            color: '#01B8AA'
        },
        {
            name: "Closed",
            color: '#FC615D'
        }
        ]
    }

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
export default ContactStatus