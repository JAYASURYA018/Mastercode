import React, { Component } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import {
  GridPageChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";

import { t } from "i18next";
import DeleteConfirmationPopup from "../common/deleteConfirmationPopup";
import _ from "underscore";
import GridPaging from "../common/gridPagination";
import ApiService from "../../services/api-manager";
import ApiConstants from "../../api-constants";
import toastrmsg from "../../services/toaster-manager";
import { Ipurgefile } from "../../interface/archive/IPurgeFileConfigurationGrid";

interface Iprops {
  GridData: any;
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
  LoadSettingsTable: () => void;
  onOpenPopup: any;
  PurgeSettingsOnEdit: any;
  onclosePopup: any;
  Isdialogopen: boolean;
}

interface Istate {
  toggleDialog: false;
  isDeleteContactStrategy: boolean;
  SelectedPurgeFile?: any;
}

const defaultNs: any = { ns: ["camp", "common", "aetools"] };

export default class PurgeFileSettingsGrid extends Component<Iprops, Istate> {
  public sourceGridData?: Array<Ipurgefile>;

  state: Istate = {
    isDeleteContactStrategy: false,
    toggleDialog: undefined,
    SelectedPurgeFile: undefined,
  };

  closeDeleteTableDialog = () => {
    this.setState({ isDeleteContactStrategy: false });
  };

  openDeletepurgeDialog = (dataItem?: Istate) => {
    this.setState({
      SelectedPurgeFile: dataItem,
      isDeleteContactStrategy: true,
    });
  };

  onDelete = async () => {
    debugger;
    await ApiService.delete(
      ApiConstants.purgeFileSettingsDelete +
        "?id=" +
        this.state.SelectedPurgeFile.id
    )
      .then((response) => {
        debugger;

        this.props.LoadSettingsTable();
        this.setState({
          isDeleteContactStrategy: false,
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

  render() {
    return (
      <div>
        <Grid
          style={{ height: "595px", marginLeft: "30px" }}
          data={this.props.GridData}
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
            className="SettingsHeader"
            field="purgeFileSettingsName"
            title="Settings Name"
          />
          <GridColumn
            className="SettingsType"
            field="purgeFileSettingsType"
            title="Settings Type"
          />
          <GridColumn
            field=""
            title="Actions"
            className="Actions"
            cell={(cellProps) => (
              <td>
                <span className="editicon">
                  <i
                    className="icon-tool-edit"
                    title="edit"
                    onClick={() =>
                      this.props.PurgeSettingsOnEdit(cellProps.dataItem.id)
                    }
                  ></i>
                </span>
                <span className="deleteicon">
                  <i
                    className="icon-tool-delete"
                    title="Delete"
                    onClick={() => {
                      this.openDeletepurgeDialog(cellProps.dataItem);
                    }}
                  ></i>
                </span>
              </td>
            )}
          />
        </Grid>
        {this.state.isDeleteContactStrategy && (
          <DeleteConfirmationPopup
            titleContent={t("common.delete.selection", defaultNs)}
            description={t("archive.purgefile.delete", defaultNs)}
            popUpCloseClick={this.closeDeleteTableDialog}
            handleDeleteClick={this.onDelete}
            iconClass={""}
            contentName={this.state.SelectedPurgeFile.purgeFileSettingsName}
          />
        )}
      </div>
    );
  }
}
