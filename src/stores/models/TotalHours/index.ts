import { observable } from "mobx";

import { TotalHours as TotalHoursType } from "../../types";

class TotalHours {
	@observable total: number;
	@observable totalHrsByDate;
	constructor(totalHours: TotalHoursType) {
		this.total = totalHours.total;
		this.totalHrsByDate = totalHours.total_hrs_by_date;
	}
}

export default TotalHours;
