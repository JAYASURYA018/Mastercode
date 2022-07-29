import React, { Component } from 'react'
import {
    ListView,
    ListViewHeader,
    ListViewFooter,
    ListViewItemProps,
  } from "@progress/kendo-react-listview";
import ItemPop from './popupitem';

  interface Iprops {
    isHistoricalPopUp?: any;
    onItemPopUpSave:any;
    onItemPopUpcancel:any;
    isSave:any
    newReportName:any
    description:any
    isHistoricalName?:any
    currentclick:string;
  }

 class HistoricalItem extends Component <Iprops>{
  anchor: any = React.createRef();
  render() {
    return (
      <>
         <ListView
                            data={[
                              "Save",
                              "Save As",
                              "Scheduled Report",
                              "Save & Exit",
                              "Exit",
                            ]}
                            item={(props) => (
                              <div
                                onClick={() => {
                                  console.log("logged");
                                  if (
                                    ![
                                      "Scheduled Report",
                                      "Save & Exit",
                                      "Exit",
                                    ].includes(props.dataItem)
                                  ) {
                                    this.setState({
                                      isHistoricalPopUp:
                                        !this.props.isHistoricalPopUp,
                                      isSave:
                                        props.dataItem === "Save As"
                                          ? true
                                          : false,
                                    });
                                  }

                                  this.anchor.current.click();
                                }}
                                className="popup-item"
                                style={{
                                  paddingLeft: "16px",
                                  paddingRight: "16px",
                                  height: "32px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {props.dataItem}
                              </div>
                            )}
                            style={{
                              width: "100%",
                            }}
                          />
                            {this.props.isHistoricalPopUp && (
                          <ItemPop
                                onSave={this.props.onItemPopUpSave}
                                onCancel={this.props.onItemPopUpcancel}
                                currentclick={this.props.currentclick}
                                isEditContactStrategy={false}
                                
                                reportingAction={this.props.isSave
                                  ? {
                                    newReportName: this.props.newReportName,
                                    description: this.props.description,
                                  }
                                  : {
                                    newReportName: "",
                                    description: "",
                                  }} isHistoricalName={this.props.isHistoricalName}                          />
                        )}

      </>
    )
  }
}
export default HistoricalItem;
