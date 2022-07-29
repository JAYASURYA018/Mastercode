
export interface IcampaignCategory{
    gridData: any;
    dialer: any;
    iconInfo: any;
    rightToCreate ?: boolean;
    rightToDelete ?: boolean;
    rightToUpdate ?: boolean;
    isMasterUser ?: boolean;
    error ?: boolean;
    isAddCampaignCategory ?: boolean;
    skip ?: number;
    take ?: number;
    sort ?: any;
    gridTotal ?: number;
    pageable ?: any;
    pageNumber?: number;
    searchFilter?: string;
    isShowUnsubscribeGroupID?: boolean;
    masterCampaignCategoryModel ?: any;
    categoryList ?: any;
    campaignCategory?: any;
    operationFlag?: string;
    entityName?: string;
    isDeleteClick?: boolean;
    deleteData?: any;
    setCampaignCategoryTitle?: string;
    contentName?: string;
    setCampaignCategoryDesc?: string;
    formIsValid?: boolean
}


export interface IaddCampaignCategory {
    onCloseCampaignCategory: any;
    campaignCategory: any;
    handleChangeTextBox: any;
    saveCampaignCategory: any;
    operationMode: string;
    categorynameInput: any;
    formIsValid: any;
}

export interface IcampaignCategoryGrid {
    gridData: any;
    onPageChange: any;
    onSortChange: any;
    totalCount: number;
    pageable: any;
    skip: number;
    take: number;
    sortValue: any;
    searchFilter: string;
    onSearch: any;
    onAddCampaignCategory: any;
    isAddCampaignCategory: boolean;
    editCampaignCategoryMethod: any;
    ondeleteCampCategory: any;
}