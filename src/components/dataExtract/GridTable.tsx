import {
  GridPageChangeEvent,
  GridSortChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { t } from "i18next";
import React, { Component } from "react";
import { Input } from "reactstrap";
import "./_dataExtract.scss";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import DeleteConfirmationPopup from "../common/deleteConfirmationPopup";

import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import jobHistoryData from "./JobHistory.json";
import GridPaging from "../common/gridPagination";
import _ from "underscore";

import { RootState } from "../../store/store";
import { Idataextract } from "../../interface/dataExtract/IdataExtract";
import { Switch } from "@progress/kendo-react-inputs/dist/npm/switch/Switch";
// import { v4 } from "uuid";
import { OverlayTrigger, Popover } from "react-bootstrap";

interface ISelecteCampProps {
  obj: any;
}

interface PageState {
  skip: number;
  take: number;
  sort?: any;
  searchFilter?: string;
  onSearch?: (event: any) => void;
}

// const initialDataState: PageState = { skip: 0, take: 5 };
// const initialSort: Array<SortDescriptor> = [{ field: "Type", dir: "asc" }];

const defaultNs = { ns: ["extractor"] };

interface Iprops {
  openAddEditContactStrategy: () => void;
  sampleData: Array<any>;
  onDelete: any;
  onEdit: any;
}

interface Istate {
  totalCount?: number;
  gridData?: Array<Idataextract>;
  error?: boolean;
  visible?: boolean;
  skip?: number;
  take?: number;
  sort?: any;
  dataExtractTotal?: number;
  pageable?: any;
  pageNumber?: number;
  searchFilter?: string;
  isPopupModeEnabled?: boolean;
  contactStrategyIndexPopover?: number;
}

class GridTable extends Component<Iprops, Istate> {
  public sourceGridData?: Array<Idataextract>;

  state: Istate = {
    // page: initialDataState,
    // sort: initialSort,
    // gridSearch: "",
    sort: [{ field: "name", dir: "asc" }],
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
    // dataExtractTotal: 0,
    // gridData: [],
  };

  //  componentDidMount() => void {
  //    this.loadTableDetails();
  // }

  componentDidMount(): void {
    this.loadTableDetails();
  }

  componentDidUpdate(prevProps: Readonly<Iprops>): void {
    if (prevProps.sampleData !== this.props.sampleData) {
      console.log("dddd");
      this.loadTableDetails();
    }
  }

  loadTableDetails = () => {
    if (this.props.sampleData) {
      this.sourceGridData = JSON.parse(JSON.stringify(this.props.sampleData));
      console.log("sourceGridData", this.sourceGridData);
      debugger;
      this.setState({
        // gridData: this.props.sampleData.slice(this.state.skip, this.state.take),
        gridData: this.sourceGridData.slice(
          this.state.skip,
          this.state.skip + this.state.take
        ),

        // dataExtractTotal: this.props.sampleData.length,
        dataExtractTotal: this.sourceGridData.length,
      });

      console.log("this.state.skip", this.state.skip, this.state.take);
    }
    console.log(this.state.gridData, "gridData");
    console.log(this.state.dataExtractTotal, "dataExtractTotal");
  };

  pageChange = (event: GridPageChangeEvent) => {
    let data: Array<Idataextract> = this.filterByValue(
      this.sourceGridData,

      this.state.searchFilter
    );

    //console.log(data);

    //console.log(this.state.sort, "sort");

    //console.log(event.page.skip, "skip");

    //console.log(event.page.take, "take");

    this.setState({
      skip: event.page.skip,

      take: event.page.take,

      gridData: orderBy(data, this.state.sort).slice(
        event.page.skip,

        event.page.skip + event.page.take
      ),

      dataExtractTotal: data.length,
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

      dataExtractTotal: data.length,
    });
  };

  filterByValue = (array: any, value: any) => {
    return _.filter(array, function (o: any) {
      return (
        o.dataExtractName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        o.editScheduleData.fileName.toString().indexOf(value.toString()) !== -1

        // o.recordsAffected.toLowerCase()?.indexOf(value.toLowerCase()) !== -1 ||

        // o.tablesAffected.toString()?.indexOf(value.toString()) !== -1
      );
    });
  };

  updateContactStrategyPopupIndex = (index?: number) => {
    this.state.isPopupModeEnabled =
      index !== this.state.contactStrategyIndexPopover ||
      (index === this.state.contactStrategyIndexPopover &&
        this.state.isPopupModeEnabled === false)
        ? true
        : false;
    this.setState({
      contactStrategyIndexPopover: index,
      isPopupModeEnabled: this.state.isPopupModeEnabled,
    });
  };

  render() {
    return (
      <>
        <GridToolbar>
          <div
            className="row"
            style={{
              //   marginRight: "0px",
              borderBottom: "1px solid #f2f2f2",
              width: "100%",
              height: "40px",
              marginLeft: "7px",
            }}
          >
            <div className="col-md-6"></div>
            <div className="col-md-6 text-right search-input">
              {/* <i className="icon-tool-search search-icon"></i> */}

              <span className="tableTile">
                <i
                  className="icon-tool-list list-icon p-2"
                  style={{ marginRight: "1px" }}
                ></i>
                <i
                  className="icon-tool-grid grid-icon p-2 "
                  style={{ marginRight: "15px" }}
                ></i>
                <img
                  src="./images/divider.png"
                  style={{ paddingBottom: "10px" }}
                />
              </span>
              <Input
                placeholder={t("common.grid.search.label", defaultNs)}
                id="ContactStrategy-Data-Filter"
                name="ContactStrategy-Data-Filter"
                aria-label={t("common.grid.search.label", defaultNs)}
                // value={searchState}
                onChange={(e) => this.onSearch(e)}
              />
              <button
                className="dataAddNewButton"
                onClick={() => this.props.openAddEditContactStrategy()}
              >
                + Add New
              </button>
              <span className="border-left">
                <a
                  href=""
                  id="Contact-Strategy-Help-Text"
                  title="Contact-Strategy-Help-Text"
                  className="help-btn"
                  aria-label="ContactStrategyHelpText"
                >
                  Help
                </a>
              </span>
            </div>
          </div>
        </GridToolbar>

        <>
          <Grid
            // data={sampleData}
            style={{ height: "620px", width: "100%" }}
            data={this.state.gridData}
            skip={this.state.skip}
            take={this.state.take}
            pageSize={this.state.take}
            pageable={this.state.pageable}
            total={this.state.dataExtractTotal}
            sortable={{ allowUnsort: false }}
            sort={this.state.sort}
            onPageChange={this.pageChange}
            onSortChange={this.sortChange}
            pager={GridPaging}
            // skip={this.state.page.skip}
            // take={this.state.page.take}
            // pageSize={this.state.page.take}
            // total={this.props.sampleData.length}
            // pageable={{
            //   buttonCount: 5,
            //   info: true,
            //   type: "numeric",
            //   pageSizes: true,
            //   previousNext: true,
            // }}
            // onPageChange={this.pageChange}
            // pager={GridPaging}
            // sortable={{ allowUnsort: false }}
            // onSortChange={this.onSortChange}
            // sort={this.state.sort}
            // data={orderBy(
            //   this.props.sampleData
            //     // .filter((a) => a.contactStrategyId.match(getRegex(searchState)))
            //     .slice(
            //       this.state.page.skip,
            //       this.state.page.take + this.state.page.skip
            //     ),
            //   this.state.sort
            // )}
          >
            <GridColumn
              title="Name"
              field="dataExtractName"
              className="gridName"
              width="420px"
            />
            <GridColumn title="Description" field="description" width="310px" />
            <GridColumn title="File Name" field="fileName" width="250px" />
            <GridColumn
              field="jobHistory"
              title="Job History"
              // width={this.setPercentage(15)}
              cell={(cellProps) =>
                cellProps.dataItem.jobHistory != 0 ? (
                  <td>
                    <button
                      onClick={() => {
                        this.updateContactStrategyPopupIndex(
                          cellProps.dataIndex
                        );
                      }}
                      id={"ContactStrategy-ModePopup" + cellProps.dataIndex}
                      name={"ContactStrategy-ModePopup" + cellProps.dataIndex}
                    >
                      <span>
                        {t("er.job.history", defaultNs)}
                        <span
                          className="dot"
                          style={{ color: "#FD7B38", margin: "5px" }}
                        >
                          •
                        </span>

                        <span>{jobHistoryData.length}</span>
                        <OverlayTrigger
                          show={
                            this.state.contactStrategyIndexPopover ===
                            cellProps.dataIndex
                              ? this.state.isPopupModeEnabled
                              : false
                          }
                          trigger="click"
                          placement="bottom-end"
                          overlay={
                            // <div className="popOverGrid">
                            <Popover
                              id={`popover-positioned-left`}
                              className="data-list-popover"
                              // style={{ width: "490px", height: "200px" }}
                            >
                              <div className="tooltip-body">
                                <Grid data={jobHistoryData}>
                                  <GridColumn
                                    field="startDateTime"
                                    title="Start Date & Time"
                                    width="140"
                                    className="jobHistoryTable"
                                  />
                                  <GridColumn
                                    field="endDateTime"
                                    title="End Date & Time"
                                    width="130"
                                    className="jobHistoryTable"
                                  />
                                  <GridColumn
                                    field="status"
                                    width="80"
                                    title="Status"
                                    className="jobHistoryTable"
                                  />
                                  <GridColumn
                                    field="noOfRecords"
                                    width="120"
                                    title="No of Records"
                                    className="jobHistoryTable"
                                  />
                                </Grid>
                              </div>
                            </Popover>
                            // </div>
                          }
                        >
                          <i className="icon-dropdown-chevron"></i>
                        </OverlayTrigger>
                      </span>
                    </button>
                  </td>
                ) : (
                  <td>
                    {" "}
                    <button disabled={true}>
                      {t("uc.modes", defaultNs)} <span className="dot">. </span>
                      <span>{cellProps.dataItem.jobHistory} </span>
                      <i className="icon-dropdown-chevron" />
                    </button>
                    {cellProps.dataItem.jobHistory != 0}
                  </td>
                )
              }
            />
            <GridColumn
              title="Activate"
              field=""
              cell={() => (
                <td>
                  <Switch onLabel={"YES"} offLabel={"NO"} />
                </td>
              )}
            />
            <GridColumn
              title="Actions"
              field=""
              cell={(cellProps) => (
                <td>
                  <button
                    id={`Save-CopyContactStrategyDialog` + cellProps.dataIndex}
                    name={
                      `Save-CopyContactStrategyDialog` + cellProps.dataIndex
                    }
                    // onClick={() => {
                    //   this.openCopyContactStrategyDialog(cellProps.dataItem);
                    // }}
                    onClick={() => this.props.onEdit(cellProps.dataItem.id)}
                  >
                    <i className="icon-tool-edit" title="edit"></i>
                  </button>
                  <button
                    id={
                      `Delete-CopyContactStrategyDialog` + cellProps.dataIndex
                    }
                    name={
                      `Delete-CopyContactStrategyDialog` + cellProps.dataIndex
                    }
                    onClick={() =>
                      this.props.onDelete(cellProps.dataItem.dataExtractName)
                    }
                  >
                    <i className="icon-tool-delete" title="Delete"></i>
                  </button>
                </td>
              )}
            />
          </Grid>
        </>

        {/* {isDeleteContactStrategy && (
          <DeleteConfirmationPopup
            titleContent={t("common.delete.selection", defaultNs)}
            iconClass="icon-contact-strategy"
            description={t("callstrategy.action.delete.confirm", defaultNs)}
            contentName={"data extract"}
            popUpCloseClick={closeDeleteContactStrategyDialog}
            // handleDeleteClick={deleteContactStrategy}
            cancelAriaLabel="cancel-Delete contact strategy"
            cancelId="cancel-Deletecontactstrategy"
            cancelName="cancel-Deletecontactstrategy"
            deleteAriaLabel="Delete-contact strategy"
            deleteId="Delete-Deletecontactstrategy"
            deleteName="Delete-Deletecontactstrategy"
          />
        )} */}
      </>
    );
  }
}

export default GridTable;
