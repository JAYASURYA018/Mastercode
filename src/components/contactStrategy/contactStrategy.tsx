import React, { Component } from "react";
import ApiService from "../../services/api-manager";
import "../../scss/_modal.scss";
import "./_contactStrategy.scss";
import { ContactStrategyGrid } from "./contactStrategyGrid";
import { Row } from "reactstrap";
import ApiConstants from "../../api-constants";
import InitialPage from "../common/initialPage";
import {
  IcallStrategiesMember,
  IcallStrategyModeInformation,
} from "../../interface/contactStrategy/IcontactStrategy";
import { orderBy } from "@progress/kendo-data-query";
import {
  GridPageChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { Translation } from "react-i18next";
import * as _ from "underscore";
import { deepCopy } from "../../helpers/generics";
import { AddEditContactStrategy } from "./addEditContactStrategy";
const defaultNs = { ns: ["camp", "callstrategy", "common", "bo", "sysconfig"] };

interface IState {
  gridData?: Array<IcallStrategiesMember>;
  error?: boolean;
  visible?: boolean;
  skip?: number;
  take?: number;
  sort?: any;
  callstrategiesTotal?: number;
  pageable?: any;
  pageNumber?: number;
  searchFilter?: string;
  callStrategyModeGrid?: Array<IcallStrategyModeInformation>;
  contactStrategyIndexPopover?: number;
  isAddContactStrategy?: boolean;
  isEditContactStrategy?: boolean;
  selectedModeItem?: IcallStrategiesMember;
  isEditMode?: boolean;
  isAddMode?: boolean;
}

export class ContactStrategy extends Component<any, IState> {
  state: IState = {
    sort: [{ field: "dialPlanName", dir: "asc" }],
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
  };
  public sourceGridData?: Array<IcallStrategiesMember>;
  public addEditRef: any;
  public selectedDialPlanName: string;

  constructor(props: any) {
    super(props);
    this.addEditRef = React.createRef();
    this.onSearch = this.onSearch.bind(this);
  }

  async componentDidMount() {
    await this.callstrategyList();
  }

  callstrategyList = async () => {
    await ApiService.getAll(ApiConstants.callStrategy + "?userId=" + "1")
      .then((response) => {
        if (response) {
          this.sourceGridData = response;
          this.setState({
            gridData: response.slice(this.state.skip, this.state.take),
            callstrategiesTotal: response.length,
          });
        }
      })
      .catch((error) => {});
  };

  pageChange = (event: GridPageChangeEvent) => {
    let data: Array<IcallStrategiesMember> = this.filterByValue(
      this.sourceGridData,
      this.state.searchFilter
    );
    this.setState({
      skip: event.page.skip,
      take: event.page.take,
      gridData: orderBy(data, this.state.sort).slice(
        event.page.skip,
        event.page.skip + event.page.take
      ),
      callstrategiesTotal: data.length,
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
      searchFilter: e.value,
      gridData: data.slice(this.state.skip, this.state.skip + this.state.take),
      callstrategiesTotal: data.length,
    });
  };

  filterByValue = (array: any, value: any) => {
    return _.filter(array, function (o: any) {
      return (
        o.dialPlanName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        o.modeCount.toString().indexOf(value.toString()) !== -1 ||
        o.description.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        o.strategyType.toString().indexOf(value.toString()) !== -1
      );
    });
  };

  showModeDetails = (dialPlanName?: string, index?: number) => {
    let callstrategy: Array<IcallStrategiesMember> = deepCopy(
      _.where(this.sourceGridData, { dialPlanName: dialPlanName })
    );
    this.state.callStrategyModeGrid = deepCopy(
      callstrategy[0].callStrategyModeInformation
    );
    this.setState({
      callStrategyModeGrid: this.state.callStrategyModeGrid,
      contactStrategyIndexPopover: index,
    });
  };

  closeAddEditContactStrategy = () => {
    this.setState({
      isAddContactStrategy: false,
      isEditContactStrategy: false,
      isEditMode: false,
    });
  };

  addModesClick = (dataItem?: any) => {
    this.selectedDialPlanName = dataItem?.dialPlanName;
    this.setState(
      {
        isEditContactStrategy: true,
        selectedModeItem: dataItem,
        isAddMode: true,
        isEditMode: false,
      },
      () => {
        setTimeout(
          () => this.addEditRef.current.addAnotherCallStrategyModes(""),
          !dataItem ? 200 : 3000
        );
      }
    );
  };

  modeRowClick = (cellProps: any, item: any) => {
    this.setState({
      selectedModeItem: item.dataItem,
      isEditMode: true,
      isEditContactStrategy: true,
    });
  };

  render() {
    return (
      <Translation ns={["camp", "callstrategy", "common", "bo", "sysconfig"]}>
        {(t) => (
          <>
            <Row className="row page-heading">
              <div className="col-6">
                <h4 className="d-flex align align-self-center">
                  {" "}
                  <div className="d-inline-block pt-1 pr-2">
                    <i className="icon-contact-strategy"></i>
                  </div>
                  {t("callstrategy.pageHeader.title", defaultNs)}{" "}
                  <span className="dot"> • </span>{" "}
                  {this.state.callstrategiesTotal}
                </h4>
              </div>
              <div className="col-6 text-right">
                <button
                  onClick={() => {
                    this.setState({ isAddContactStrategy: true });
                  }}
                  type="button"
                  className="k-button k-primary"
                >
                  {t("camp.chain.addnewoutcomes")}
                </button>
              </div>
            </Row>

            {this.sourceGridData?.length == 0 ? (
              <InitialPage
                title={"Welcome to Contact Strategy"}
                description={
                  "Contact Strategy is a set of rules for various modes based on which a contact can be reached."
                }
                subDescription={
                  "You can create your set of rules deciding when and how a particular mode of communication will reach your contacts."
                }
                buttonText={"Add Contact Strategy"}
                linkText1={"Watch Video"}
                linkText2={"Read Article"}
                hrefLink1={""}
                hrefLink2={""}
                onPopUpBtnClick={() => alert("hi")}
              />
            ) : (
              <div>
                <ContactStrategyGrid
                  gridData={this.state.gridData}
                  sortValue={this.state.sort}
                  onPageChange={this.pageChange}
                  skip={this.state.skip}
                  take={this.state.take}
                  pageable={this.state.pageable}
                  onSortChange={this.sortChange}
                  totalCount={this.state.callstrategiesTotal}
                  onSearch={this.onSearch}
                  searchFilter={this.state.searchFilter}
                  callstrategyList={this.callstrategyList}
                  callStrategyModeGrid={this.state.callStrategyModeGrid}
                  addModesClick={this.addModesClick}
                  modeRowClick={this.modeRowClick}
                />
              </div>
            )}
            {(this.state.isAddContactStrategy ||
              this.state.isEditContactStrategy) && (
              <AddEditContactStrategy
                closeAddEditContactStrategy={() =>
                  this.closeAddEditContactStrategy()
                }
                masterCallStrategiesListModel={this.sourceGridData}
                callstrategyList={this.callstrategyList}
                ref={this.addEditRef}
                isEditContactStrategy={this.state.isEditContactStrategy}
                selectedDialPlanName={this.selectedDialPlanName}
                isAddContactStrategy={this.state.isAddContactStrategy}
                selectedModeItem={this.state.selectedModeItem}
                isEditMode={this.state.isEditMode}
                isAddMode={this.state.isAddMode}
                addModesClick={this.addModesClick}
              />
            )}
          </>
        )}
      </Translation>
    );
  }
}
