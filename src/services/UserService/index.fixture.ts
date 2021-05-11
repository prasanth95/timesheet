import getUserDetails from "../../fixtures/getUserDetails.json";
import getWeeklyTimeSheet from "../../fixtures/getWeeklyTimeSheet.json";
import { resolveWithTimeout } from "../../utils/APIUtils";

import UserService from ".";

class UserFixtureService implements UserService {
	getUsersDetailsAPI() {
		return resolveWithTimeout(getUserDetails);
	}
	getUserWeeklyTimeSheet(request) {
		return resolveWithTimeout(getWeeklyTimeSheet[request.selected_date]);
	}
}

export default UserFixtureService;
