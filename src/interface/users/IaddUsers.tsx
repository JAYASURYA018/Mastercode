interface IAddUsersState {
	userType?: any;
	userMode?: any;
	isCreateUserInDomain: boolean;
	isDBUserCreation: boolean;
	isSSOAuthenticationEnabled: boolean;
	sfvalidateSuccess: boolean;
	userInfo?: any;
	isSSOEnabled?: any;
	isDomainAccountOption: boolean;
	selected: any;
	formErrors?: any;
	searchFilterRoles?: any;
	handleChangeTextBox?: any
	validatesalesforcedetails?: any;
	validateSalesForceCredentials?: any;
	isSSOConfigEnabledService?: any;
	selectAvailableRolesMethod?: any;
	selectAssignedRolesMethod: any;
	handleItemClick?: any;
	patternPassword: boolean;
	patternMphone: boolean;
	patternHphone: boolean;
	patternEmail: boolean;
	userInfoFormErrors?: any;
	handleFormValidation?:any
}

export default IAddUsersState