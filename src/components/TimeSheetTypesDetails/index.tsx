import React from "react";
import { observer } from "mobx-react";

import TimeSheetDetails from "../../stores/models/TimeSheetDetails";
import {
	getDisplayDatesInTable,
	serverDateFormat,
} from "../../utils/DateUtils";

import {
	TimeSheetDayRow,
	TimeSheetDayData,
	TimeSheetTypeRow,
	TimeSheetTypeHeading,
	TimeSheetTypeData,
	InOutTable,
	InOutTableBody,
} from "./styledComponents";

interface Props {
	timeSheetDetails: TimeSheetDetails;
	selectedDate: string;
}

@observer
class TimeSheetTypesDetails extends React.Component<Props> {
	displayDates;
	constructor(props) {
		super(props);
		this.displayDates = getDisplayDatesInTable(
			props.selectedDate,
			serverDateFormat
		);
	}

	renderTimeSheetTypeTotalHours = (isDataAvailable, heading, data) => {
		return (
			<TimeSheetTypeRow>
				<TimeSheetTypeHeading>{heading}</TimeSheetTypeHeading>
				{isDataAvailable
					? this.displayDates.map((date) => {
							let filterByDateValue = data.totalHrsByDate.find(
								(valueByDate) => {
									return valueByDate.date === date;
								}
							);
							if (filterByDateValue) {
								return (
									<TimeSheetTypeData key={date}>
										{filterByDateValue.total_hrs}
									</TimeSheetTypeData>
								);
							}
							return <TimeSheetTypeData key={date}></TimeSheetTypeData>;
					  })
					: null}
				<TimeSheetTypeData>{data.total}</TimeSheetTypeData>
			</TimeSheetTypeRow>
		);
	};

	renderTimeSheetDetails = (isDataAvailable, heading, data) => {
		return (
			<TimeSheetTypeRow>
				<TimeSheetTypeHeading>{heading}</TimeSheetTypeHeading>
				{isDataAvailable
					? this.displayDates.map((date) => {
							const filteredByDate = data.timings.filter(
								(value) => value.date === date
							);
							if (filteredByDate.length < 1) {
								return (
									<TimeSheetTypeData key={date}></TimeSheetTypeData>
								);
							}
							return (
								<TimeSheetTypeData key={date}>
									{filteredByDate.map((valueByDate) => {
										return (
											<InOutTable
												key={`${valueByDate.date}${valueByDate.in_time}`}
											>
												<InOutTableBody>
													<TimeSheetTypeRow>
														<TimeSheetTypeData>
															{valueByDate.in_time}
														</TimeSheetTypeData>
													</TimeSheetTypeRow>
													<TimeSheetTypeRow>
														<TimeSheetTypeData>
															{valueByDate.out_time}
														</TimeSheetTypeData>
													</TimeSheetTypeRow>
												</InOutTableBody>
											</InOutTable>
										);
									})}
								</TimeSheetTypeData>
							);
					  })
					: null}
			</TimeSheetTypeRow>
		);
	};

	renderTotalHours = () => {
		const { timeSheetDetails } = this.props;

		return this.renderTimeSheetTypeTotalHours(
			true,
			"Total Hours",
			timeSheetDetails.total
		);
	};

	renderTimeSheetData = () => {
		const { timeSheetDetails } = this.props;
		return timeSheetDetails.getDisplayRelatedInfo().map((dataType) => {
			const { isAvailable, displayText, details } = dataType;
			return (
				<React.Fragment key={displayText}>
					{this.renderTimeSheetDetails(isAvailable, displayText, details)}
					{isAvailable &&
						this.renderTimeSheetTypeTotalHours(
							isAvailable,
							`${displayText} Hours`,
							details.total
						)}
				</React.Fragment>
			);
		});
	};

	renderWeekDays = () => {
		const { selectedDate } = this.props;
		const displayDates = getDisplayDatesInTable(selectedDate);

		return (
			<TimeSheetDayRow>
				<TimeSheetDayData></TimeSheetDayData>
				{displayDates.map((date) => {
					return <TimeSheetDayData key={date}>{date}</TimeSheetDayData>;
				})}
				<TimeSheetDayData>Total Hours</TimeSheetDayData>
			</TimeSheetDayRow>
		);
	};
	render() {
		return (
			<>
				{this.renderWeekDays()}
				{this.renderTimeSheetData()}
				{this.renderTotalHours()}
			</>
		);
	}
}

export default TimeSheetTypesDetails;
