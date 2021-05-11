import { networkCall } from "../../utils/APIUtils";

import { endpoints } from "../endpoints";

import UserService from ".";

class UserAPIService implements UserService {
	getUsersDetailsAPI() {
		return networkCall(endpoints.getUsersDetailsAPI);
	}
	getUserWeeklyTimeSheet(request) {
		return networkCall(
			`${endpoints.getUserWeeklyTimeSheet}/?date=${request.selected_date}`
		);
	}
}

export default UserAPIService;
