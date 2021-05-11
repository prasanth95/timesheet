export interface UserDetails {
	name: string;
	branch: string;
	department: string;
}

export interface GetUserWeeklyTimeSheetRequest {
	selected_date: string;
}

export interface TotalHoursByDate {
	date: string;
	total_hrs: number;
}

export interface TotalHours {
	total_hrs_by_date: Array<TotalHoursByDate>;
	total: number;
}

export interface Timing {
	date: string;
	in_time: string;
	out_time: string;
}

export interface TimeSheetTypeDetails {
	timings: Array<Timing>;
	total: TotalHours;
}

export interface UserTimeSheetDetails {
	OHTA: TimeSheetTypeDetails;
	CLA: TimeSheetTypeDetails;
	HOLIDAY: TimeSheetTypeDetails;
	PTO: TimeSheetTypeDetails;
	total: TotalHours;
}

export interface UserWeeklyTimeSheetDetails {
	time_sheet_details: UserTimeSheetDetails;
}
