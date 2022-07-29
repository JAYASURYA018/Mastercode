import { DropDownList } from '@progress/kendo-react-dropdowns';
import React, { useEffect, useState } from 'react';
import { Translation, withTranslation } from 'react-i18next';
// import ApiConstants from '../../../api-constants';
// import ApiService from '../../../services/api-manager';
import moment from 'moment';
import ListCheckboxFilter, { DateRange } from '../reportFilter/listCheckboxFilter';
import { FilterDataListEntity } from './listCheckboxFilter';

export interface ReportFilterProps {
    clickClear?: boolean;
    clickApply?: boolean;
    defaultStateOfBtn: () => void;
    mainBtnShow?: (isShow) => void;
    isFromRealtime?: boolean;
}

export interface CampaignGroupInfo {
    campaignGroupID: number;
    campaignGroupName: string;
    isSelected: boolean;
}

export interface CampaignListInfo {
    campaignID: number;
    campaignName: string;
    userType: boolean;
}

export interface GlobalListInfo {
    glId: number;
    displayName: string;
    processedTime: string;
    fileName: string;
}
export interface DaysEntity {
    label: string;
    value: number;
}

export interface CssgroupInfo {
    key: string;
    value: string;
}

export interface ReportFilter {
    GlobalList?: (GlobalListEntityOrCampaignsEntityOrCampaignGroupEntityOrSelectedListEntity)[] | null;
    Campaigns?: (GlobalListEntityOrCampaignsEntityOrCampaignGroupEntityOrSelectedListEntity)[] | null;
    CampaignGroup?: (GlobalListEntityOrCampaignsEntityOrCampaignGroupEntityOrSelectedListEntity)[] | null;
    List?: (ListEntityOrCSSGroupEntity)[] | null;
    CSSGroup?: (ListEntityOrCSSGroupEntity)[] | null;
    CSSCondition?: (CSSConditionEntity)[] | null;
}
export interface GlobalListEntityOrCampaignsEntityOrCampaignGroupEntityOrSelectedListEntity {
    id: number;
    name: string;
    isSelected: boolean;
}
export interface ListEntityOrCSSGroupEntity {
    filter: string;
    selectedCampaignId: number;
    selectedCampaign: string;
    selectedList?: (GlobalListEntityOrCampaignsEntityOrCampaignGroupEntityOrSelectedListEntity)[] | null;
}
export interface CSSConditionEntity {
    filter: string;
    selectedCampaignId: number;
    selectedCssGroupId?: number;
    selectedCssGroupName?: string;
    selectedCampaign: string;
    selectedList?: (GlobalListEntityOrCampaignsEntityOrCampaignGroupEntityOrSelectedListEntity)[] | null;
}
export interface SelectedListEntity {
    id: number;
    name: string;
    isSelected: boolean;
}

const ReportFilter = (props: ReportFilterProps) => {
    const commonNs = { ns: ['common'] };
    const defaultFilter = "Select Filter...";
    const [listArray, setListArray] = useState<ListEntityOrCSSGroupEntity[]>([]);
    const [cssGroupListArray, setCssGroupListArray] = useState<ListEntityOrCSSGroupEntity[]>([]);
    const [cssCondisionGroupListArray, setCssCondisionGroupListArray] = useState<CSSConditionEntity[]>([]);
    const [listDateRange, setListDateRange] = useState<DateRange>(null);
    const [selectedFilter, setSelectedFilter] = useState(defaultFilter);
    const [filterCampaignGroupList, setFilterCampaignGroupList] = useState<FilterDataListEntity[]>([]);
    const [isCampaignListLoaded, setIsCampaignListLoaded] = useState(false);
    const [isGlobalListLoaded, setIsGlobalListLoaded] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isCampaignGroupDataListLoaded, setIsCampaignGroupDataListLoaded] = useState(false);
    const [filterCampaignList, setFilterCampaignList] = useState<FilterDataListEntity[]>([]);
    const [filterGlobalList, setFilterGlobalList] = useState<FilterDataListEntity[]>([]);
    const [filterCssGroupList, setFilterCssGroupList] = useState<FilterDataListEntity[]>([]);
    const [filterCssConditionList, setFilterCssConditionList] = useState<FilterDataListEntity[]>([]);
    const [filterList, setFilterList] = useState<FilterDataListEntity[]>([]);
    const [selectedCampaignItems, setSelectedCampaignItems] = useState<FilterDataListEntity[]>([]);
    const [selectedCampaignGroupItems, setSelectedCampaignGroupItems] = useState<FilterDataListEntity[]>([]);
    const [selectedGlobalListItems, setSelectedGlobalListItems] = useState<FilterDataListEntity[]>([]);
    const [selectedCssGroupListItems, setSelectedCssGroupListItems] = useState<FilterDataListEntity[]>([]);
    const [selectedListItems, setSelectedListItems] = useState<FilterDataListEntity[]>([]);
    const [selectedCssConditionListItems, setSelectedCssConditionListItems] = useState<FilterDataListEntity[]>([]);
    const [isCampaignPopupSubmit, setIsCampaignPopupSubmit] = useState(false);
    const [isCampaignGroupPopupSubmit, setIsCampaignGroupPopupSubmit] = useState(false);
    const [isGlobalListPopupSubmit, setIsGlobalListPopupSubmit] = useState(false);
    const [isCssGlobalPopupSubmit, setIsCssGlobalPopupSubmit] = useState(false);
    const [isCssConditionPopupSubmit, setIsCssConditionPopupSubmit] = useState(false);
    const [isListPopupSubmit, setIsListPopupSubmit] = useState(false);
    const [isFilterDDLShow, setIsFilterDDLShow] = useState(false);
    const [isShowMainAddBtn, setIsShowMainAddBtn] = useState(false);
    const [singleSelectedCampaign, setSingleSelectedCampaign] = useState<FilterDataListEntity>(null);
    const [secondSingleSelectedCssGroup, setSecondSingleSelectedCssGroup] = useState<FilterDataListEntity>(null);
    const selectFiletrList: string[] = [defaultFilter, 'Global List', 'Campaign Group', 'Campaigns', 'List', 'CSS Group', 'CSS Condition']
    const selectFiletrListForRealtime: string[] = [defaultFilter, 'Campaign Group', 'Campaigns']

    useEffect(() => {
        getCampaignList()
        getGlobalList()
        getCampaignGroup()
    }, []);

    useEffect(() => {
        props.mainBtnShow(isShowMainAddBtn)
    }, [isShowMainAddBtn]);

    useEffect(() => {
        if (props.clickApply) {
            applyFilter()
        }
    }, [props.clickApply]);

    useEffect(() => {
        if (props.clickClear) {
            clearFilter()
        }
    }, [props.clickClear]);


    useEffect(() => {
        if (singleSelectedCampaign) {
            getCssGroups(singleSelectedCampaign.id)
        }
    }, [singleSelectedCampaign]);

    useEffect(() => {
        if (selectedGlobalListItems.length == 0 && selectedCampaignItems.length == 0 && selectedCampaignGroupItems.length == 0 && listArray.length == 0 && cssGroupListArray.length == 0 && cssCondisionGroupListArray.length == 0) {
            setIsShowMainAddBtn(true)
        }
        else {
            setIsShowMainAddBtn(false)
        }
    }, [selectedGlobalListItems, selectedCampaignItems, selectedCampaignGroupItems, listArray, cssGroupListArray, cssCondisionGroupListArray]);

    useEffect(() => {
        if (singleSelectedCampaign !== null) {
            getListInfoDateRange(singleSelectedCampaign?.id)
        }
    }, [listDateRange]);

    useEffect(() => {
        if (singleSelectedCampaign !== null) {
            if (selectedFilter === "CSS Group") {
                if (isEditMode) {
                    if (cssGroupListArray.filter((cssGList) => cssGList.selectedCampaignId === singleSelectedCampaign?.id).length <= 0) {
                        getCssGroups(singleSelectedCampaign.id)
                    }
                    else {
                        setFilterCssGroupList(filterCssGroupList);
                    }
                }
                else {
                    getCssGroups(singleSelectedCampaign.id)
                }
            }
            if (selectedFilter === "List") {
                if (isEditMode) {
                    if (listArray.filter((list) => list.selectedCampaignId === singleSelectedCampaign?.id).length <= 0) {
                        getListInfoDateRange(singleSelectedCampaign.id)
                    }
                    else {
                        setFilterList(filterList);
                    }
                }
                else {
                    getListInfoDateRange(singleSelectedCampaign.id)
                }
            }
        }
    }, [singleSelectedCampaign]);

    useEffect(() => {
        if (singleSelectedCampaign !== null && secondSingleSelectedCssGroup !== null) {
            if (selectedFilter === "CSS Condition") {
                if (isEditMode) {
                    if (cssCondisionGroupListArray.filter((list) => (list.selectedCampaignId === singleSelectedCampaign?.id) && (list.selectedCssGroupId === secondSingleSelectedCssGroup.id)).length <= 0) {
                        getCssGroupConditions(singleSelectedCampaign?.id, secondSingleSelectedCssGroup.id)
                    }
                    else {
                        setFilterCssConditionList(filterCssConditionList);
                    }
                }
                else {
                    getCssGroupConditions(singleSelectedCampaign?.id, secondSingleSelectedCssGroup.id)
                }
            }
        }
    }, [singleSelectedCampaign, secondSingleSelectedCssGroup]);

    useEffect(() => {
        if ((selectedFilter === "Campaign Group") && !isCampaignGroupDataListLoaded) {
            getCampaignGroup()
        }
        if ((selectedFilter === "Campaigns") && !isCampaignListLoaded) {
            getCampaignList()
        }
        if ((selectedFilter === "Global List") && !isGlobalListLoaded) {
            getGlobalList()
        }
    }, [selectedFilter, isCampaignGroupDataListLoaded, isCampaignListLoaded, isCampaignListLoaded]);


    const getCampaignGroup = () => {
        // ApiService.getAll(ApiConstants.campaignGroups + "?UserId=" + 1 + "&GlobalListId=" + (-1)).then((data: CampaignGroupInfo[]) => {
        //     if (data) {
        //         let filterList: FilterDataListEntity[] = [];
        //         data.forEach((item) => {
        //             filterList.push({ id: item.campaignGroupID, name: item.campaignGroupName, isSelected: item.isSelected })
        //         })
        //         setIsCampaignGroupDataListLoaded(true)
        //         setFilterCampaignGroupList(filterList)
        //     }
        // }).catch(error => { console.log(error) });
    }

    const getListInfoDateRange = (campaignId) => {
        // ApiService.getAll(ApiConstants.listInfoDateRange + "?CampaignKey=" + campaignId + "&Glid=-1&FromDate=" + (moment(new Date(listDateRange.start)).format("YYYY-MM-DD")) + "&ToDate=" + (moment(new Date(listDateRange.end)).format("YYYY-MM-DD")) + "&UserType=false").then((data: CssgroupInfo[]) => {
        //     if (data) {
        //         let filterListRes: FilterDataListEntity[] = [];
        //         data.forEach((item) => {
        //             filterListRes.push({ id: parseInt(item.key), name: item.value, isSelected: false })
        //         })
        //         setFilterList(filterListRes)
        //     }
        // }).catch(error => { console.log(error) });
    }

    const getGlobalList = () => {
        // ApiService.getAll(ApiConstants.globalList + "?UserId=" + 1).then((data: GlobalListInfo[]) => {
        //     if (data) {
        //         let filterGList: FilterDataListEntity[] = [];
        //         data.forEach((item) => {
        //             filterGList.push({ id: item.glId, name: item.displayName, isSelected: false })
        //         })
        //         setIsGlobalListLoaded(true)
        //         setFilterGlobalList(filterGList)
        //     }
        // }).catch(error => { console.log(error) });
    }

    const getCampaignList = () => {
        // ApiService.getAll(ApiConstants.campaignlist + "?UserId=" + 1 + "&Glid=" + (-1) + "&CampaignGroup=" + (-1) + "&IsULType=" + 0).then((data: CampaignListInfo[]) => {
        //     if (data) {
        //         let updatedCampaignList: FilterDataListEntity[] = [];
        //         data.forEach((item) => {
        //             updatedCampaignList.push({ id: item.campaignID, name: item.campaignName, isSelected: item.userType })
        //         })
        //         setIsCampaignListLoaded(true)
        //         setFilterCampaignList(updatedCampaignList)
        //     }
        // }).catch(error => { console.log(error) });
    }

    const getCssGroups = (selectedCampaignID) => {
        // ApiService.getAll(ApiConstants.cssGroups + "?CampaignKey=" + selectedCampaignID + "&UserType=false").then((data: CssgroupInfo[]) => {
        //     if (data) {
        //         let updatedCssGroupsList: FilterDataListEntity[] = [];
        //         data.forEach((item) => {
        //             updatedCssGroupsList.push({ id: parseInt(item.key), name: item.value, isSelected: false })
        //         })
        //         setFilterCssGroupList(updatedCssGroupsList)
        //     }
        // }).catch(error => { console.log(error) });
    }

    const getCssGroupConditions = (campaignId, cssGroupId) => {
        // ApiService.getAll(ApiConstants.cssGroupConditions + "?CampaignKey=" + campaignId + "&CustomFilterGroupId=" + cssGroupId + "&UserType=false").then((data: CssgroupInfo[]) => {
        //     if (data) {
        //         let updatedCssGroupConditions: FilterDataListEntity[] = [];
        //         data.forEach((item) => {
        //             updatedCssGroupConditions.push({ id: parseInt(item.key), name: item.value, isSelected: false })
        //         })
        //         setFilterCssConditionList(updatedCssGroupConditions)
        //     }
        // }).catch(error => { console.log(error) });
    }

    const getListLength = (listArrayParam) => {
        return (listArrayParam?.filter((item) => item.isSelected === true).length)
    }

    const handleAddFilterBtn = (selectedArray: FilterDataListEntity[], campaign: string) => {
        setIsFilterDDLShow(false)

        if (selectedFilter === "List") {
            let listArrayObj: any = [...listArray];
            let updatedlistArray = selectedArray;
            if (isEditMode) {
                listArrayObj.forEach((item) => {
                    if (item.selectedCampaignId === singleSelectedCampaign.id) {
                        item.selectedList = updatedlistArray;
                    }
                })
                if (listArray.filter((list) => list.selectedCampaignId === singleSelectedCampaign?.id).length <= 0) {
                    listArrayObj.push({ filter: "List", selectedCampaignId: singleSelectedCampaign.id, selectedCampaign: singleSelectedCampaign.name, selectedList: updatedlistArray })
                    setListArray(listArrayObj)
                }
                setListArray(listArrayObj)
            }
            else {
                listArrayObj.push({ filter: "List", selectedCampaignId: singleSelectedCampaign.id, selectedCampaign: singleSelectedCampaign.name, selectedList: updatedlistArray })
                setListArray(listArrayObj)
            }
            updatedlistArray = [];
            setSingleSelectedCampaign(null)
            setSelectedListItems(null)
            setIsEditMode(false)
        }

        if (selectedFilter === "CSS Group") {
            let cssGroupListArrayObj: any = [...cssGroupListArray];
            let updatedCssGroupListArray = selectedArray;
            if (isEditMode) {
                cssGroupListArrayObj.forEach((item) => {
                    if (item.selectedCampaignId === singleSelectedCampaign.id) {
                        item.selectedList = updatedCssGroupListArray;
                    }
                })
                if (cssGroupListArray.filter((cssList) => cssList.selectedCampaignId === singleSelectedCampaign?.id).length <= 0) {
                    cssGroupListArrayObj.push({ filter: "CSS Group", selectedCampaignId: singleSelectedCampaign.id, selectedCampaign: singleSelectedCampaign.name, selectedList: updatedCssGroupListArray })
                    setCssGroupListArray(cssGroupListArrayObj)
                }
                setCssGroupListArray(cssGroupListArrayObj)
            }
            else {
                cssGroupListArrayObj.push({ filter: "CSS Group", selectedCampaignId: singleSelectedCampaign.id, selectedCampaign: singleSelectedCampaign.name, selectedList: updatedCssGroupListArray })
                setCssGroupListArray(cssGroupListArrayObj)
            }

            updatedCssGroupListArray = [];
            setSingleSelectedCampaign(null)
            setSelectedCssGroupListItems(null)
            setIsEditMode(false)
        }

        if (selectedFilter === "CSS Condition") {
            let cssCondisionGroupListArrayObj: any = [...cssCondisionGroupListArray];
            let updatedcssCondisionGroupListArray = selectedArray;
            if (isEditMode) {
                cssCondisionGroupListArrayObj.forEach((item) => {
                    if ((item.selectedCampaignId === singleSelectedCampaign.id) && (item.selectedCssGroupId === secondSingleSelectedCssGroup.id)) {
                        item.selectedList = updatedcssCondisionGroupListArray;
                    }
                })
                if (cssCondisionGroupListArray.filter((cssList) => (cssList.selectedCampaignId === singleSelectedCampaign?.id) && (cssList.selectedCssGroupId === secondSingleSelectedCssGroup.id)).length <= 0) {
                    cssCondisionGroupListArrayObj.push({ filter: "CSS Condition", selectedCampaignId: singleSelectedCampaign.id, selectedCssGroupId: secondSingleSelectedCssGroup.id, selectedCssGroupName: secondSingleSelectedCssGroup.name, selectedCampaign: singleSelectedCampaign.name, selectedList: updatedcssCondisionGroupListArray })
                    setCssCondisionGroupListArray(cssCondisionGroupListArrayObj)
                }
                setCssCondisionGroupListArray(cssCondisionGroupListArrayObj)
            }
            else {
                cssCondisionGroupListArrayObj.push({ filter: "CSS Condition", selectedCampaignId: singleSelectedCampaign.id, selectedCssGroupId: secondSingleSelectedCssGroup.id, selectedCssGroupName: secondSingleSelectedCssGroup.name, selectedCampaign: singleSelectedCampaign.name, selectedList: updatedcssCondisionGroupListArray })
                setCssCondisionGroupListArray(cssCondisionGroupListArrayObj)
            }
            updatedcssCondisionGroupListArray = [];
            setSingleSelectedCampaign(null)
            setSecondSingleSelectedCssGroup(null)
            setSelectedCssConditionListItems(null)
            setIsEditMode(false)
        }
    }

    const handleEditClick = (listWithCheck: GlobalListEntityOrCampaignsEntityOrCampaignGroupEntityOrSelectedListEntity[], selectedFilterName: string) => {
        setIsEditMode(true)
        if (selectedFilterName === "List") {
            setFilterList(listWithCheck);
        }
        if (selectedFilterName === "CSS Group") {
            setFilterCssGroupList(listWithCheck);
        }
        if (selectedFilterName === "CSS Condition") {
            setFilterCssConditionList(listWithCheck);
        }
        setSelectedFilter(selectedFilterName)
    }

    const deleteFromList = (deleteId: number, allItems: CSSConditionEntity[], filter: string) => {
        let filtered: CSSConditionEntity[] = allItems.filter((item) => item.selectedCampaignId !== deleteId);

        if (filter === "List") {
            setListArray(filtered);
        }
        if (filter === "CSS Group") {
            setCssGroupListArray(filtered);
        }

        if (filter === "CSS Condition") {
            setCssCondisionGroupListArray(filtered);
        }
    }

    const applyFilter = () => {
        let filterObj: ReportFilter = {
            GlobalList: selectedGlobalListItems,
            Campaigns: selectedCampaignItems,
            CampaignGroup: selectedCampaignGroupItems,
            List: listArray,
            CSSGroup: cssGroupListArray,
            CSSCondition: cssCondisionGroupListArray
        }

        console.log("filterObj : ", filterObj)
        props.defaultStateOfBtn()
        setIsShowMainAddBtn(true)
    }

    const clearFilter = () => {
        setSelectedGlobalListItems([])
        setSelectedCampaignItems([])
        setSelectedCampaignGroupItems([])
        setListArray([])
        setCssGroupListArray([])
        setCssCondisionGroupListArray([])
        setIsCampaignPopupSubmit(false);
        setIsCampaignGroupPopupSubmit(false)
        setIsGlobalListPopupSubmit(false)
        setSelectedFilter(defaultFilter);
        props.defaultStateOfBtn()
    }

    return (
        <Translation ns={['common', 'os', 'camp']}>
            {
                (t) =>
                    <>
                        {((selectedFilter === "Campaigns") || isCampaignPopupSubmit) &&
                            <>
                                <div className="row mt-2 mx-0">
                                    <div className="col-md-6">
                                        <label id={"Campaigns-Select"} className="">Campaigns</label>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <label className="p-1" role="button" onClick={() => { setIsCampaignPopupSubmit(false); setIsFilterDDLShow(false); setSelectedFilter(""); setSelectedCampaignItems([]) }} title="Delete Campaigns">Delete</label>
                                    </div>
                                </div>
                                <div className="row mx-0">
                                    <div className="col-md-12">
                                        <p onClick={() => setSelectedFilter("Campaigns")} id="Campaigns" aria-label="Campaigns" onChange={(e: any) => { }} className="border p-1" > <b className="selected-data camp">{"Selected . " + getListLength(selectedCampaignItems)}</b>
                                        </p>
                                    </div>
                                </div>
                            </>
                        }

                        {listArray.map((listItem) => {
                            return (
                                <>
                                    {((selectedFilter === "List") || isListPopupSubmit) &&
                                        <div className="row mt-2 mx-0">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label id={"List"} className="text-left">List</label>
                                                    </div>

                                                    <div className="col-md-6 text-right">
                                                        <label className="p-1" role="button" onClick={() => { deleteFromList(listItem.selectedCampaignId, listArray, "List") }} title="Delete List">Delete</label>
                                                    </div>
                                                </div>

                                                <p className="border p-1" onClick={() => { handleEditClick(listItem.selectedList, "List") }}>
                                                    <b>{listItem.selectedCampaign}</b><br />
                                                    <b className="selected-data list">Selected . {getListLength(listItem.selectedList)}</b><br />
                                                </p>
                                            </div>
                                        </div>
                                    }
                                </>
                            )
                        })
                        }
                        {((selectedFilter === "Campaign Group") || isCampaignGroupPopupSubmit) &&
                            <>
                                <div className="row mt-2 mx-0">
                                    <div className="col-md-6">
                                        <label id={"Campaigns-Select"} className="">Campaigns Group</label>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <label className="p-1" role="button" onClick={() => { setIsCampaignGroupPopupSubmit(false); setIsFilterDDLShow(false); setSelectedFilter(defaultFilter); setSelectedCampaignGroupItems([]) }} title="Delete Campaign Group">Delete</label>
                                    </div>
                                </div>
                                <div className="row mx-0">
                                    <div className="col-md-12">
                                        <p onClick={() => setSelectedFilter("Campaign Group")} id="CampaignGroup" aria-label="CampaignGroup" onChange={(e: any) => { }} className="border p-1" ><b className="selected-data camp">{"Selected . " + getListLength(selectedCampaignGroupItems)}</b></p>
                                    </div>
                                </div>
                            </>
                        }

                        {((selectedFilter === "Global List") || isGlobalListPopupSubmit) &&
                            <>
                                <div className="row mt-2 mx-0 ">
                                    <div className="col-md-6">
                                        <label id={"Global-List"} className="">Global List</label>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <label className="p-1" role="button" onClick={() => { console.log("this is click"); setIsGlobalListPopupSubmit(false); setIsFilterDDLShow(false); setSelectedFilter(defaultFilter); setSelectedGlobalListItems([]) }} title="Delete Global List">Delete</label>
                                    </div>
                                </div>
                                <div className="row mx-0">
                                    <div className="col-md-12">
                                        <p onClick={() => setSelectedFilter("Global List")} id="CampaignGroup" aria-label="GlobalList" onChange={(e: any) => { }} className="border p-1" ><b className="selected-data list">{"Selected . " + getListLength(selectedGlobalListItems)}</b></p>
                                    </div>
                                </div>
                            </>
                        }

                        {cssGroupListArray.map((cssGListItem) => {
                            return (
                                <>
                                    {((selectedFilter === "CSS Group") || isCssGlobalPopupSubmit) &&
                                        <>
                                            <div className="row mt-2 mx-0">
                                                <div className="col-md-6">
                                                    <label id={"CSSGroup"} className="">CSS Group</label>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                    <label className="p-1" role="button" onClick={() => { deleteFromList(cssGListItem.selectedCampaignId, cssGroupListArray, "CSS Group") }} title="Delete CSS Group">Delete</label>
                                                </div>
                                            </div>
                                            <div className="row mx-0">
                                                <div className="col-md-12">
                                                    <p className="border p-1" onClick={() => { handleEditClick(cssGListItem.selectedList, "CSS Group") }}>
                                                        <b>{cssGListItem.selectedCampaign}</b><br />
                                                        <b className="selected-data grp">Selected . {getListLength(cssGListItem.selectedList)}</b><br />
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </>
                            )
                        })
                        }
                        {cssCondisionGroupListArray.map((cssConditionGListItem) => {
                            return (
                                <>
                                    {((selectedFilter === "CSS Condition") || isCssConditionPopupSubmit) &&
                                        <>
                                            <div className="row mt-2 mx-0">
                                                <div className="col-md-6">
                                                    <label id={"CSSCondition"} className="mb-2">CSS Condition</label>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                    <label className="" role="button" onClick={() => { deleteFromList(cssConditionGListItem.selectedCampaignId, cssCondisionGroupListArray, "CSS Condition") }} title="Delete CSS Condition">Delete</label>                                                </div>
                                            </div>
                                            <div className="row mx-0">
                                                <div className="col-md-12">
                                                    <p className="border p-1" onClick={() => { handleEditClick(cssConditionGListItem.selectedList, "CSS Condition") }}>
                                                        <b>{cssConditionGListItem.selectedCampaign}</b><br />
                                                        <b>{cssConditionGListItem.selectedCssGroupName}</b><br />
                                                        <b className="selected-data grp">Selected . {getListLength(cssConditionGListItem.selectedList)}</b><br />
                                                    </p>
                                                </div>
                                            </div>

                                        </>
                                    }
                                </>
                            )
                        })
                        }
                        {isFilterDDLShow && <>
                            <div className="row mt-2 mx-0">
                                <div className="col-md-6">
                                    <label id={"CSSCondition"} onChange={(e) => { }} className="mb-2 primary cursor">{defaultFilter}</label>
                                </div>
                                <div className="col-md-6 text-right">
                                    <label className="" role="button" title="Delete CSS Condition">Delete</label>
                                </div>
                            </div>
                            <div className="row mx-0">
                                <div className="col-md-12">
                                    <DropDownList defaultValue={defaultFilter} data={props.isFromRealtime ? selectFiletrListForRealtime : selectFiletrList} value={selectedFilter} onChange={(e) => { setSelectedFilter(e.target.value) }} title="Select filter" />
                                </div>
                            </div>
                        </>
                        }
                        {(!isFilterDDLShow) &&
                            <div className="row mt-1 mx-0">
                                <div className="col-md-12">
                                    {isShowMainAddBtn ?
                                        <div className="text-center mt-4">
                                            <button type="button" onClick={() => { setIsFilterDDLShow(true) }} title="Add Filter" className="k-button k-secondary PopupBtn"> + Add Filter</button>
                                        </div>
                                        :
                                        <button type="button" onClick={() => { setIsFilterDDLShow(true) }} title="Add Filter" className="link-btn"> + Add</button>
                                    }
                                </div>
                            </div>
                        }

                        <div onClick={(event) => event.stopPropagation()} className="c-header-nav-items">
                            {selectedFilter === "Global List" &&
                                <div className="filter global-list  pt-0">
                                <ListCheckboxFilter selectedFilter={selectedFilter} isPopUpApplyBtnClick={() => { setSelectedFilter(defaultFilter); setIsGlobalListPopupSubmit(true); setIsFilterDDLShow(false) }} getSelectedItems={(globalListItems) => setSelectedGlobalListItems(globalListItems)} listData={filterGlobalList} isAllList={false} isAllListSelected={false} />
                                </div>
                            }
                            {selectedFilter === "Campaign Group" &&
                                <div className="filter campaign-group pt-0">
                                <ListCheckboxFilter selectedFilter={selectedFilter} isPopUpApplyBtnClick={() => { setSelectedFilter(defaultFilter); setIsCampaignGroupPopupSubmit(true); setIsFilterDDLShow(false) }} getSelectedItems={(campaignGroupList) => setSelectedCampaignGroupItems(campaignGroupList)} listData={filterCampaignGroupList} isAllList={false} isAllListSelected={false} />
                                </div>
                            }
                            {selectedFilter === "Campaigns" &&
                                <div className="filter campaings-filter pt-0">
                                <ListCheckboxFilter selectedFilter={selectedFilter} isPopUpApplyBtnClick={() => { setSelectedFilter(defaultFilter); setIsCampaignPopupSubmit(true); setIsFilterDDLShow(false) }} getSelectedItems={(selectedList) => { setSelectedCampaignItems(selectedList); }} listData={filterCampaignList} isAllList={false} isAllListSelected={false} />
                                </div>
                            }
                            {selectedFilter === "List" &&
                                <div className="filter list-filter pt-0" >
                                <ListCheckboxFilter getSelectedDateRange={(dateVal) => setListDateRange(dateVal)} selectedFilter={selectedFilter} singleSelectionList={filterCampaignList} isDoubleLevelSelection={true} singleSelectedItem={(item) => setSingleSelectedCampaign(item)} isPopUpApplyBtnClick={() => { setSelectedFilter(defaultFilter); handleAddFilterBtn(selectedListItems, singleSelectedCampaign.name); setIsListPopupSubmit(true) }} getSelectedItems={(selectedList) => { setSelectedListItems(selectedList); }} listData={filterList} isAllList={false} isAllListSelected={false} />
                                </div>
                            }
                            {selectedFilter === "CSS Group" &&
                                <div className="filter css-group pt-0" >
                                <ListCheckboxFilter selectedFilter={selectedFilter} singleSelectionList={filterCampaignList} isDoubleLevelSelection={true} singleSelectedItem={(item) => setSingleSelectedCampaign(item)} isPopUpApplyBtnClick={() => { setSelectedFilter(defaultFilter); handleAddFilterBtn(selectedCssGroupListItems, singleSelectedCampaign.name); setIsCssGlobalPopupSubmit(true) }} getSelectedItems={(selectedCssGList) => { setSelectedCssGroupListItems(selectedCssGList); }} listData={filterCssGroupList} isAllList={false} isAllListSelected={false} />
                                </div>
                            }
                            {selectedFilter === "CSS Condition" &&
                                <div className="filter pt-0">
                                <ListCheckboxFilter selectedFilter={selectedFilter} singleSelectionList={filterCampaignList} isDoubleLevelSelection={true} isTripleLevelSelection={true} secondSingleSelectionList={filterCssGroupList} singleSelectedItem={(item) => setSingleSelectedCampaign(item)} secondSingleSelectedItem={(singleCssList) => { setSecondSingleSelectedCssGroup(singleCssList) }} isPopUpApplyBtnClick={() => { setSelectedFilter(defaultFilter); handleAddFilterBtn(selectedCssConditionListItems, singleSelectedCampaign.name); setIsCssConditionPopupSubmit(true) }} getSelectedItems={(selectedList) => { setSelectedCssConditionListItems(selectedList) }} listData={filterCssConditionList} isAllList={false} isAllListSelected={false} />
                                </div>
                            }
                        </div>
                    </>
            }
        </Translation>
    );
}
export default withTranslation(['common'])(ReportFilter)
