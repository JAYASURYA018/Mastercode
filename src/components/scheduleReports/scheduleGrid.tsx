import React, { Component } from "react";
import {
  Grid,
  GridColumn,
  GridPageChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import products from "./products.json";
import GridPaging from "../common/gridPagination";
import DeleteConfirmationPopup from "../common/deleteConfirmationPopup";
import { t } from "i18next";
import { IscheduleReports } from "../../interface/scheduleReports/IscheduleReports";
import _ from "underscore";
import { Switch } from "@progress/kendo-react-inputs";
import ApiConstants from "../../api-constants";
import ApiService from "../../services/api-manager";
import toastrmsg from "../../services/toaster-manager";
import moment from "moment";

interface Iprops {
  btnName?: string;
  onOpenPopup?: (event: any) => void;
  toggleDialog?: (event: any) => void;
  onEdit: any;
  sampleData: any;
  gridData: Array<IscheduleReports>;
  skip: number;
  loadTableDetails: any;
  onSortChange: (event: GridSortChangeEvent) => void;
  pageable: any;
  sortValue: any;
  onPageChange: (event: GridPageChangeEvent) => void;
  totalCount: number;
  take: number;
  sort?: any;
  searchFilter?: string;
  onSearch?: (event: any) => void;
}

interface Istate {
  error?: boolean;
  visible?: boolean;
  visit?: boolean;
  deletePopup: boolean;
  reportsData: any;
  data?: Array<any>;
  scheduleReportTotal?: number;
}

const defaultNs = {
  ns: ["camp", "sr", "bo", "common", "callstrategy", "aetools"],
};

class ScheduleReportsGrid extends Component<Iprops, Istate> {
  public sourceGridData?: Array<IscheduleReports>;
  state: Istate = {
    deletePopup: false,
    reportsData: undefined,
  };

  componentDidUpdate(prevProps: Readonly<Iprops>): void {
    if (prevProps.sampleData !== this.props.sampleData) {
      this.props.loadTableDetails();
    }
  }

  componentDidMount() {
    this.props.loadTableDetails();
  }

  opendeletepopup = (dataItem: Istate) => {
    this.setState({
      reportsData: dataItem,
      deletePopup: true,
    });
  };

  closedeletepopup = () => {
    this.setState({ deletePopup: false });
  };

  deleteschedulereport = () => {
    const list = this.state.data.filter((item) => {
      return item.ProductName !== this.state.reportsData.Name;
    });
    this.setState({ data: list });
    this.closedeletepopup();
  };

  onDelete = async () => {
    await ApiService.delete(
      ApiConstants.schedulereportDelete +
        "?ReportId=" +
        this.state.reportsData.id
    )
      .then((response) => {
        this.props.loadTableDetails();
        this.setState({
          deletePopup: false,
        });
        if (response == 1) {
          toastrmsg.toastMessage(
            t("archive.message.deletetable.success", defaultNs),
            "success"
          );
        } else if (response.data == 0) {
          toastrmsg.toastMessage(
            t("archive.message.delete.coretable", defaultNs),
            "error"
          );
        }
      })
      .catch(() => {
        toastrmsg.toastMessage(
          t("archive.message.error.deleteTable", defaultNs),
          "error"
        );
      });
  };

  myCustomDateCell = (props: any) => {
    if (props.dataItem[props.field] !== "") {
      return <td>{moment(props.dataItem[props.field]).format("hh:mm A")}</td>;
    }
    return <td>{props.dataItem[props.field]}</td>;
  };

  render() {
    return (
      <div>
        <Grid
          style={{ height: "650px", marginLeft: "15px", marginRight: "15px" }}
          data={this.props.gridData}
          skip={this.props.skip}
          take={this.props.take}
          pageSize={this.props.take}
          pageable={this.props.pageable}
          total={this.props.totalCount}
          sortable={{ allowUnsort: false }}
          sort={this.props.sortValue}
          onPageChange={this.props.onPageChange}
          onSortChange={this.props.onSortChange}
          pager={GridPaging}
        >
          <GridColumn
            className="nameField"
            field="reportId"
            title={t("sr.Name", defaultNs)}
            width="300px"
          />
          <GridColumn
            field="frequency"
            title={t("sr.Frequency", defaultNs)}
            width="250px"
          />
          <GridColumn
            field="reportName"
            title={t("sr.Report_Name", defaultNs)}
            width="250px"
          />
          <GridColumn
            field="reportStartTime"
            title={t("sr.Report_StartTime", defaultNs)}
            width="200px"
            cell={this.myCustomDateCell}
          />
          <GridColumn
            field="reportTime"
            title={t("sr.Report_Time", defaultNs)}
            width="250px"
            cell={this.myCustomDateCell}
          />
          <GridColumn
            field="Activate"
            title={t("sr.Activate", defaultNs)}
            cell={() => (
              <td>
                <Switch onLabel={"YES"} offLabel={"NO"} />
              </td>
            )}
          />

          <GridColumn
            field=""
            cell={(cellProps) => (
              <td>
                <span className="editDelete">
                  <i
                    className="far fa-edit editicon"
                    title="edit"
                    onClick={() => this.props.onEdit(cellProps.dataItem.id)}
                  ></i>
                </span>
                &nbsp;&nbsp;&nbsp;
                <span className="editDelete">
                  <i
                    className="far fa-trash-alt deleteIcon"
                    title="delete"
                    onClick={() => {
                      this.opendeletepopup(cellProps.dataItem);
                    }}
                  ></i>
                </span>
              </td>
            )}
            title={t("bo.Actions", defaultNs)}
          />
        </Grid>

        {this.state.deletePopup && (
          <DeleteConfirmationPopup
            titleContent={t("common.delete.selection", defaultNs)}
            contentName={this.state.reportsData.reportId}
            popUpCloseClick={this.closedeletepopup}
            description={t("schedule.delete.description", defaultNs)}
            iconClass={""}
            handleDeleteClick={() => this.onDelete()}
          />
        )}
      </div>
    );
  }
}

export default ScheduleReportsGrid;
