import React, { Component } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";

let data = [
  {
    ProductID: 1,
    ProductName: "Chai",
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: "10 boxes x 20 bags",
    UnitPrice: 18,
    UnitsInStock: 39,
    UnitsOnOrder: 0,
    ReorderLevel: 10,
    Discontinued: false,
    Category: {
      CategoryID: 1,
      CategoryName: "Beverages",
      Description: "Soft drinks, coffees, teas, beers, and ales",
    },
    FirstOrderedOn: new Date(1996, 8, 20),
  },
  {
    ProductID: 2,
    ProductName: "Chang",
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: "24 - 12 oz bottles",
    UnitPrice: 19,
    UnitsInStock: 17,
    UnitsOnOrder: 40,
    ReorderLevel: 25,
    Discontinued: false,
    Category: {
      CategoryID: 1,
      CategoryName: "Beverages",
      Description: "Soft drinks, coffees, teas, beers, and ales",
    },
    FirstOrderedOn: new Date(1996, 7, 12),
  },
  {
    ProductID: 3,
    ProductName: "Aniseed Syrup",
    SupplierID: 1,
    CategoryID: 2,
    QuantityPerUnit: "12 - 550 ml bottles",
    UnitPrice: 10,
    UnitsInStock: 13,
    UnitsOnOrder: 70,
    ReorderLevel: 25,
    Discontinued: false,
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
    FirstOrderedOn: new Date(1996, 8, 26),
  },
  {
    ProductID: 4,
    ProductName: "Chef Anton's Cajun Seasoning",
    SupplierID: 2,
    CategoryID: 2,
    QuantityPerUnit: "48 - 6 oz jars",
    UnitPrice: 22,
    UnitsInStock: 53,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
    FirstOrderedOn: new Date(1996, 9, 19),
  },
  {
    ProductID: 5,
    ProductName: "Chef Anton's Gumbo Mix",
    SupplierID: 2,
    CategoryID: 2,
    QuantityPerUnit: "36 boxes",
    UnitPrice: 21.35,
    UnitsInStock: 0,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: true,
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
    FirstOrderedOn: new Date(1996, 7, 17),
  },
  {
    ProductID: 6,
    ProductName: "Grandma's Boysenberry Spread",
    SupplierID: 3,
    CategoryID: 2,
    QuantityPerUnit: "12 - 8 oz jars",
    UnitPrice: 25,
    UnitsInStock: 120,
    UnitsOnOrder: 0,
    ReorderLevel: 25,
    Discontinued: false,
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
    FirstOrderedOn: new Date(1996, 9, 19),
  },
  {
    ProductID: 7,
    ProductName: "Uncle Bob's Organic Dried Pears",
    SupplierID: 3,
    CategoryID: 7,
    QuantityPerUnit: "12 - 1 lb pkgs.",
    UnitPrice: 30,
    UnitsInStock: 15,
    UnitsOnOrder: 0,
    ReorderLevel: 10,
    Discontinued: false,
    Category: {
      CategoryID: 7,
      CategoryName: "Produce",
      Description: "Dried fruit and bean curd",
    },
    FirstOrderedOn: new Date(1996, 7, 22),
  },
  {
    ProductID: 8,
    ProductName: "Northwoods Cranberry Sauce",
    SupplierID: 3,
    CategoryID: 2,
    QuantityPerUnit: "12 - 12 oz jars",
    UnitPrice: 40,
    UnitsInStock: 6,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
    FirstOrderedOn: new Date(1996, 11, 1),
  },
  {
    ProductID: 9,
    ProductName: "Mishi Kobe Niku",
    SupplierID: 4,
    CategoryID: 6,
    QuantityPerUnit: "18 - 500 g pkgs.",
    UnitPrice: 97,
    UnitsInStock: 29,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: true,
    Category: {
      CategoryID: 6,
      CategoryName: "Meat/Poultry",
      Description: "Prepared meats",
    },
    FirstOrderedOn: new Date(1997, 1, 21),
  },
  {
    ProductID: 10,
    ProductName: "Ikura",
    SupplierID: 4,
    CategoryID: 8,
    QuantityPerUnit: "12 - 200 ml jars",
    UnitPrice: 31,
    UnitsInStock: 31,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,
    Category: {
      CategoryID: 8,
      CategoryName: "Seafood",
      Description: "Seaweed and fish",
    },
    FirstOrderedOn: new Date(1996, 8, 5),
  },
];

const cssClassStatus: any = {
  CREATED: "created",
  STARTING: "starting",
  EXECUTING: "executing",
  STOPPING: "stopping",
  STOPPED: "stopped",
  "TIME SUSPENDED": "usersuspended",
  ELAPSED: "elapsed",
};

export class GridControl extends Component<{}, any> {
  editField = "inEdit";
  data1 = [
    {
      SelectCampaign: false,
      CampaignGroup: "ceteam",
      CampaignId: "TestDNCFeature",
      CampaignStatus: "EXECUTING",
      StartDate: "04/02/2021 12:00:00 AM",
      EndDate: "05/02/2021 11:59:59 PM",
      StartTime: "04/02/2021 12:00:00 AM",
      EndTime: "04/02/2021 11:59:59 PM",
      Dialer: "2016/25/02",
      Channel: "Voice",
      ZoneName: "(UTC+05:30) Chennai Kolkata Mumbai New Delhi",
      IsCiscoGroup: true,
      IsULCampaign: false,
      IsULGroupMapped: false,
      IsLowContacts: false,
      IsMultipleZipCode: false,
      CampaignPercentage: 92,
      CampaignType: 3,
      IsThrottlingEnable: false,
      CampaignPurposeType: 1,
      searchresultcount: 53,
      TotalContactCount: 25,
      OpenContactCount: 2,
      FreshContactCount: 2,
      ScheduleContactCount: 0,
      ClosedContactCount: 6,
      OthersContactsCount: 17,
      IsActionColumn: false,
      PredictedResult: "04/05/2021 11:39:56 AM",
      PredictedForOpenRecords: 3,
      SequenceID: 0,
    },
    {
      SelectCampaign: false,
      CampaignGroup: "barishm",
      CampaignId: "DifferentmodesTime",
      CampaignStatus: "CREATED",
      StartDate: "04/01/2021 12:00:00 AM",
      EndDate: "04/21/2021 11:59:59 PM",
      StartTime: "03/22/2021 12:00:00 AM",
      EndTime: "03/22/2021 11:59:59 PM",
      Dialer: "2016/25/02",
      Channel: "Voice",
      ZoneName: "(UTC+05:30) Chennai Kolkata Mumbai New Delhi",
      IsCiscoGroup: true,
      IsULCampaign: false,
      IsULGroupMapped: false,
      IsLowContacts: false,
      IsMultipleZipCode: false,
      CampaignPercentage: 70,
      CampaignType: 1,
      IsThrottlingEnable: false,
      CampaignPurposeType: 1,
      searchresultcount: 53,
      TotalContactCount: 0,
      OpenContactCount: 0,
      FreshContactCount: 0,
      ScheduleContactCount: 0,
      ClosedContactCount: 0,
      OthersContactsCount: 0,
      IsActionColumn: false,
      PredictedResult: null,
      PredictedForOpenRecords: 0,
      SequenceID: 0,
    },
    {
      SelectCampaign: false,
      CampaignGroup: "Test",
      CampaignId: "Test Campaign",
      CampaignStatus: "EXECUTING",
      StartDate: "04/01/2021 12:00:00 AM",
      EndDate: "04/21/2021 11:59:59 PM",
      StartTime: "03/22/2021 12:00:00 AM",
      EndTime: "03/22/2021 11:59:59 PM",
      Dialer: "2016/25/02",
      Channel: "Voice",
      ZoneName: "(UTC+05:30) Chennai Kolkata Mumbai New Delhi",
      IsCiscoGroup: true,
      IsULCampaign: false,
      IsULGroupMapped: false,
      IsLowContacts: false,
      IsMultipleZipCode: false,
      CampaignPercentage: 80,
      CampaignType: 1,
      IsThrottlingEnable: false,
      CampaignPurposeType: 1,
      searchresultcount: 53,
      TotalContactCount: 0,
      OpenContactCount: 0,
      FreshContactCount: 0,
      ScheduleContactCount: 0,
      ClosedContactCount: 0,
      OthersContactsCount: 0,
      IsActionColumn: false,
      PredictedResult: null,
      PredictedForOpenRecords: 0,
      SequenceID: 0,
    },
  ];
  state: any;

  componentDidMount() {
    this.setState({
      data: data,
    });
  }

  MyCommandCell = (props: any) => {
    const { dataItem } = props;
    const inEdit = dataItem[this.editField];
    const isNewItem = dataItem.ProductID === undefined;

    return inEdit ? (
      <td className="k-command-cell">
        <button
          className="k-button k-grid-save-command"
          onClick={() =>
            isNewItem ? this.add(dataItem) : this.update(dataItem)
          }
        >
          {isNewItem ? "Add" : "Update"}
        </button>
        <button
          className="k-button k-grid-cancel-command"
          onClick={() =>
            isNewItem ? this.discard(dataItem) : this.cancel(dataItem)
          }
        >
          {isNewItem ? "Discard" : "Cancel"}
        </button>
      </td>
    ) : (
      <td className="k-command-cell">
        <button
          className="k-primary k-button k-grid-edit-command"
          onClick={() => this.enterEdit(dataItem)}
        >
          Edit
        </button>
        <button
          className="k-button k-grid-remove-command"
          onClick={() =>
            confirm("Confirm deleting: " + dataItem.ProductName) &&
            this.remove(dataItem)
          }
        >
          Remove
        </button>
      </td>
    );
  };

  MyCustomCell = (props: any) => (
    <td>
      <img
        style={{ width: 24, height: 24 }}
        src={this.getImage(props.dataItem)}
        alt={this.getImage(props.dataItem)}
      />
    </td>
  );

  StatusCustomCell = (props: any) => (
    <>
      <td>
        <div
          className={`progress ${
            cssClassStatus[props.dataItem.CampaignStatus]
          }`}
        >
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: props.dataItem.CampaignPercentage + "%" }}
          >
            <span>{props.dataItem.CampaignStatus}</span>
          </div>
        </div>
        <div className="progstat">
          <span>{props.dataItem.CampaignPercentage}</span>%
        </div>
      </td>
    </>
  );

  constructor(props: any) {
    super(props);

    this.state = {
      selected: 0,
      data: [
        {
          ProductID: 1,
          ProductName: "Chai",
          SupplierID: 1,
          CategoryID: 1,
          QuantityPerUnit: "10 boxes x 20 bags",
          UnitPrice: 18,
          UnitsInStock: 39,
          UnitsOnOrder: 0,
          ReorderLevel: 10,
          Discontinued: false,
          Category: {
            CategoryID: 1,
            CategoryName: "Beverages",
            Description: "Soft drinks, coffees, teas, beers, and ales",
          },
          FirstOrderedOn: new Date(1996, 8, 20),
        },
        {
          ProductID: 2,
          ProductName: "Chang",
          SupplierID: 1,
          CategoryID: 1,
          QuantityPerUnit: "24 - 12 oz bottles",
          UnitPrice: 19,
          UnitsInStock: 17,
          UnitsOnOrder: 40,
          ReorderLevel: 25,
          Discontinued: false,
          Category: {
            CategoryID: 1,
            CategoryName: "Beverages",
            Description: "Soft drinks, coffees, teas, beers, and ales",
          },
          FirstOrderedOn: new Date(1996, 7, 12),
        },
        {
          ProductID: 3,
          ProductName: "Aniseed Syrup",
          SupplierID: 1,
          CategoryID: 2,
          QuantityPerUnit: "12 - 550 ml bottles",
          UnitPrice: 10,
          UnitsInStock: 13,
          UnitsOnOrder: 70,
          ReorderLevel: 25,
          Discontinued: false,
          Category: {
            CategoryID: 2,
            CategoryName: "Condiments",
            Description:
              "Sweet and savory sauces, relishes, spreads, and seasonings",
          },
          FirstOrderedOn: new Date(1996, 8, 26),
        },
        {
          ProductID: 4,
          ProductName: "Chef Anton's Cajun Seasoning",
          SupplierID: 2,
          CategoryID: 2,
          QuantityPerUnit: "48 - 6 oz jars",
          UnitPrice: 22,
          UnitsInStock: 53,
          UnitsOnOrder: 0,
          ReorderLevel: 0,
          Discontinued: false,
          Category: {
            CategoryID: 2,
            CategoryName: "Condiments",
            Description:
              "Sweet and savory sauces, relishes, spreads, and seasonings",
          },
          FirstOrderedOn: new Date(1996, 9, 19),
        },
        {
          ProductID: 5,
          ProductName: "Chef Anton's Gumbo Mix",
          SupplierID: 2,
          CategoryID: 2,
          QuantityPerUnit: "36 boxes",
          UnitPrice: 21.35,
          UnitsInStock: 0,
          UnitsOnOrder: 0,
          ReorderLevel: 0,
          Discontinued: true,
          Category: {
            CategoryID: 2,
            CategoryName: "Condiments",
            Description:
              "Sweet and savory sauces, relishes, spreads, and seasonings",
          },
          FirstOrderedOn: new Date(1996, 7, 17),
        },
        {
          ProductID: 6,
          ProductName: "Grandma's Boysenberry Spread",
          SupplierID: 3,
          CategoryID: 2,
          QuantityPerUnit: "12 - 8 oz jars",
          UnitPrice: 25,
          UnitsInStock: 120,
          UnitsOnOrder: 0,
          ReorderLevel: 25,
          Discontinued: false,
          Category: {
            CategoryID: 2,
            CategoryName: "Condiments",
            Description:
              "Sweet and savory sauces, relishes, spreads, and seasonings",
          },
          FirstOrderedOn: new Date(1996, 9, 19),
        },
        {
          ProductID: 7,
          ProductName: "Uncle Bob's Organic Dried Pears",
          SupplierID: 3,
          CategoryID: 7,
          QuantityPerUnit: "12 - 1 lb pkgs.",
          UnitPrice: 30,
          UnitsInStock: 15,
          UnitsOnOrder: 0,
          ReorderLevel: 10,
          Discontinued: false,
          Category: {
            CategoryID: 7,
            CategoryName: "Produce",
            Description: "Dried fruit and bean curd",
          },
          FirstOrderedOn: new Date(1996, 7, 22),
        },
        {
          ProductID: 8,
          ProductName: "Northwoods Cranberry Sauce",
          SupplierID: 3,
          CategoryID: 2,
          QuantityPerUnit: "12 - 12 oz jars",
          UnitPrice: 40,
          UnitsInStock: 6,
          UnitsOnOrder: 0,
          ReorderLevel: 0,
          Discontinued: false,
          Category: {
            CategoryID: 2,
            CategoryName: "Condiments",
            Description:
              "Sweet and savory sauces, relishes, spreads, and seasonings",
          },
          FirstOrderedOn: new Date(1996, 11, 1),
        },
        {
          ProductID: 9,
          ProductName: "Mishi Kobe Niku",
          SupplierID: 4,
          CategoryID: 6,
          QuantityPerUnit: "18 - 500 g pkgs.",
          UnitPrice: 97,
          UnitsInStock: 29,
          UnitsOnOrder: 0,
          ReorderLevel: 0,
          Discontinued: true,
          Category: {
            CategoryID: 6,
            CategoryName: "Meat/Poultry",
            Description: "Prepared meats",
          },
          FirstOrderedOn: new Date(1997, 1, 21),
        },
        {
          ProductID: 10,
          ProductName: "Ikura",
          SupplierID: 4,
          CategoryID: 8,
          QuantityPerUnit: "12 - 200 ml jars",
          UnitPrice: 31,
          UnitsInStock: 31,
          UnitsOnOrder: 0,
          ReorderLevel: 0,
          Discontinued: false,
          Category: {
            CategoryID: 8,
            CategoryName: "Seafood",
            Description: "Seaweed and fish",
          },
          FirstOrderedOn: new Date(1996, 8, 5),
        },
      ],
    };
    this.addNew = this.addNew.bind(this);
    this.itemChange = this.itemChange.bind(this);
  }

  render() {
    const isoString = new Date().toISOString();

    const options: any = { month: "long", day: "numeric", year: "numeric" };
    const date1 = new Date();
    const time: any = date1.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const date = new Date(isoString);
    const americanDate = new Intl.DateTimeFormat("en-US", options).format(date);
    return (
      <>
        <div>
          <div>
            <h4>Engagement Grid</h4>
            <Grid data={this.data1}>
              <Column
                field=""
                title=""
                width="80px"
                headerCell={(props) => (
                  <td>
                    <input type="checkbox" />
                  </td>
                )}
                cell={(props) => (
                  <td style={{}}>
                    <input type="checkbox" />
                  </td>
                )}
              />

              <Column
                field="CampaignType"
                title="Channel"
                width="100px"
                cell={this.MyCustomCell}
              />
              <Column
                field="CampaignId"
                title="Engagement Name"
                width="180px"
              />
              <Column field="CampaignGroup" title="Group" width="150px" />
              <Column
                field="CampaignStatus"
                title="Status"
                width="200px"
                cell={this.StatusCustomCell}
              />
              <Column
                field="americanDate"
                title="Start"
                width="150px"
                headerClassName="start-date"
                cell={(props) => (
                  <td className="start-date">
                    <div>{americanDate}</div>
                    <div>{time}</div>
                  </td>
                )}
              />
              <Column
                field=""
                title=""
                cell={(props) => (
                  <td>
                    <span>-</span>
                  </td>
                )}
                width="20px"
              />
              <Column
                field="americanDate"
                title="End"
                width="150px"
                cell={(props) => (
                  <td>
                    <div>{americanDate}</div>
                    <div>{time}</div>
                  </td>
                )}
              />
              <Column
                field=""
                title="Actions"
                cell={(props) => (
                  <td>
                    <button>
                      <i className="fa fa-ellipsis-v"></i>
                    </button>
                  </td>
                )}
                width="100px"
              />
            </Grid>
          </div>
          <div>
            <Grid
              style={{ height: "420px" }}
              data={this.state.data}
              onItemChange={this.itemChange}
              editField={this.editField}
            >
              <GridToolbar>
                <button
                  title="Add new"
                  className="k-button k-primary"
                  onClick={this.addNew}
                >
                  Add new
                </button>
              </GridToolbar>
              <Column
                field="ProductID"
                title="Id"
                width="50px"
                editable={false}
              />
              <Column field="ProductName" title="Product Name" width="280px" />
              <Column
                field="FirstOrderedOn"
                title="First Ordered"
                editor="date"
                format="{0:d}"
                width="150px"
              />
              <Column
                field="UnitsInStock"
                title="Units"
                width="120px"
                editor="numeric"
              />
              <Column
                field="Discontinued"
                title="Discontinued"
                editor="boolean"
                width="120px"
              />
              <Column cell={this.MyCommandCell} width="200px" />
            </Grid>
          </div>
        </div>
      </>
    );
  }

  // modify the data in the store, db etc
  remove(dataItem: any) {
    data = this.deleteItem(dataItem);
    this.setState({ data });
  }

  add(dataItem: any) {
    dataItem.inEdit = true;

    data = this.insertItem(dataItem);
    this.setState({
      data: data,
    });
  }

  update(dataItem: any) {
    dataItem.inEdit = false;
    data = this.updateItem(dataItem);
    this.setState({ data });
  }

  // Local state operations
  discard(dataItem: any) {
    data = [...this.state.data];
    data.splice(0, 1);
    this.setState({ data });
  }

  cancel(dataItem: any) {
    this.setState({ data });
  }

  enterEdit(dataItem: any) {
    this.setState({
      data: this.state.data.map((item: any) =>
        item.ProductID === dataItem.ProductID ? { ...item, inEdit: true } : item
      ),
    });
  }

  itemChange(event: any) {
    data = this.state.data.map((item: any) =>
      item.ProductID === event.dataItem.ProductID
        ? { ...item, [event.field]: event.value }
        : item
    );

    this.setState({ data });
  }

  addNew() {
    const newDataItem = { inEdit: true, Discontinued: false };
    this.setState({
      data: [newDataItem, ...this.state.data],
    });
  }

  public getImage(dataItem: any): string {
    if (dataItem.CampaignType === 1) {
        return `${process.env.PUBLIC_URL}` +"/images/black-theme-mode-list-voice-icon-24.png";
    } else if (dataItem.CampaignType === 2) {
        return `${process.env.PUBLIC_URL}` +"/images/black-theme-email-sms-icon-24.png";
    } else {
        return `${process.env.PUBLIC_URL}` +"/images/black-theme-multi-channel-icon-24_1.png";
    }
  }
  deleteItem(item: any) {
    let index = data.findIndex(
      (record: any) => record.ProductID === item.ProductID
    );
    data.splice(index, 1);
    return data;
  }

  generateId(dataInfo: any) {
      dataInfo.reduce(
      (acc: any, current: any) => Math.max(acc, current.ProductID),
      0
    ) + 1;
  }

  insertItem(item: any) {
    item.ProductID = this.generateId(data);
    item.inEdit = false;
    data.unshift(item);
    return data;
  }

  getItems() {
    return data;
  }

  updateItem(item: any) {
    let index = data.findIndex((record) => record.ProductID === item.ProductID);
    data[index] = item;
    return data;
  }
}
