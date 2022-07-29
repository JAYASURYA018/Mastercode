import React, { Component } from "react";
import { Button } from "@progress/kendo-react-buttons";

import {
  GridPageChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";

import { t } from "i18next";
import PurgeSettingsPopup from "./PurgeSettingsPopup";
import PurgeFileSettingsGrid from "./purgesettingsGrid";

const defaultNs: any = { ns: ["camp", "common", "aetools"] };
interface Iprops {
  GridData: any;
  onPageChange: (event: GridPageChangeEvent) => void;
  onSortChange: (event: GridSortChangeEvent) => void;
  totalCount: number;
  pageable: any;
  skip: number;
  take: number;
  onclosePopup: any;
  onOpenPopup: any;
  Isdialogopen?: boolean;
  btnName: boolean;
  sortValue: any;
  callstrategyList?: () => void;
  searchFilter?: string;
  onSearch?: (event: any) => void;

  LoadSettingsTable: () => void;
  saveData: any;
  onUpdate: any;
  PurgeSettingsOnEdit: any;
  editContractData: any;
  sampleData: any;
  welcomePage: boolean;
  table: boolean;
  showTable: any;
  sourceGridData: any;
}

interface Istate {
  IsDialogopen?: boolean;
  isEditContactStrategy?: boolean;
}

class PurgeSettingsWelcomePage extends Component<Iprops, Istate> {
  state: Istate = {
    isEditContactStrategy: false,
  };
  componentDidMount() {
    this.props.LoadSettingsTable();
  }
  render() {
    return (
      <>
        {this.props.Isdialogopen && (
          <PurgeSettingsPopup
            onOpenPopup={this.props.onOpenPopup}
            showTable={this.props.showTable}
            isEditContactStrategy={this.state.isEditContactStrategy}
            btnName={this.props.btnName}
            onclosePopup={this.props.onclosePopup}
            saveData={this.props.saveData}
            onUpdate={this.props.onUpdate}
            editContractData={this.props.editContractData}
            LoadSettingsTable={this.props.LoadSettingsTable}
          />
        )}

        {this.props.sourceGridData && this.props.sourceGridData.length ? (
          <PurgeFileSettingsGrid
            GridData={this.props.GridData}
            sortValue={this.props.sortValue}
            onPageChange={this.props.onPageChange}
            skip={this.props.skip}
            take={this.props.take}
            pageable={this.props.pageable}
            onSortChange={this.props.onSortChange}
            totalCount={this.props.totalCount}
            onSearch={this.props.onSearch}
            searchFilter={this.props.searchFilter}
            onOpenPopup={this.props.onOpenPopup}
            PurgeSettingsOnEdit={this.props.PurgeSettingsOnEdit}
            LoadSettingsTable={this.props.LoadSettingsTable}
            onclosePopup={this.props.onclosePopup}
            Isdialogopen={this.props.Isdialogopen}
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
                className="welcomes_addbtn"
                onClick={this.props.onOpenPopup}
              >
                {t("archive.purgefile.AddPurgeFileSettings", defaultNs)}
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

export default PurgeSettingsWelcomePage;
