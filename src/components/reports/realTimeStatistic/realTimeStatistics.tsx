import React, { useEffect, useState } from "react";
import "../realTimeStatistic/_realTimeStatistics.scss"
import ApiService from "../../../services/api-manager";
import ApiConstants from "../../../api-constants";
import CampaignsStatus from "./campaignsStatus";
import UploadStatus from "./uploadStatus";

export interface realTimeStatisticProps {
    activeContacts?: (null)[] | null;
    businessOutcomeReport?: (null)[] | null;
    telephonyOutcomeReport?: (null)[] | null;
    targetValueByCampaign?: (null)[] | null;
    campaignAgentContactProcessed?: (null)[] | null;
    campaignDeliveredReport?: (null)[] | null;
    campaignWiseSuccessRatio?: (null)[] | null;
    contactBasedOnModes?: (ContactBasedOnModesEntity)[] | null;
    contactBasedOnModesLabel?: (string)[] | null;
    contactBasedOnModesData?: (number)[] | null;
    contactStatusReportData?: (ContactStatusReportDataEntity)[] | null;
    contactStrategyDetails?: (null)[] | null;
    contactSuccessRatioForAgents?: (ContactSuccessRatioForAgentsEntity)[] | null;
    cssDetails?: (null)[] | null;
    campaignDetails: CampaignDetailsChart;
    contactDetails: ContactDetails;
    activeAgents?: (null)[] | null;
    twilioAgentsModels?: (null)[] | null;
    twilioAgentDetails: TwilioAgentDetails;
}
export interface ContactBasedOnModesEntity {
    label: string;
    backgroundColor?: null;
    borderColor?: null;
    pointBackgroundColor?: null;
    pointBorderColor?: null;
    pointHoverBackgroundColor?: null;
    pointHoverBorderColor?: null;
    data: number;
}
export interface ContactStatusReportDataEntity {
    campaignName: string;
    x: string;
    y: string;
    z: string;
}
export interface ContactSuccessRatioForAgentsEntity {
    key: string;
    values?: (ValuesEntity | null)[] | null;
    bar?: string | null;
}
export interface ValuesEntity {
    key: string;
    value: number;
}
export interface CampaignDetailsChart {
    active: number;
    total: number;
    inActive: number;
    elapsed: number;
}
export interface ContactDetails {
    totalContacts: number;
    open: number;
    fresh: number;
    schedule: number;
    closed: number;
    others: number;
    contactDialed: number;
    contactDialedForDay: number;
    contactDialedPercentage: number;
    contactConnected: number;
    contactConnectedPercentage: number;
    contactConnectedForDay: number;
    callsDialed: number;
    callsRatio: number;
    callsConnected: number;
    callsConnectedPercentage: number;
    callsConnectedForDay: number;
    callAbandoned: number;
    callAbandonedPercentage: string;
    contactsProcessed: number;
    contactsUploaded: number;
    contactsUploadedSuccess: number;
    contactsUploadedFailure: number;
    contactsUploadedDuplicate: number;
    myProperty: number;
    agentHandleTime: string;
    successContacts: number;
    successContactsPercentage: number;
    attemptsPercentage: number;
    businessSuccessContacts: number;
    totalTelephonySuccessContacts: number;
    totalAnsweringMachineCalls: number;
    liveCalls: number;
    agentInCall: number;
    agentACW: number;
    agentNotReady: number;
    agentIdle: number;
    agentOutbound: number;
    agentTotal: number;
}
export interface TwilioAgentDetails {
    totalAgents: number;
    idle: number;
    inCall: number;
    notReady: number;
    acw: number;
}

export interface nameValueEntity {
    name: string;
    y: number;
}

const RealTimeStatistics = () => {
   // const [setWidgetContentData] = useState<any[]>([]);
    const [widgetContentInfo, setWidgetContentInfo] = useState<realTimeStatisticProps>(null);
    const [visible, setVisible] = React.useState(true);

    useEffect(() => {
        getALLWidgetData()
        setVisible(true)
    }, [])

    const getALLWidgetData = () => {
     //   let widgetList: string[] = [];
        const params = {
            reportParameter: {
                userId: 1,
                globalListId: "-1",
                campaignId: "93,123,37,38,305,1609,51,52,308,294,606,607,624,625,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,626,627,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,628,629,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,630,631,864,865,866,867,868,869,870,871,872,873,874,875,876,877,878,879,880,881,882,883,632,633,884,885,886,887,888,889,890,891,892,893,894,895,896,897,898,899,900,901,902,903,634,635,904,905,906,907,908,909,910,911,912,913,914,915,916,917,918,919,920,921,922,923,636,637,924,925,926,927,928,929,930,931,932,933,934,935,936,937,938,939,940,941,942,943,638,639,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,640,641,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,980,981,982,983,642,643,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,999,1000,1001,1002,1003,608,609,644,645,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,646,647,1024,1025,1026,1027,1028,1029,1030,1031,1032,1033,1034,1035,1036,1037,1038,1039,1040,1041,99,197,98,196,1042,1043,648,649,1044,1045,1046,1047,1048,1049,1050,1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,1061,1062,1063,650,651,1064,1065,1066,1067,1068,1069,1070,1071,1072,1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1083,652,653,1084,1085,1086,1087,1088,1089,1090,1091,1092,1093,1094,1095,1096,1097,1098,1099,1100,1101,1102,1103,654,655,1104,1105,1106,1107,1108,1109,1110,1111,1112,1113,1114,1115,1116,1117,1118,1119,1120,1121,1122,1123,656,657,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1134,1135,1136,1137,1138,1139,1140,1141,1142,1143,658,659,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155,1156,1157,1158,1159,1160,1161,1162,1163,660,661,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,662,663,1184,1185,1186,1187,1188,1189,1190,1191,15,1192,1193,1194,1195,1196,1197,1198,1199,1200,1201,1202,1203,610,611,664,665,1204,1205,1206,1207,1208,1209,1210,1211,1212,1213,1214,1215,1216,1217,1218,1219,1220,1221,1222,1223,666,667,1224,1225,1226,1227,1228,1229,1230,1231,1232,1233,1234,1235,1236,1237,1238,1239,1240,1241,1242,1243,668,669,1244,1245,1246,1247,1248,1249,1250,1251,1252,1253,1254,1255,1256,1257,1258,1259,1260,1261,1262,1263,670,671,1264,1265,1266,1267,1268,1269,1270,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1281,1282,1283,672,673,1284,1285,1286,1287,1288,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,674,675,1304,1305,1306,1307,1308,1309,1310,1311,1312,1313,1314,1315,1316,1317,1318,1319,1320,1321,1322,1323,676,677,1324,1325,1326,1327,1328,1329,1330,1331,1332,1333,1334,1335,1336,1337,1338,1339,1340,1341,1342,1343,678,679,1344,1345,1346,1347,1348,1349,1350,1351,1352,1353,1354,1355,1356,1357,1358,1359,1360,1361,1362,1363,680,681,1364,1365,1366,1367,1368,1369,1370,1371,1372,1373,1374,1375,1376,1377,1378,1379,1380,1381,1382,1383,682,683,1384,1385,1386,1387,1388,1389,1390,1391,1392,1393,1394,1395,1396,1397,1398,1399,1400,1401,1402,1403,612,613,684,685,1404,1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1419,1420,1421,1422,1423,686,687,1424,1425,1426,1427,1428,1429,1430,1431,1432,1433,1434,1435,1436,1437,1438,1439,1440,1441,1442,1443,688,689,1444,1445,1446,1447,1448,1449,1450,1451,1452,1453,1454,1455,1456,1457,1458,1459,1460,1461,1462,1463,690,691,1464,1465,1466,1467,1468,1469,1470,1471,1472,1473,1474,1475,1476,1477,1478,1479,1480,1481,1482,1483,692,693,1484,1485,1486,1487,1488,1489,1490,1491,1492,1493,1494,1495,1496,1497,1498,1499,1500,1501,1502,1503,694,695,1504,1505,1506,1507,1508,1509,1510,1511,1512,1513,1514,1515,1516,1517,1518,1519,1520,1521,1522,1523,696,697,1524,1525,1526,1527,1528,1529,1530,1531,1532,1533,1534,1535,1536,1537,1538,1539,1540,1541,1542,1543,698,699,1544,1545,1546,1547,1548,1549,1550,1551,1552,1553,1554,1555,1556,1557,1558,1559,1560,1561,1562,1563,700,701,1564,1565,1566,1567,1568,1569,1570,1571,1572,1573,1574,1575,1576,1577,1578,1579,1580,1581,1582,1583,702,703,1584,1585,1586,1587,1588,1589,1590,1591,1592,1593,1594,1595,1596,1597,1598,1599,1600,1601,1602,1603,614,615,704,705,1604,1605,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,616,617,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,618,619,744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,620,621,764,765,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,186,622,623,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,19,238,140,141,178,108,229,228,57,232,95,94,190,23,2,187,110,188,189,192,193,14,179,200,208,299,297,296,298,180,1619,1620,137,310,198,24,25,1625,4,226,271,273,279,272,275,280,202,138,203,36,86,177,1610,283,289,231,109,1623,1614,182,183,16,1626,1606,209,199,195,303,206,225,1612,1613,1617,3,253,12,11,78,201,251,17,184,185,252,13,254,35,311,230,210,213,214,211,212,309,100,102,277,268,1624,1,107,1627,10,46,169,292,26,244,307,1618,87,103,104,1611,1621,1622,291,218,1607,301,227,9,290,204,97,191,194,205,1615,215,1616,216,56,207",
                campaignGroup: "-1",
                listId: "-1",
                cssGroupName: "-1",
                cssConditionID: "-1",
                campaignTimeZone: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
                startDate: "03/03/2019 12:00:00 AM",
                endDate: "04/03/2019 12:00:00 AM",
                type: "string",
                isTimezoneRequiredForFilter: true,
                isChainingListIncluded: true
            },
            widgetInformation: {
                showTelephonyChart: true,
                showBusinessChart: true,
                showLineWithBarChart: true,
                showContactStatusChart: true,
                showContactSuccess: true,
                showTargetChart: true,
                showCSDrillDown: true,
                showCssDrillDown: true,
                showDialedModes: true,
                showCampaignDelivered: true,
                showContactGrid: true,
                showAgentGrid: true,
                showTwilioAgents: true,
                showRealTimeStatistics: true,
                showCustomWidget1: true,
                showCustomWidget2: true,
                showCustomWidget3: true
            }
        }
        ApiService.post(ApiConstants.widgetContentData, params).then(data => {
           // widgetList.push(data)
            setWidgetContentInfo(data)
        })
    }

    return (


        <>
            {widgetContentInfo &&
                <>
                    {visible &&
                        // <><Window className="windows" title={"Real Time Statistics "} left={position.left} top={position.top} width={position.width} height={position.height}  onResize={handleResize} onClose={toggleDialog}>
                        <div className="fluid-container realTimeStatestics">
                            <div className="d-flex justify-content-center row">
                                <div className="upperCard">
                                    <div className="contentDiv">
                                        <label className="countTitle">Performance</label>
                                        <div className="count">
                                            <span>{widgetContentInfo.contactDetails.contactDialedPercentage} % </span>
                                        </div>
                                        <div className="countFooter">
                                            <p> Processed: {widgetContentInfo.contactDetails.contactDialed} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="upperCard">
                                    <div className="contentDiv">
                                        <label className="countTitle">Business Performance</label>
                                        <div className="count">
                                            <span>{widgetContentInfo.contactDetails.successContactsPercentage} %</span>
                                        </div>
                                        <div className="countFooter">
                                            <p>  Success:{widgetContentInfo.contactDetails.businessSuccessContacts}  </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="upperCard">
                                    <div className="contentDiv">
                                        <label className="countTitle">Attempts</label>
                                        <div className="count">
                                            <span>{widgetContentInfo.contactDetails.attemptsPercentage} % </span>
                                        </div>
                                        <div className="countFooter">
                                            <p> Attempts:{widgetContentInfo.contactDetails.callsDialed}</p>

                                        </div>
                                    </div>
                                </div>

                                <div className="upperCard">
                                    <div className="contentDiv">
                                        <label className="countTitle">Connected</label>
                                        <div className="count">
                                            <span>{widgetContentInfo.contactDetails.callsConnectedPercentage}</span>
                                        </div>
                                        <div className="countFooter">

                                            <p>Abandoned:{widgetContentInfo.contactDetails.callsConnected}</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="upperCard">
                                    <div className="contentDiv">
                                        <label className="countTitle">Calls Abandon</label>
                                        <div className="count">
                                            <span>{widgetContentInfo.contactDetails.callAbandonedPercentage} % </span>

                                        </div>
                                        <div className="countFooter">

                                            <p>Abandoned:{widgetContentInfo.contactDetails.callAbandoned}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center row">
                                <div className="secondRowCards contactStatus">
                                    <div className="contentDiv">
                                        <label className="countTitle">Total Contacts</label>
                                        <div className="row totalContactsCount my-2">
                                            <div className="col-md-4 border-right border-bottom">
                                                <p className="mb-1">{widgetContentInfo.contactDetails.totalContacts}</p>
                                                <label>Total</label>
                                            </div>
                                            <div className="col-md-4 border-right border-bottom">
                                                <p className="mb-1">{widgetContentInfo.contactDetails.open}</p>
                                                <label>Open</label>
                                            </div>
                                            <div className="col-md-4 border-right border-bottom">
                                                <p className="mb-1">{widgetContentInfo.contactDetails.fresh}</p>
                                                <label>Fresh</label>
                                            </div>
                                            <div className="col-md-4 border-right">
                                                <p className="mb-1">{widgetContentInfo.contactDetails.schedule}</p>
                                                <label>Reschedule</label>
                                            </div>
                                            <div className="col-md-4 border-right">
                                                <p className="mb-1">{widgetContentInfo.contactDetails.closed}</p>
                                                <label>Closed</label>
                                            </div>
                                            <div className="col-md-4 border-right">
                                                <p className="mb-1">{widgetContentInfo.contactDetails.others}</p>
                                                <label>Others</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="secondRowCards ahtAndChart">
                                    <div className="contentDiv">
                                        <label className="countTitle mb-3">AHT (HH:MM:SS)</label>
                                        <label className="countTitle mb-3">Average Handle Time</label>
                                        <div className="count">
                                            <span>{widgetContentInfo.contactDetails.agentHandleTime}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="secondRowCards ahtAndChart">
                                    {(widgetContentInfo.contactDetails.contactsUploadedSuccess == 0 || widgetContentInfo.contactDetails.contactsUploadedFailure === 0 || widgetContentInfo.contactDetails.contactsUploadedDuplicate === 0) ?
                                        <div className="contentDiv">
                                            <label className="countTitle mb-3">Upload Status</label>
                                            <label className="noData">No Data...</label>
                                        </div> :
                                        <UploadStatus
                                            total={widgetContentInfo.contactDetails.contactsProcessed}
                                            success={widgetContentInfo.contactDetails.contactsUploadedSuccess}
                                            failure={widgetContentInfo.contactDetails.contactsUploadedFailure}
                                            duplicate={widgetContentInfo.contactDetails.contactsUploadedDuplicate} />
                                    }
                                </div>

                                <div className="secondRowCards ahtAndChart">
                                    <CampaignsStatus chartData={widgetContentInfo.campaignDetails} />
                                </div>
                            </div>
                        </div>
                        // </Window>
                        // </>
                    }
                </>
            }
        </>
    )
}
export default RealTimeStatistics