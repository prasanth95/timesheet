import { action, computed, observable } from "mobx";

import { isObjectNotEmpty } from "../../../utils/CommonUtils";

import { UserTimeSheetDetails } from "../../types";

import TimeSheetTypeDetails from "../TimeSheetTypeDetails";
import TotalHours from "../TotalHours";

class TimeSheetDetails {
	@observable ohtaDetails;
	@observable claDetails;
	@observable holidayDetails;
	@observable ptoDetails;
	@observable total;
	constructor(timeSheetDetails: UserTimeSheetDetails) {
		this.setTimeSheetDetails(timeSheetDetails);
	}

	@action.bound
	setTimeSheetDetails(timeSheetDetails: UserTimeSheetDetails) {
		const { OHTA, CLA, HOLIDAY, PTO, total } = timeSheetDetails;
		isObjectNotEmpty(OHTA) &&
			(this.ohtaDetails = new TimeSheetTypeDetails(OHTA));

		isObjectNotEmpty(CLA) &&
			(this.claDetails = new TimeSheetTypeDetails(CLA));

		isObjectNotEmpty(HOLIDAY) &&
			(this.holidayDetails = new TimeSheetTypeDetails(HOLIDAY));

		isObjectNotEmpty(PTO) &&
			(this.ptoDetails = new TimeSheetTypeDetails(PTO));

		this.total = new TotalHours(total);
	}

	@computed
	get getTimeSheetTypesInfo() {
		return {
			ohtaDetailsAvailable: this.ohtaDetails,
			claDetailsAvailable: this.claDetails,
			holidayDetailsAvailable: this.holidayDetails,
			ptoDetailsAvailable: this.ptoDetails,
		};
	}

	getDisplayRelatedInfo() {
		return [
			{
				isAvailable: this.getTimeSheetTypesInfo.ohtaDetailsAvailable,
				displayText: 'OHTA',
				details: this.ohtaDetails
			},
			{
				isAvailable: this.getTimeSheetTypesInfo.claDetailsAvailable,
				displayText: 'CLA',
				details: this.claDetails
			},
			{
				isAvailable: this.getTimeSheetTypesInfo.holidayDetailsAvailable,
				displayText: 'HOLIDAY',
				details: this.holidayDetails
			},
			{
				isAvailable: this.getTimeSheetTypesInfo.ptoDetailsAvailable,
				displayText: 'PTO',
				details: this.ptoDetails
			}
		]
	}
}

export default TimeSheetDetails;
