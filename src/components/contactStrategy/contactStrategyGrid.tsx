import React, { Component } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { Input } from "@progress/kendo-react-inputs";
import GridPaging from "../common/gridPagination";
import {
  IcallStrategiesMember,
  IcallStrategyDelete,
  IcallStrategyModeInformation,
} from "../../interface/contactStrategy/IcontactStrategy";
import { CopyContactStrategy } from "./copyContactStrategy";
import DeleteConfirmationPopup from "../common/deleteConfirmationPopup";
import { t } from "i18next";
import ApiConstants from "../../api-constants";
import ApiService from "../../services/api-manager";
import toastrmsg from "../../services/toaster-manager";
import {
  GridPageChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { Popover, OverlayTrigger } from "react-bootstrap";
import moment from "moment";

interface Iprops {
  gridData: Array<IcallStrategiesMember>;
  onPageChange: (event: GridPageChangeEvent) => void;
  onSortChange: (event: GridSortChangeEvent) => void;
  totalCount: number;
  pageable: any;
  skip: number;
  take: number;
  sortValue: any;
  callstrategyList?: () => void;
  searchFilter?: string;
  onSearch?: (event: any) => void;
  showModeDetails?: (dialPlanName: string, index?: number) => void;
  callStrategyModeGrid?: Array<IcallStrategyModeInformation>;
  addModesClick: (dialPlanName?: string) => void;
  modeRowClick?: (event: any, dataItem: any) => void;
}

interface Istate {
  resizeScreen?: boolean;
  isCopyContactStrategy?: boolean;
  isDeleteContactStrategy?: boolean;
  contactStrategyIndexPopover?: number;
  isPopupModeEnabled?: boolean;
}

const defaultNs = { ns: ["camp", "common", "callstrategy"] };

export class ContactStrategyGrid extends Component<Iprops, Istate> {
  gridWidth: number = window.innerWidth - 220;
  gridHeight: number = window.innerHeight - 125;
  state: Istate = {};
  selectedContactStrategy?: IcallStrategiesMember;

  constructor(props: any) {
    super(props);
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    if (nextProps !== this.props || nextState !== this.state) {
      return true;
    } else {
      return false;
    }
  }

  setPercentage = (percentage: any) => {
    return Math.round(this.gridWidth / 100) * percentage;
  };

  componentDidMount() {
    window.addEventListener("resize", this.screenResize);
  }

  screenResize = () => {
    this.gridWidth = window.innerWidth - 220;
    this.gridHeight = window.innerHeight - 125;
    this.setState({ resizeScreen: true });
  };

  openCopyContactStrategyDialog = (dataItem?: IcallStrategiesMember) => {
    this.selectedContactStrategy = dataItem;
    this.setState({ isCopyContactStrategy: true });
  };

  closeCopyContactStrategyDialog = () => {
    this.selectedContactStrategy = undefined;
    this.setState({ isCopyContactStrategy: false });
  };

  openDeleteContactStrategyDialog = (dataItem?: IcallStrategiesMember) => {
    this.selectedContactStrategy = dataItem;
    this.setState({ isDeleteContactStrategy: true });
  };

  closeDeleteContactStrategyDialog = () => {
    this.selectedContactStrategy = undefined;
    this.setState({ isDeleteContactStrategy: false });
  };

  deleteContactStrategy = () => {
    let params: IcallStrategyDelete = {
      dialPlanName: this.selectedContactStrategy.dialPlanName,
      operation: "Delete",
      createUser: "1",
      data: "",
      enterpriseId: 1,
      pageName: "Call Strategy",
    };
    ApiService.delete(ApiConstants.callStrategy, params)
      .then((data) => {
        if (data == 50037) {
          this.closeDeleteContactStrategyDialog();
          toastrmsg.toastMessage(
            t("callstrategy.message.delete.sucesscontactstrategy", defaultNs),
            "success"
          );
          this.props.callstrategyList();
        } else if (data == -50036) {
          toastrmsg.toastMessage(
            t("callstrategy.message.delete.cammpaignassign", defaultNs),
            "error"
          );
        }
      })
      .catch(() => {
        toastrmsg.toastMessage(
          t("callstrategy.message.error.deletecallstrategy", defaultNs),
          "error"
        );
      });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.screenResize);
  }

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

  strategyColumn = (props: any) => {
    switch (props.dataItem.strategyType) {
      case 0:
        return (
          <td>
            <span>{t("cm.none", defaultNs)}</span>
          </td>
        );
      case 1:
        return (
          <td>
            <span>{t("callstrategy.callstrategyType.simple", defaultNs)}</span>
          </td>
        );
      case 2:
        return (
          <td>
            <span>
              {t("callstrategy.callstrategyType.advanced", defaultNs)}
            </span>
          </td>
        );
      case 3:
        return (
          <td>
            <span>
              {t("callstrategy.callstrategyType.callback", defaultNs)}
            </span>
          </td>
        );
      default:
        return (
          <td>
            <span></span>
          </td>
        );
    }
  };

  render() {
    return (
      <>
        <Grid
          // style={{ height: this.gridHeight }}
          data={this.props.gridData}
          skip={this.props.skip}
          take={this.props.take}
          pageSize={this.props.take}
          pageable={this.props.pageable}
          total={this.props.totalCount}
          sortable={{ allowUnsort: false }}
          className="contact-strategy"
          sort={this.props.sortValue}
          onPageChange={this.props.onPageChange}
          onSortChange={this.props.onSortChange}
          pager={GridPaging}
        >
          <GridToolbar>
            <div className="row">
              <div className="col-md-6"></div>
              <div className="col-md-6 text-right search-input">
                <i className="icon-tool-search"></i>
                <Input
                  placeholder={t("common.grid.search.label", defaultNs)}
                  id="ContactStrategy-Data-Filter"
                  name="ContactStrategy-Data-Filter"
                  aria-label={t("common.grid.search.label", defaultNs)}
                  value={this.props.searchFilter}
                  onChange={this.props.onSearch}
                />
                <span className="border-left pl-16">
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
          <Column
            field=""
            title=""
            width="55px"
            cell={(cellProps) => (
              <td className="pr-0">
                <span className="icon-contact-strategy"></span>
              </td>
            )}
          />
          <Column field="dialPlanName" title="Name" />

          <Column
            field="strategyType"
            title={t(
              "callstrategy.callstrategylist.grid.header.StrategyType",
              defaultNs
            )}
            width={this.setPercentage(15)}
            cell={this.strategyColumn}
          />
          <Column
            field="description"
            title={t(
              "callstrategy.callstrategylist.grid.header.Description",
              defaultNs
            )}
            width={this.setPercentage(27)}
          />
          <Column
            field="modeCount"
            title="Selected Modes"
            width={this.setPercentage(15)}
            cell={(cellProps) =>
              cellProps.dataItem.modeCount != 0 ? (
                <td>
                  <button
                    onClick={() => {
                      this.updateContactStrategyPopupIndex(cellProps.dataIndex);
                    }}
                    id={"ContactStrategy-ModePopup" + cellProps.dataIndex}
                    name={"ContactStrategy-ModePopup" + cellProps.dataIndex}
                  >
                    <span>
                      {t("uc.modes", defaultNs)}
                      <span className="dot">. </span>
                      <span>{cellProps.dataItem.modeCount} </span>
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
                          <Popover
                            id={`popover-positioned-left`}
                            className="grid-list-popover"
                          >
                            <div className="tooltip-body">
                              <p className="heading">
                                <span className="">
                                  {t("callstrategy.selectedModes", defaultNs)}
                                  <span className="closetextpopup">. </span>
                                  {cellProps.dataItem.modeCount}
                                </span>
                                <span
                                  className="float-right"
                                  style={{ cursor: "pointer" }}
                                >
                                  <span
                                    className="closetextpopup"
                                    onClick={() => {
                                      this.props.addModesClick(
                                        cellProps.dataItem
                                      );
                                    }}
                                  >
                                    {t("callstrategy.addMode", defaultNs)}
                                  </span>
                                </span>
                              </p>
                              <Grid
                                data={
                                  cellProps.dataItem.callStrategyModeInformation
                                }
                                onRowClick={(event) => {
                                  this.props.modeRowClick(event, cellProps);
                                }}
                              >
                                <Column
                                  field="modeName"
                                  title={t("camp.chain.mode", defaultNs)}
                                  width="140"
                                />
                                <Column
                                  field="startTime"
                                  title={t("camp.label.Time_Range", defaultNs)}
                                  width="125"
                                  cell={(props) => (
                                    <td className="p-0">
                                      {moment(
                                        new Date(props.dataItem.startTime)
                                      ).format("hh:mm A") +
                                        " - " +
                                        moment(
                                          new Date(props.dataItem.endTime)
                                        ).format("hh:mm A")}
                                    </td>
                                  )}
                                />
                                <Column
                                  field="modeMaxRetry"
                                  width="65"
                                  title={t("callstrategy.retries", defaultNs)}
                                />
                              </Grid>
                            </div>
                          </Popover>
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
                    <span>{cellProps.dataItem.modeCount} </span>
                    <i className="icon-dropdown-chevron" />
                  </button>
                  {cellProps.dataItem.modeCount != 0}
                </td>
              )
            }
          />
          <Column
            field=""
            title="Actions"
            width={this.setPercentage(10)}
            cell={(cellProps) => (
              <td>
                <button
                  id={`Save-CopyContactStrategyDialog` + cellProps.dataIndex}
                  name={`Save-CopyContactStrategyDialog` + cellProps.dataIndex}
                  onClick={() => {
                    this.openCopyContactStrategyDialog(cellProps.dataItem);
                  }}
                >
                  <i className="icon-tool-clone" title="Copy"></i>
                </button>
                <button
                  id={`Delete-CopyContactStrategyDialog` + cellProps.dataIndex}
                  name={
                    `Delete-CopyContactStrategyDialog` + cellProps.dataIndex
                  }
                  onClick={() => {
                    this.openDeleteContactStrategyDialog(cellProps.dataItem);
                  }}
                >
                  <i className="icon-tool-delete" title="Delete"></i>
                </button>
              </td>
            )}
          />
        </Grid>

        {this.state.isCopyContactStrategy && (
          <CopyContactStrategy
            sourceContactStrategy={this.selectedContactStrategy.dialPlanName}
            callstrategyList={this.props.callstrategyList}
            closeCopyContactStrategyDialog={this.closeCopyContactStrategyDialog}
          />
        )}

        {this.state.isDeleteContactStrategy && (
          <DeleteConfirmationPopup
            titleContent={t("common.delete.selection", defaultNs)}
            iconClass="icon-contact-strategy"
            description={t("callstrategy.action.delete.confirm", defaultNs)}
            contentName={this.selectedContactStrategy.dialPlanName}
            popUpCloseClick={this.closeDeleteContactStrategyDialog}
            handleDeleteClick={this.deleteContactStrategy}
            cancelAriaLabel="cancel-Delete contact strategy"
            cancelId="cancel-Deletecontactstrategy"
            cancelName="cancel-Deletecontactstrategy"
            deleteAriaLabel="Delete-contact strategy"
            deleteId="Delete-Deletecontactstrategy"
            deleteName="Delete-Deletecontactstrategy"
          />
        )}
      </>
    );
  }
}
