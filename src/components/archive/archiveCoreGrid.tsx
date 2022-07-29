import * as React from "react";
import {
  Grid,
  GridColumn as Column,
  GridPageChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { t } from "i18next";
import "./archiveTableGroups";
import ApiService from "../../services/api-manager";
import ApiConstants from "../../api-constants";
import GridPaging from "../common/gridPagination";

import DeleteConfirmationPopup from "../common/deleteConfirmationPopup";
import toastrmsg from "../../services/toaster-manager";
import { GridCellProps, GridItemChangeEvent } from "@progress/kendo-react-grid";

import { Switch } from "@progress/kendo-react-inputs";
import { SlideCtrl } from "../common/sliderCtrl";
import { Input } from "reactstrap";
import { tablegroups } from "../../interface/archive/ItableGroups";
import _ from "underscore";
const defaultNs: any = { ns: ["aetools", "common", "camp"] };
interface Iprops {
  gridData: any;
  enterEdit: (dataItem?: any) => void;
  updatecode: (dataItem: any) => void;
  cancel: (dataItem: any) => void;
  onPageChange: (event: GridPageChangeEvent) => void;
  onSortChange: (event: GridSortChangeEvent) => void;
  totalCount: number;
  pageable: any;
  skip: number;
  take: number;
  sortValue: any;
  searchFilter?: string;
  Coretableapi: () => Promise<any>;
  onSearch?: (event: any) => void;
  updateStateForSliderGrid?: (event?: any, field?: string, props?: any) => void;
  updateStateForSwitch?: (event?: any, field?: string, props?: any) => void;
  telephonyOutcomeRowClick?: (dataItem: any) => void;
  telephonyOutcomeItemChange?: (event?: GridItemChangeEvent) => void;
  CoretableSourceGridData: () => Promise<any>;
}
interface Istate {
  id?: number;
  gridData?: Array<tablegroups>;
  error?: boolean;
  visible?: boolean;
  skip?: number;
  take?: number;
  sort?: any;
  tableGroupsTotal?: number;
  pageable?: any;
  pageNumber?: number;
  searchFilter?: string;
  isDeleteTableGroup?: boolean;
  selectedTableGroup?: any;
  tablelist?: any;
  inEdit?: boolean;
}
class ArchiveCoreGrid extends React.Component<Iprops> {
  public sourceGridData?: Array<tablegroups>;
  state: Istate = {
    sort: [{ field: "tableName", dir: "asc" }],
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
    isDeleteTableGroup: false,
    selectedTableGroup: undefined,
  };
  componentDidMount() {
    this.props.CoretableSourceGridData();
  }
  openDeleteTableDialog = (dataItem?: Istate) => {
    console.log(dataItem.id);

    this.setState({
      selectedTableGroup: dataItem,
      isDeleteTableGroup: true,
    });
  };
  closeDeleteTableDialog = () => {
    this.setState({
      isDeleteTableGroup: false,
    });
  };
  coretableList = () => {
    this.setState({
      isDeleteTableGroup: false,
    });
    ApiService.delete(
      ApiConstants.coretabledeleteapi +
        "?tableId=" +
        this.state.selectedTableGroup.id
    )
      .then((response) => {
        console.log(response);

        this.props.Coretableapi();
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
  findParent = (el?: any) => {
    if (el?.tagName === "BODY") return false;
    if (el?.parentElement?.className?.indexOf("k-grid-table") > -1) return true;
    return el?.parentElement != null ? findParent(el?.parentElement) : true;
  };
  onChangeGridColumn = (event: any, onChangeGridColumnProps: any) => {
    if (onChangeGridColumnProps.field === "isArchive") {
      this.props.updateStateForSwitch(
        event,
        "isArchive",
        onChangeGridColumnProps
      );
    } else if (onChangeGridColumnProps.field === "isPurge") {
      this.props.updateStateForSwitch(
        event,
        "isPurge",
        onChangeGridColumnProps
      );
    } else if (onChangeGridColumnProps.field === "isArchiveDBPurge") {
      this.props.updateStateForSwitch(
        event,
        "isArchiveDBPurge",
        onChangeGridColumnProps
      );
    }
  };
  archiveColumn = (cellProps: GridCellProps) => {
    const { dataItem } = cellProps;
    return (
      <td>
        {dataItem.inEdit ? (
          <Switch
            id={"isArchive-" + cellProps.dataIndex}
            name={"isArchive-" + cellProps.dataIndex}
            ariaLabelledBy={"isArchive-" + cellProps.dataIndex}
            checked={cellProps.dataItem.isArchive}
            onLabel={"ON"}
            offLabel={"OFF"}
            onChange={(event) => this.onChangeGridColumn(event, cellProps)}
          />
        ) : dataItem.isArchive == true ? (
          "true"
        ) : (
          "false"
        )}
      </td>
    );
  };
  purgeColumn = (purgeColumnProps: GridCellProps) => {
    const { dataItem } = purgeColumnProps;
    return (
      <td>
        {dataItem.inEdit ? (
          <Switch
            id={"isPurge-" + purgeColumnProps.dataIndex}
            name={"isPurge-" + purgeColumnProps.dataIndex}
            ariaLabelledBy={"isPurge-" + purgeColumnProps.dataIndex}
            checked={dataItem.isPurge}
            disabled={false}
            onChange={(event) =>
              this.onChangeGridColumn(event, purgeColumnProps)
            }
            onLabel={t("camp.add.waitforagent.yes", defaultNs)}
            offLabel={t("camp.add.waitforagent.no", defaultNs)}
          />
        ) : dataItem.isPurge == true ? (
          "true"
        ) : (
          "false"
        )}
      </td>
    );
  };
  retentionPeriodInDaysColumn = (
    retentionPeriodInDaysColumnProps: GridCellProps
  ) => {
    const { dataItem } = retentionPeriodInDaysColumnProps;

    return (
      <td className="numericbox">
        {dataItem.inEdit ? (
          <SlideCtrl
            isSliderRequired={false}
            min={1}
            max={1000}
            step={1}
            onChangeValue={this.onReturnValue}
            gridData={retentionPeriodInDaysColumnProps}
            value={dataItem.retentionPeriodInDays}
            aria-labelledby={
              "coretable-retentionPeriodInDays" +
              retentionPeriodInDaysColumnProps.dataIndex
            }
            id={
              "coretable-retentionPeriodInDays" +
              retentionPeriodInDaysColumnProps.dataIndex
            }
            name={
              "coretable-retentionPeriodInDays" +
              retentionPeriodInDaysColumnProps.dataIndex
            }
            aria-describedby={
              "coretable-retentionPeriodInDays" +
              retentionPeriodInDaysColumnProps.dataIndex
            }
          />
        ) : (
          (dataItem.retentionPeriodInDays = ""
            ? 0
            : dataItem.retentionPeriodInDays)
        )}
      </td>
    );
  };
  onReturnValue = (event: any, field: string, sliderProps?: any) => {
    if (
      field ===
      "coretable-retentionPeriodInDays" + sliderProps.gridData.dataIndex
    ) {
      this.props.updateStateForSliderGrid(
        event,
        "retentionPeriodInDays",
        sliderProps
      );
    } else if (
      field ===
      "coretable-archiveDBRetentionPeriodInDays" +
        sliderProps.gridData.dataIndex
    ) {
      this.props.updateStateForSliderGrid(
        event,
        "archiveDBRetentionPeriodInDays",
        sliderProps
      );
    }
  };
  archiveDBRetentionPeriodInDaysColumn = (
    archiveDBRetentionPeriodInDaysColumnProps: GridCellProps
  ) => {
    const { dataItem } = archiveDBRetentionPeriodInDaysColumnProps;
    return (
      <td className="numericbox">
        {dataItem.inEdit ? (
          <SlideCtrl
            isSliderRequired={false}
            min={1}
            max={1000}
            onChangeValue={this.onReturnValue}
            gridData={archiveDBRetentionPeriodInDaysColumnProps}
            value={dataItem.archiveDBRetentionPeriodInDays}
            aria-labelledby={
              "coretable-archiveDBRetentionPeriodInDays" +
              archiveDBRetentionPeriodInDaysColumnProps.dataIndex
            }
            id={
              "coretable-archiveDBRetentionPeriodInDays" +
              archiveDBRetentionPeriodInDaysColumnProps.dataIndex
            }
            name={
              "coretable-archiveDBRetentionPeriodInDays" +
              archiveDBRetentionPeriodInDaysColumnProps.dataIndex
            }
            aria-describedby={
              "coretable-archiveDBRetentionPeriodInDays" +
              archiveDBRetentionPeriodInDaysColumnProps.dataIndex
            }
          />
        ) : (
          (dataItem.archiveDBRetentionPeriodInDays = ""
            ? 0
            : dataItem.archiveDBRetentionPeriodInDays)
        )}
      </td>
    );
  };
  isArchiveDBPurgeColumn = (isArchiveDBPurgeColumnProps: GridCellProps) => {
    const { dataItem, dataIndex } = isArchiveDBPurgeColumnProps;
    return (
      <td>
        {dataItem.inEdit ? (
          <Switch
            id={"isArchiveDBPurge-" + isArchiveDBPurgeColumnProps.dataIndex}
            name={"isArchiveDBPurge-" + isArchiveDBPurgeColumnProps.dataIndex}
            ariaLabelledBy={
              "isArchiveDBPurge-" + isArchiveDBPurgeColumnProps.dataIndex
            }
            checked={dataItem.isArchiveDBPurge}
            onLabel={t("camp.add.waitforagent.yes", defaultNs)}
            offLabel={t("camp.add.waitforagent.no", defaultNs)}
            onChange={(event) =>
              this.onChangeGridColumn(event, isArchiveDBPurgeColumnProps)
            }
          />
        ) : dataItem.isArchiveDBPurge ? (
          "true"
        ) : (
          "false"
        )}
      </td>
    );
  };
  discriptioncolum = (discriptioncolumProps: any) => {
    const { dataItem } = discriptioncolumProps;
    console.log("discripton", dataItem);
    return (
      <td className="reschedule-data">
        {dataItem.inEdit ? (
          <>
            <Input value={discriptioncolumProps.dataItem.description} />
          </>
        ) : (
          <td className="">{dataItem.description} </td>
        )}
      </td>
    );
  };
  render() {
    return (
      <>
        <Grid
          style={{ height: "600px", overflowY: "hidden" }}
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
          <Column
            field=""
            cell={() => <img src="/images/table.png" className="tableImg" />}
            width="35px"
          />
          <Column
            field="tableName"
            title={t("archive.TableName", defaultNs)}
            editable={false}
            // width="250px"
            className="tablename"
          />
          <Column
            field="description"
            title={t("archive.Description", defaultNs)}
            editable={false}
            // width="260px"
            className="text"
          />
          <Column
            field="retentionPeriodInDays"
            title={t("archive.noOfDaysRetain", defaultNs)}
            // width="130px"
            editable={true}
            cell={this.retentionPeriodInDaysColumn}
          />
          <Column
            field="isArchive"
            title={t("aetools.archive.heading", defaultNs)}
            // width="140px"
            editable={true}
            cell={this.archiveColumn}
          />
          <Column
            field="isPurge"
            title={t("archive.purge", defaultNs)}
            // width="120px"
            cell={this.purgeColumn}
          />
          <Column
            field="archiveDBRetentionPeriodInDays"
            title={t("archive.archiveDBnoOfDaysRetain", defaultNs)}
            // width="200px"
            editable={true}
            cell={this.archiveDBRetentionPeriodInDaysColumn}
          />
          <Column
            field="isArchiveDBPurge"
            title={t("aetools.archiveDBPurge", defaultNs)}
            // width="150px"
            cell={this.isArchiveDBPurgeColumn}
          />
          <Column
            field=""
            title="Actions"
            // width="150px"
            cell={(cellProps) => (
              <td>
                {cellProps.dataItem.inEdit ? (
                  <span>
                    <button
                      title="Save"
                      onClick={() => this.props.updatecode(cellProps.dataItem)}
                      className="save-button"
                    >
                      Save
                    </button>
                  </span>
                ) : (
                  <span>
                    <i
                      className="far fa-edit editicon"
                      title="edit"
                      onClick={() => {
                        console.log("edit clicked");

                        this.props.enterEdit(cellProps.dataItem);
                      }}
                    ></i>
                  </span>
                )}
                {cellProps.dataItem.inEdit ? (
                  <button
                    title="cancel"
                    onClick={() => this.props.cancel(cellProps.dataItem)}
                    className="save-button"
                  >
                    Cancel
                  </button>
                ) : (
                  <span>
                    <i
                      className="far fa-trash-alt deleteIcon"
                      title="delete"
                      onClick={() => {
                        this.openDeleteTableDialog(cellProps.dataItem);
                      }}
                    ></i>
                  </span>
                )}
              </td>
            )}
          />
        </Grid>
        {this.state.isDeleteTableGroup && (
          <DeleteConfirmationPopup
            titleContent={t("common.delete.selection", defaultNs)}
            contentName={this.state.selectedTableGroup.tableName}
            handleDeleteClick={this.coretableList}
            description={t(
              "archive.coreTables.action.delete.confirm",
              defaultNs
            )}
            popUpCloseClick={this.closeDeleteTableDialog}
            iconClass={""}
          />
        )}
      </>
    );
  }
}
export default ArchiveCoreGrid;

function findParent(target: any) {
  throw new Error("Function not implemented.");
}
