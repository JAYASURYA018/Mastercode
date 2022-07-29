import React, { Component } from "react";
import { Button } from "@progress/kendo-react-buttons";
import PurgeFileGrid from "./purgefileGrid";
import PurgeFilePopup from "./purgeFilePopup";

import {
  GridPageChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { t } from "i18next";

const defaultNs: any = { ns: ["camp", "common", "aetools"] };

interface Iprops {
  GridData: any;
  onPageChange: (event: GridPageChangeEvent) => void;
  onSortChange: (event: GridSortChangeEvent) => void;
  totalCount: number;
  pageable: any;
  skip: number;
  allDataObject: any;
  take: number;
  handleInputChange: any;
  onclosePopup: any;
  isDeleteContactStrategy: boolean;
  onOpenPopup: any;
  IsDialogopen?: boolean;
  btnName: boolean;
  sortValue: any;
  callstrategyList?: () => void;
  searchFilter?: string;
  onSearch?: (event: any) => void;
  loadTableDetails: () => void;
  SaveData: any;
  onUpdate: any;
  onEdit: any;
  editContractData: any;
  sampleData: any;
  welcomePage: boolean;
  table: boolean;
  showTable: any;
  sourceGridData?: any;
}

interface Istate {
  IsDialogopen?: boolean;
  isEditContactStrategy?: boolean;
  data?: any;
}

class PurgeFileWelcomePage extends Component<Iprops, Istate> {
  state: Istate = {
    isEditContactStrategy: false,
  };
  componentDidMount() {
    this.props.loadTableDetails();
    // console.log("data", this.props.GridData);
    // this.setState({
    //   data: this.props.GridData,
    // });
  }
  render() {
    return (
      <>
        {this.props.IsDialogopen && (
          <PurgeFilePopup
            onOpenPopup={this.props.onOpenPopup}
            showTable={this.props.showTable}
            isEditContactStrategy={this.state.isEditContactStrategy}
            btnName={this.props.btnName}
            onclosePopup={this.props.onclosePopup}
            sampleData={this.props.sampleData}
            SaveData={this.props.SaveData}
            handleInputChange={this.props.handleInputChange}
            onUpdate={this.props.onUpdate}
            editContractData={this.props.editContractData}
            loadTableDetails={this.props.loadTableDetails}
          />
        )}

        {this.props.sourceGridData && this.props.sourceGridData.length ? (
          <PurgeFileGrid
            GridData={this.props.GridData}
            sortValue={this.props.sortValue}
            onPageChange={this.props.onPageChange}
            skip={this.props.skip}
            take={this.props.take}
            isDeleteContactStrategy={this.props.isDeleteContactStrategy}
            pageable={this.props.pageable}
            onSortChange={this.props.onSortChange}
            totalCount={this.props.totalCount}
            onSearch={this.props.onSearch}
            searchFilter={this.props.searchFilter}
            onOpenPopup={this.props.onOpenPopup}
            sampleData={this.props.sampleData}
            onEdit={this.props.onEdit}
            loadTableDetails={this.props.loadTableDetails}
          />
        ) : (
          <div className="purgefilepage">
            <h4 className="welcometext">
              {t("archive.purgefile.Welcome", defaultNs)}
            </h4>

            <p className="lorem_text">
              {t("archive.purgefile.LoremText", defaultNs)}

              {t("archive.purgefile.Loremtext", defaultNs)}
            </p>

            <p className="mauris_text">
              {t("archive.purgefile.Mauris", defaultNs)}
              {t("archive.purgefile.accumsan", defaultNs)}
            </p>

            <div>
              <Button
                className="welcome_addbtn"
                onClick={this.props.onOpenPopup}
              >
                {t("archive.purgefile.AddPurgeFile", defaultNs)}
              </Button>
            </div>
            <div className="watchbox">
              <p className="watchvideo">
                {t("archive.purgefile.WatchVideo", defaultNs)}
              </p>

              <div className="divid"></div>

              <p className="read_artical">
                {t("archive.purgefile.ReadArticle", defaultNs)}
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default PurgeFileWelcomePage;
