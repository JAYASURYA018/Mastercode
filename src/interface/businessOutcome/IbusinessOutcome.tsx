
export interface IbusinessOutcome {
    iconInfo: string;
    rightToCreate?: boolean;
    rightToDelete?: boolean;
    rightToUpdate?: boolean;
    isMasterUser?: boolean;
    isParentOutcome?: boolean;
    isChildOutcome?: boolean;
    parentIndex?: number;
    childIndex?: number;
    error?: boolean;
    skip?: number;
    take?: number;
    sort?: any;
    gridTotal?: number;
    pageable?: any;
    pageNumber?: number;
    searchFilter?: string;
    isOutcomeSelected?: boolean;
    operationMode?: string;
    selected?: number;
    isSyncclicked?: boolean;
    flag?: boolean;
    contentName: string;
    setBoTitle: string;
    setBoDesc: string;
    deleteData?: any;
    gridData: any;
    dialer: any;
    objParentBusinessOutcome: any;
    objChildBusinessOutcome: any;
    objCreateBusinessOutcome?: any;
    deleteBOClick?: any;
    businessOutcomeList?: any;
}

export interface IbusinessOutcomeGrid {
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
    onAddOutcome: any;
    editBusinessOutcomeGroup: any;
    objChildBusinessOutcome: any;
    objParentBusinessOutcome: any;
    isChildOutcome: boolean;
    isParentOutcome: boolean;
    childIndex: number;
    parentIndex: number;
    OutsideClick: any;
    deleteParentOutcomePopOver: any;
    deleteChildOutcomePopOver: any;
    deleteBOClick: any;
    updateBusinessOutcomePopupIndex: any;
    updateChildBusinessOutcomePopupIndex: any;
}

export interface IaddBusinessOutcomeProps{
    operationMode: string;
    selected: number;
    flag: boolean;
    handleSelect: any;
    saveBusinessOutcome: any;
    saveChildBusinessOutcome: any;
    deleteParentOutcome: any;
    deleteChildOutcome: any;
    saveParentChildBusinessOutcome: any;
    validateBusinessOutcome: any;
    objCreateBusinessOutcome: any;
    handleChangeTextBox: any;
    toggleDialog: any;
}

export interface IaddBusinessOutcomeState{
    operationBoMode?: string;
    isaddBoEnabled: boolean;
    addBoEnabled: boolean;
    deleteBoUser: boolean;
    deleteChildBoUser: boolean;
    addChildBoEnabled: boolean;
    operationChildBoMode?: string;
    isaddChildBoEnabled: boolean;
    deleteBoChild: boolean;
    contentName: string;
    setBoTitle: string;
    setBoDesc: string;
    OutcomeType?: any;
    formErrors: any;
    formIsValid?: boolean;
    deleteData?: any;
    deleteChildData?: any;
    parentOutcomeList?: any;
    childOutcomeList?: any;
    outcomeGroup?: string;
}

export interface IchildBusinessOutcome{
    addChildBoEnabled: boolean;
    addBusinessOutcomeForChild: any;
    editFieldChild: any;
    childDescription: any;
    childParentName: any;
    childLeadScoreCellColumn: any;
    childOutcomeList: any;
    itemChangeForChild: any;
    MyChildCommandCell: any;
    childCelldhm: any;
    childMaxRetriesCellColumn: any;
    childAdjustPriorityCellColumn: any;
    childRetainPCBCellColumn: any;
    childCloseContactCellColumn: any;
    childBusinessOutcomeType: any;
}

export interface IstepperValue {
    isValid: boolean | undefined;
    label: string;
    text: string;
}

export interface IparentBusinessOutcome {
    parentOutcomeList: any;
    addBoEnabled: boolean;
    addBusinessOutcomeForParent: any;
    itemChangeForParent: any;
    editField: any;
    parentNameCellColumn: any;
    parentDescriptionCellColumn: any;
    MyCommandCell: any;
}


