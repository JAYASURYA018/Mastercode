import React, { useEffect } from 'react';
import { useState } from 'react';
import { Translation, withTranslation } from 'react-i18next';
import {
    Grid,
    GridColumn as Column
} from "@progress/kendo-react-grid";
import { Checkbox } from '@progress/kendo-react-inputs';
import SearchBarFilter from '../reportFilter/searchBarFilter';
import _ from 'underscore';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
// import DropDownControl from '../dropDownControl';
import { DaysEntity } from './reportFilter';
import DropDownControl from '../common/dropDownControl';
const DropDown = DropDownControl(DropDownList);

export interface ListCheckboxFilterProps {
    listData?: FilterDataListEntity[];
    singleSelectionList?: FilterDataListEntity[];
    secondSingleSelectionList?: FilterDataListEntity[];
    isAllList: any;
    isAllListSelected: boolean;
    getSelectedItems: (updatedListData) => void;
    singleSelectedItem?: any;
    secondSingleSelectedItem?: any;
    isDoubleLevelSelection?: boolean;
    isTripleLevelSelection?: boolean;
    isPopUpApplyBtnClick?: any;
    getSelectedDateRange?: (dateVal) => void;
    selectedFilter?: string;

}

export interface FilterDataListEntity {
    id: number;
    name: string;
    isSelected: boolean;
}
export interface Count {
    total: number;
    selected: number;
}
export interface DateRange {
    start: Date;
    end: Date;
}

const ListCheckboxFilter = (props: ListCheckboxFilterProps) => {
    const commonNs = { ns: ['common'] };

    const [dataList, setDataList] = useState<FilterDataListEntity[]>([]);
    const [isDataListSelectAll, setIsDataListSelectAll] = useState(props?.isAllListSelected);
    const [selectedSigleItem, setSelectedSigleItem] = useState<FilterDataListEntity>(null);
    const [selectedSecondSigleItem, setSecondSelectedSigleItem] = useState<FilterDataListEntity>(null);
    const [selectedDataList, setSelectedDataList] = useState(0);
    const [searchState, setSearchState] = useState("");
    const [isOnBlurDatePicker, setIsOnBlurDatePicker] = useState(false);
    const daysList: DaysEntity[] = [{ label: "Select Days", value: 0 }, { label: "Last 7 days", value: 7 }, { label: "Last 14 days", value: 14 }, { label: "Last 30 days", value: 30 }, { label: "Last 3 months", value: 90 }]
    let today = new Date();
    const [dateRange, setDateRange] = useState<DateRange>({ start: today, end: today });
    let copyListData: FilterDataListEntity[] = props.listData;

    useEffect(() => {
        setDataList(props.listData)
        setSelectedDataList(props.listData.filter((item) => item.isSelected === true).length)
    }, [props.listData]);

    useEffect(() => {
        props.getSelectedItems(dataList);
    }, [dataList]);

    useEffect(() => {
        if (props.selectedFilter === "List") {
            props.getSelectedDateRange(dateRange)
        }
    }, [props.selectedFilter]);

    useEffect(() => {
        if (props.selectedFilter === "List" && isOnBlurDatePicker) {
            props.getSelectedDateRange(dateRange)
        }
    }, [dateRange, isOnBlurDatePicker]);

    useEffect(() => {
        setSearchState("")
    }, [selectedSigleItem, selectedSecondSigleItem]);

    useEffect(() => {
        copyListData = [...dataList];
        setIsDataListSelectAll(dataList.length > 0 ? (dataList.filter((item) => item.isSelected === true).length === dataList.length ? true : false) : false)
    }, [dataList]);

    const getLastDaysDate = (days: number) => {
        let priorDate = new Date(new Date().setDate(today.getDate() - days));
        return priorDate;
    }

    const handleCheckBoxOnChange = (e: any, dataItem: FilterDataListEntity | null, fromAllSelect: boolean) => {
        copyListData.forEach((item) => {
            if (fromAllSelect) {
                item.isSelected = e.target.value;
            }
            else {
                if (item.id === dataItem?.id) {
                    item.isSelected = e.target.value;
                }
                setIsDataListSelectAll(copyListData.filter((listItem) => listItem.isSelected === true).length === dataList.length ? true : false)
            }
        })
        setSelectedDataList(copyListData.filter((item) => item.isSelected === true).length)

        setDataList(copyListData);
    }

    return (
        <Translation ns={['statelaw', 'common', 'camp']}>
            {
                (t) => <>

                    <div className="row my-3 mx-0">
                        <div className="col-md-8">
                            <SearchBarFilter inputVal={searchState} searchText={(searchParam) => setSearchState(searchParam)} />
                        </div>
                        <div className="col-md-2">
                            {selectedSigleItem &&
                                <span className={"d-inline-block"}>
                                    <a onClick={() => { setSelectedSigleItem(selectedSecondSigleItem !== null ? selectedSigleItem : null); setSecondSelectedSigleItem(null) }} role="button" aria-label="backward" id="backward"><i title="Back" className="icon-tool-left"></i></a>
                                </span>
                            }
                        </div>
                        {((selectedSigleItem === null && selectedSecondSigleItem === null) ? true : (selectedSigleItem ? selectedSigleItem : selectedSecondSigleItem)) &&
                            <div className="col-md-2 border-left">
                                <span className={"d-inline-block"}>
                                    <a onClick={() => { props.isPopUpApplyBtnClick(true) }} role="button" aria-label="forward" id="forward"><i title="Close Menu" className="icon-tool-forward"></i></a>
                                </span>
                            </div>
                        }
                    </div>

                    {(props.selectedFilter === "List") && (selectedSigleItem !== null) &&
                        <div className="row mt-3 mx-0">
                            <div className="col-md-12">
                                <label className="w-50">Date Range</label>
                                <DropDown data={daysList}
                                    textField="label"
                                    valueField="value"
                                    defaultValue={0}
                                    name="daysList"
                                    id="daysList"
                                    aria-label="daysList"
                                    aria-describedby="daysList" className="day-list"
                                    onChange={(event) => { setDateRange({ start: getLastDaysDate(event.target.value), end: today }) }} />
                            </div>
                            <div className="col-md-12 mb-3">
                            <DateRangePicker format="MMM d, yyyy" onBlur={() => setIsOnBlurDatePicker(isOnBlurDatePicker ? false : true)} onChange={(event) => { setDateRange(event.target.value) }} value={dateRange} />
                            </div>
                        </div>
                    }
                    {((props.isDoubleLevelSelection) && selectedSigleItem === null) &&
                        <div className="list-data-filter">
                            <label className="px-3 mb-2 d-inline-block pt-2">Campaign <span className="dot"> . </span>{props.singleSelectionList.length}</label>
                            {props.singleSelectionList?.filter((listItem) => listItem.name.toLowerCase().includes(searchState.toLowerCase())).map((listItem) => {
                                return (<>
                                    <a className="px-3 d-block" role="button" onClick={() => { props.singleSelectedItem(listItem); setSelectedSigleItem(listItem) }} title={listItem.name}>{listItem.name}</a>
                                </>
                                )
                            })
                            }
                        </div>
                    }
                    {((props.isTripleLevelSelection) && selectedSecondSigleItem === null && selectedSigleItem !== null) &&
                        <div className="list-data-filter">
                            <label className="px-3 mb-2 d-block">Css Group <span className="dot" > . </span> {props.secondSingleSelectionList.length}</label>
                            {props.secondSingleSelectionList?.filter((listItem) => listItem.name.toLowerCase().includes(searchState.toLowerCase())).map((listItem) => {
                                return (<>
                                    <a className="px-3 py-2 d-block" role="button" onClick={() => { props.secondSingleSelectedItem(listItem); setSecondSelectedSigleItem(listItem) }} title="Select Css Condition">{listItem.name}</a><br />
                                </>
                                )
                            })
                            }
                        </div>
                    }
                    {((props.isDoubleLevelSelection) ? (props.isTripleLevelSelection ? (selectedSecondSigleItem !== null) : (selectedSigleItem !== null)) : props.isTripleLevelSelection ? (selectedSecondSigleItem !== null) : true) &&
                        <Grid
                            data={dataList.filter((listItem) => listItem.name.toLowerCase().includes(searchState.toLowerCase()))}
                            className="bg-dark">
                            <Column field=""
                                title=""
                                headerCell={() => (
                                    <>  <span className="my-2 d-inline-block">
                                        <Checkbox label={props.selectedFilter} disabled={false} id={"list-SelectAll"}
                                            defaultChecked={isDataListSelectAll} onChange={(event: any) => { setIsDataListSelectAll(event.target.value); handleCheckBoxOnChange(event, null, true); }}
                                            aria-label={"list-SelectAll"} name={"list-SelectAll"} />
                                        <span className='dot'> .</span> {dataList.length}</span>
                                        <span className="my-2 pr-2 text-right pull-right">Selected <span className='dot'>.</span> {selectedDataList}</span>
                                    </>
                                )}
                                cell={(cellProps) => (
                                    <td className={cellProps.className} style={cellProps.dataItem.isSelected ? { backgroundColor: "#ffe9dd" } : {}}>
                                        <div style={{ display: 'inline-block' }}>
                                            <Checkbox label={cellProps.dataItem.name} disabled={false} defaultChecked={cellProps.dataItem.isSelected} id={"list-Select" + cellProps.dataIndex}
                                                aria-label={"list-Select" + cellProps.dataIndex} name={"list-Select" + cellProps.dataIndex} onChange={(event) => { handleCheckBoxOnChange(event, cellProps.dataItem, false) }} />                                              
                                        </div>
                                    </td>
                                )}
                            />
                        </Grid>
                    }
                </>
            }
        </Translation>
    );
}
export default withTranslation(['statelaw', 'common', 'camp'])(ListCheckboxFilter)