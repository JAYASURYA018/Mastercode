
interface IUsersState {
	gridData?: any;
	error?: boolean;
	visible?: boolean;
	skip?: any;
	take?: any;
	sort?: any;
	usersTotal?: any;
	pageable?: any;
	pageNumber?: any;
	searchFilter?: any;
	userType?: any;
	userMode?: any;
	isCreateUserInDomain: boolean;
	isDBUserCreation: boolean;
	isSSOAuthenticationEnabled: boolean;
	sfvalidateSuccess: boolean;
	userInfo?: any;
	isSSOEnabled?: any;
	currentUserPassword?: any;
	userInfoOrginalData?: any;
	validatesalesforcedetails: any;
	isSSOConfigEnabledService: boolean;
	isDomainAccountOption: boolean;
	selected: any;
	formErrors?: any;
	searchFilterRoles?: any;
	usersModel: [];
	rightToCreate?: boolean;
	rightToDelete?: boolean;
	rightToUpdate?: boolean;
	rightUsersToCreate?: boolean;
	rightUsersToDelete?: boolean;
	rightUsersToUpdate?: boolean;
	rightRolesToView?: boolean;
	rightRolesToCreate?: boolean;
	rightRolesToUpdate?: boolean;
	rightRolesToDelete?: boolean;
	userTabs: boolean
	rolesTabs: boolean;
	roleList?: any;
	patternPassword: boolean;
	patternUseridentity: boolean;
	patternMphone: boolean;
	patternHphone: boolean;
	patternEmail: boolean;
	deleteUserDialog: boolean;
	deleteUserData?:any
}
export default IUsersState;