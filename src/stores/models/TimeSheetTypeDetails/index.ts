import { observable } from "mobx";

import { TimeSheetTypeDetails as TimeSheetTypeDetailsType } from "../../types";

import TotalHours from "../TotalHours";

class TimeSheetTypeDetails {
	@observable timings;
	@observable total;
	constructor(timeSheetTypeDetails: TimeSheetTypeDetailsType) {
		this.timings = timeSheetTypeDetails.timings;
		this.total = new TotalHours(timeSheetTypeDetails.total);
	}
}

export default TimeSheetTypeDetails;
