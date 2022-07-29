import * as React from "react";

import {
  Grid,
  GridColumn as Column,
  GridDetailRow,
  GridExpandChangeEvent,
  GridPageChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { IprocessMonitoringGrid } from "../../interface/archive/IprocessMonitoringGrid";

import GridPaging from "../common/gridPagination";
import ApiService from "../../services/api-manager";
import ApiConstants from "../../api-constants";
import { Input } from "reactstrap";
import { t } from "i18next";
import "./_archive.scss";

import { orderBy } from "@progress/kendo-data-query";
import _ from "underscore";
import moment from "moment";

interface IState {
  totalCount?: number;
  gridData?: Array<IprocessMonitoringGrid>;
  error?: boolean;
  visible?: boolean;
  skip?: number;
  take?: number;
  sort?: any;
  processMonitoringTotal?: number;
  pageable?: any;
  pageNumber?: number;
  searchFilter?: string;
  Iteration?: number;
  detailTable?: any;
}

class DetailComponent extends GridDetailRow {
  myCustomDateCell = (props) => {
    if (props.dataItem[props.field] !== "") {
      return (
        <td>
          {moment(props.dataItem[props.field]).format("MM/DD/YYYY h:mm A")}
        </td>
      );
    }
    return <td>{props.dataItem[props.field]}</td>;
  };
  myCustostatusCell = (props) => {
    const statusvalue = props.dataItem.status === "S" ? "Success" : "Failed";

    if (props.dataItem[props.field] !== "") {
      return (
        <td>
          {props.dataItem[props.field]} {statusvalue}
        </td>
      );
    }
  };

  render() {
    const data = this.props.dataItem.childdata;

    if (data) {
      return (
        <Grid data={data} style={{ width: "80%" }} className="container">
          <Column
            field="tableName"
            title="Table Name"
            width="270px"
            className="heading"
          />
          <Column
            field="iterationStartTime"
            title="Execution Start Time"
            cell={this.myCustomDateCell}
          />
          <Column
            field="iterationEndTime"
            title="Execution End Time"
            cell={this.myCustomDateCell}
          />
          <Column field="records" title="Records Affected" />
          <Column title="Status" cell={this.myCustostatusCell} />
        </Grid>
      );
    }
    return (
      <div style={{ height: "50px", width: "100%" }}>
        <div style={{ position: "absolute", width: "100%" }}>
          <div className="k-loading-image" />
        </div>
      </div>
    );
  }
}

const defaultNs = { ns: ["camp", "common", "callstrategy"] };

class ProcessMonitoringGrid extends React.Component {
  public sourceGridData?: Array<IprocessMonitoringGrid>;

  state: IState = {
    sort: [{ field: "tableType", dir: "asc" }],
    skip: 0,
    take: 10,
    pageNumber: 1,
    searchFilter: "",
    pageable: {
      buttonCount: 5,
      info: true,
      type: "numeric",
      pageSizes: true,
      previousNext: true,
    },
    Iteration: 0,
    detailTable: "",
  };

  constructor(props: any) {
    super(props);
  }

  expandChange = (event: GridExpandChangeEvent) => {
    event.dataItem.expanded = event.value;
    let iteration = event.dataItem.iteration;
    let tableType = event.dataItem.tableType;
    console.log("iteration", iteration);
    console.log("tableType", tableType);
    this.setState({ ...this.state });

    if (!event.value || event.dataItem.details) {
      return;
    }

    ApiService.getAll(
      ApiConstants.detailTable +
        "?" +
        "Iteration" +
        "=" +
        iteration +
        "&" +
        "TableType" +
        "=" +
        tableType
    )
      .then((response) => {
        let data: any = this.state.gridData.slice();
        console.log("expanddataa", data);
        let index = data.findIndex((d: any) => d.iteration === iteration);
        data[index].childdata = response;
        console.log(" data[index].details", data[index].childdata);
        console.log(" json.value", response);
        this.setState({ gridData: data });
        this.setState({ detailTable: data });
        console.log("getDetailTable", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  async componentDidMount() {
    await this.loadTableDetails();
  }

  loadTableDetails = async () => {
    await ApiService.getAll(ApiConstants.pocessmonotoring)
      .then((response) => {
        console.log("pocessmonitoring", response);

        if (response) {
          this.setState({ Iteration: response.iteration });

          this.sourceGridData = response;
          this.setState({
            gridData: response.slice(this.state.skip, this.state.take),
            processMonitoringTotal: response.length,
          });
        }
      })
      .catch((error) => {});
  };
  pageChange = (event: GridPageChangeEvent) => {
    let data: Array<IprocessMonitoringGrid> = this.filterByValue(
      this.sourceGridData,
      (this.state.searchFilter = "")
    );
    console.log(data);

    console.log(this.state.sort, "sort");

    console.log(event.page.skip, "skip");

    console.log(event.page.take, "take");

    this.setState({
      skip: event.page.skip,
      take: event.page.take,
      gridData: orderBy(data, this.state.sort).slice(
        event.page.skip,
        event.page.skip + event.page.take
      ),

      processMonitoringTotal: data.length,
    });
  };

  sortChange = (e: GridSortChangeEvent) => {
    this.setState({
      sort: e.sort,
      gridData: orderBy(
        this.filterByValue(this.sourceGridData, this.state.searchFilter),
        e.sort
      ).slice(this.state.skip, this.state.skip + this.state.take),
    });
  };

  onSearch = (e: any) => {
    let data = this.filterByValue(this.sourceGridData, e.target.value);
    this.setState({
      searchFilter: e.target.value,
      gridData: data.slice(this.state.skip, this.state.skip + this.state.take),
      processMonitoringTotal: data.length,
    });
  };

  filterByValue = (array: any, value: any) => {
    return _.filter(array, function (o: any) {
      return (
        o.tableType?.toLowerCase().indexOf(value?.toLowerCase()) !== -1 ||
        o.status?.toString().indexOf(value?.toString()) !== -1
      );
    });
  };

  myCustomDateCell = (props) => {
    if (props.dataItem[props.field] !== "") {
      return (
        <td>
          {moment(props.dataItem[props.field]).format("MM/DD/YYYY h:mm A")}
        </td>
      );
    }
    return <td>{props.dataItem[props.field]}</td>;
  };

  myCustostatusCell = (props) => {
    const statusvalue = props.dataItem.status === "S" ? "Success" : "Failed";

    if (props.dataItem[props.field] !== "") {
      return (
        <td>
          {props.dataItem[props.field]} {statusvalue}
        </td>
      );
    }
  };
  render() {
    return (
      <div className="innerContainer ">
        <div>
          <div className="gridtoolbar">
            <div></div>
            <div className="d-flex grid">
              <i className="icon-tool-list list-icon p-2"></i>
              <i className="icon-tool-grid grid-icon p-2"></i>

              <span className="border-right pr-16 mr-3 divider"></span>
              <i className="icon-tool-search search-tool"></i>
              <Input
                placeholder={t("common.grid.search.label", defaultNs)}
                id="ContactStrategy-Data-Filter"
                name="ContactStrategy-Data-Filter"
                aria-label={t("common.grid.search.label", defaultNs)}
                value={this.state.searchFilter}
                onChange={(e) => this.onSearch(e)}
                className="search-filter"
              />

              <span className="border-right pr-16 mr-3 divider"></span>
              <span
                aria-label={t("common.help", defaultNs)}
                className="help-text"
              >
                Help
              </span>
            </div>
          </div>
        </div>

        <Grid
          style={{ height: "610px" }}
          detail={DetailComponent}
          expandField="expanded"
          onExpandChange={this.expandChange}
          data={this.state.gridData}
          skip={this.state.skip}
          take={this.state.take}
          pageSize={this.state.take}
          pageable={this.state.pageable}
          total={this.state.processMonitoringTotal}
          sortable={{ allowUnsort: false }}
          sort={this.state.sort}
          onPageChange={this.pageChange}
          onSortChange={this.sortChange}
          pager={GridPaging}
        >
          <Column field="tableType" title="Type" />
          <Column
            field="iterationStartTime"
            title="Activity Start Time"
            cell={this.myCustomDateCell}
          />
          <Column
            field="iterationEndTime"
            title="Activity End Time"
            cell={this.myCustomDateCell}
          />
          <Column cell={this.myCustostatusCell} title="Status" />
          <Column field="tables" title="Tables Affected" />
          <Column field="records" title="Records Affected" />
        </Grid>
      </div>
    );
  }
}

export default ProcessMonitoringGrid;
