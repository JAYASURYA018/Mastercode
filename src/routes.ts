import React from "react";
import { ContactStrategy } from "./components/contactStrategy/contactStrategy";
// import { AddEditContactStrategy } from "./components/contactStrategy/addEditContactStrategy";
// import Test from "./components/contactStrategy/Test"
import MainTabStrip from "./components/archive/archive";
import Historical from "./components/historical/Historicalmainpage";
import DataExtract from "./components/dataExtract/DataExtract";
import ScheduleReports from "./components/scheduleReports/scheduleReports";
import archive from "./components/archive/archive";
import Archive from "./components/archive/archive";
const RealtimeReport = React.lazy(
  () => import("./components/reports/realtimeReport")
);

const routes = [
  {
    path: `${process.env.PUBLIC_URL}/contactStrategy`,
    name: "ContactStrategy",
    component: ContactStrategy,
  },
  { path: `${process.env.PUBLIC_URL}/`, exact: true, name: "" },
  { path: `${process.env.PUBLIC_URL}/home`, name: "Home" },
  {
    path: `${process.env.PUBLIC_URL}/reports/realtime`,
    name: "Realtime Report",
    component: RealtimeReport,
  },
  // {
  //     path: `${process.env.PUBLIC_URL}/aetools/purge-archive`,
  //     name: "PurgeArchive",
  //     component: Test
  // },
  {
    path: `${process.env.PUBLIC_URL}/aetools/purge-archive`,
    name: "PurgeArchive",
    component: Archive,
  },
  {
    path: `${process.env.PUBLIC_URL}/reports/historical`,
    name: "Historical",
    component: Historical,
  },
  {
    path: `${process.env.PUBLIC_URL}/reports/data-extraction`,
    name: "DataExtract",
    component: DataExtract,
  },
  {
    path: `${process.env.PUBLIC_URL}/reports/schedule-reports`,
    name: "ScheduleReport",
    component: ScheduleReports,
  },
];

export default routes;
