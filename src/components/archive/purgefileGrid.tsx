import React, { Component } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import {
  GridPageChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";

import _ from "underscore";
import GridPaging from "../common/gridPagination";
import { t } from "i18next";
import DeleteConfirmationPopup from "../common/deleteConfirmationPopup";
import toastrmsg from "../../services/toaster-manager";
import ApiConstants from "../../api-constants";
import ApiService from "../../services/api-manager";
import { Ipurgefile } from "../../interface/archive/IPurgeFileConfigurationGrid";

interface Iprops {
  GridData: any;
  onPageChange: (event: GridPageChangeEvent) => void;
  onSortChange: (event: GridSortChangeEvent) => void;
  totalCount: number;
  pageable: any;
  skip: number;
  isDeleteContactStrategy: boolean;
  take: number;
  sortValue: any;
  callstrategyList?: () => void;
  searchFilter?: string;
  onSearch?: (event: any) => void;
  loadTableDetails: () => void;
  onOpenPopup: any;
  onEdit: any;
  sampleData: any;
}

interface Istate {
  toggleDialog: false;
  isDeleteContactStrategy: boolean;
  SelectedPurgeFile?: any;
}

const defaultNs: any = { ns: ["camp", "common", "aetools"] };

export default class purgefileGrid extends Component<Iprops, Istate> {
  public sourceGridData?: Array<Ipurgefile>;

  state: Istate = {
    isDeleteContactStrategy: false,
    toggleDialog: undefined,
    SelectedPurgeFile: undefined,
  };

  closeDeleteDialog = () => {
    this.setState({ isDeleteContactStrategy: false });
  };

  openDeleteDialog = (dataItem?: Istate) => {
    this.setState({
      SelectedPurgeFile: dataItem,
      isDeleteContactStrategy: true,
    });
  };

  onDelete = async () => {
    await ApiService.delete(
      ApiConstants.purgeFileDelete + "?id=" + this.state.SelectedPurgeFile.id
    )
      .then((response) => {
        this.props.loadTableDetails();
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
            className="FolderDescription"
            field="purgeFolderDescription"
            title="purge Folder Description"
          />
          <GridColumn
            className="folderType"
            field="purgeFolderType"
            title="Purge Folder Type"
          />
          <GridColumn
            className="LocalPath"
            field="purgeFolderPath"
            title="Purge Folder Path"
          />
          <GridColumn
            className="RetensionDays"
            field="noOfDaysRetain"
            title="Retention Days"
          />
          <GridColumn className="Purge" field="isPurge" title="Purge" />
          <GridColumn
            field="Actions"
            cell={(cellProps) => (
              <td>
                <span className="editicon">
                  <i
                    className="icon-tool-edit"
                    title="edit"
                    onClick={() => this.props.onEdit(cellProps.dataItem.id)}
                  ></i>
                </span>
                <span className="deleteicon">
                  <i
                    className="icon-tool-delete"
                    title="delete"
                    onClick={() => {
                      this.openDeleteDialog(cellProps.dataItem);
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
            popUpCloseClick={this.closeDeleteDialog}
            handleDeleteClick={this.onDelete}
            iconClass={""}
            contentName={this.state.SelectedPurgeFile.purgeFolderDescription}
          />
        )}
      </div>
    );
  }
}
