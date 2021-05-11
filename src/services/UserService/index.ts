import {
	UserDetails,
	UserWeeklyTimeSheetDetails,
	GetUserWeeklyTimeSheetRequest,
} from "../../stores/types";

interface UserService {
	getUsersDetailsAPI(): Promise<UserDetails>;

	getUserWeeklyTimeSheet(
		requestObject: GetUserWeeklyTimeSheetRequest
	): Promise<UserWeeklyTimeSheetDetails>;
}

export default UserService;
