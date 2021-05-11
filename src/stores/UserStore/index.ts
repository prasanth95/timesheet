import { action, computed, observable } from "mobx";

import {
	APIStatus,
	API_INITIAL,
	API_FETCHING,
	API_SUCCESS,
	API_FAILURE,
} from "../../constants/APIConstants";
import UserService from "../../services/UserService";
import { isObjectNotEmpty } from "../../utils/CommonUtils";

import TimeSheetDetails from "../models/TimeSheetDetails";
import { UserDetails } from "../types";
class UserStore {
	@observable getUserDetailsAPIStatus!: APIStatus;
	@observable getUserDetailsAPIError;
	@observable userDetails!: UserDetails | {};

	@observable getUserWeeklyTimeSheetAPIStatus!: APIStatus;
	@observable getUserWeeklyTimeSheetAPIError;
	@observable userWeeklyTimeSheetDetails;
	@observable userSelectedDate!: string;
	usersService: UserService;
	constructor(service) {
		this.usersService = service;
		this.initStore();
	}

	@action.bound
	initStore() {
		this.getUserDetailsAPIStatus = API_INITIAL;
		this.userDetails = {};

		this.getUserWeeklyTimeSheetAPIStatus = API_INITIAL;
		this.userWeeklyTimeSheetDetails = {};
	}

	@action.bound
	setUserDetailsAPIStatus(status: APIStatus) {
		this.getUserDetailsAPIStatus = status;
	}

	@action.bound
	setUserDetailsAPIError(error) {
		this.getUserDetailsAPIError = error;
	}
	@action.bound
	setUserDetails(userDetails: UserDetails) {
		this.userDetails = userDetails;
	}

	@action.bound
	getUsersDetailsAPI() {
		this.setUserDetailsAPIStatus(API_FETCHING);
		const userDetailsPromise = this.usersService.getUsersDetailsAPI();
		return userDetailsPromise
			.then((response) => {
				this.setUserDetails(response);
				this.setUserDetailsAPIStatus(API_SUCCESS);
			})
			.catch((error) => {
				this.setUserDetailsAPIError(error);
				this.setUserDetailsAPIStatus(API_FAILURE);
			});
	}

	isUserDetailsAvailable(): boolean {
		if ("name" in this.userDetails) {
			return true;
		}
		return false;
	}

	@action.bound
	setUserSelectedDate(date: string) {
		this.userSelectedDate = date;
	}

	@action.bound
	setGetUserWeeklyTimeSheetAPIError(error) {
		this.getUserWeeklyTimeSheetAPIError = error;
	}

	@action.bound
	setUserWeeklyTimeSheetDetails(response) {
		if (
			response &&
			response.time_sheet_details &&
			isObjectNotEmpty(response.time_sheet_details)
		) {
			this.userWeeklyTimeSheetDetails = new TimeSheetDetails(
				response.time_sheet_details
			);
		} else {
			this.userWeeklyTimeSheetDetails = {};
		}
	}

	@action.bound
	setGetUserWeeklyTimeSheetAPIStatus(status: APIStatus) {
		this.getUserWeeklyTimeSheetAPIStatus = status;
	}

	@action.bound
	getUserWeeklyTimeSheet() {
		this.setGetUserWeeklyTimeSheetAPIStatus(API_FETCHING);
		const requestObject = {
			selected_date: this.userSelectedDate,
		};
		const userWeeklyTimeSheetPromise = this.usersService.getUserWeeklyTimeSheet(
			requestObject
		);
		return userWeeklyTimeSheetPromise
			.then((response) => {
				this.setUserWeeklyTimeSheetDetails(response);
				this.setGetUserWeeklyTimeSheetAPIStatus(API_SUCCESS);
			})
			.catch((error) => {
				this.setGetUserWeeklyTimeSheetAPIError(error);
				this.setGetUserWeeklyTimeSheetAPIStatus(API_FAILURE);
			});
	}

	@computed
	get isUserTimeSheetAvailable() {
		return isObjectNotEmpty(this.userWeeklyTimeSheetDetails);
	}
}

export default UserStore;
