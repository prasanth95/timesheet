import React from "react";
import { observer } from "mobx-react";

import LoadingWrapper from "../../common/LoadingWrapper";
import { APIStatus } from "../../constants/APIConstants";
import UserStore from "../../stores/UserStore";
import { UserDetails } from "../../stores/types";
import {
	getSelectedWeekInReadableFormat,
	periodFormat,
} from "../../utils/DateUtils";

import TimeSheetTypesDetails from "../TimeSheetTypesDetails";

import {
	WeeklyTimeSheetTable,
	WeeklyTimeSheetHeaderRow,
	WeeklyTimeSheetHeader,
	WeeklyTimeSheetHeaderText,
	WeeklyTimeSheetBody,
	WeeklyTimeSheetBodyRow,
	WeeklyTimeSheetBodyHeaderText,
	WeeklyTimeSheetBodyDataText,
	TimeSheetNotAvailable,
} from "./styledComponents";

interface Props {
	userStore?: UserStore;
}
@observer
class WeeklyTimeSheet extends React.Component<Props> {
	renderTimeSheetTypes = () => {
		const { userStore } = this.props;
		if (userStore?.isUserTimeSheetAvailable) {
			const { userWeeklyTimeSheetDetails, userSelectedDate } = userStore;
			return (
				<TimeSheetTypesDetails
					selectedDate={userSelectedDate}
					timeSheetDetails={userWeeklyTimeSheetDetails}
				/>
			);
		}

		return null;
	};

	renderUserDetailTableRow = (heading, value) => {
		return (
			<WeeklyTimeSheetBodyRow>
				<WeeklyTimeSheetBodyHeaderText>
					{heading}
				</WeeklyTimeSheetBodyHeaderText>
				<WeeklyTimeSheetBodyDataText>{value}</WeeklyTimeSheetBodyDataText>
			</WeeklyTimeSheetBodyRow>
		);
	};
	renderUserDetails = () => {
		const { userStore } = this.props;

		const { name, department, branch } =
			userStore?.userDetails as UserDetails;

		return (
			<>
				{this.renderUserDetailTableRow("Name:", name)}
				{this.renderUserDetailTableRow("Branch:", branch)}
				{this.renderUserDetailTableRow("Department:", department)}
				{this.renderUserDetailTableRow(
					"Period:",
					getSelectedWeekInReadableFormat(
						userStore?.userSelectedDate as string,
						periodFormat
					)
				)}
			</>
		);
	};
	renderTableHeader = () => {
		return (
			<WeeklyTimeSheetHeader>
				<WeeklyTimeSheetHeaderRow>
					<WeeklyTimeSheetHeaderText>
						WEEKLY TIMESHEET
					</WeeklyTimeSheetHeaderText>
				</WeeklyTimeSheetHeaderRow>
			</WeeklyTimeSheetHeader>
		);
	};

	renderWeeklyTimeSheet = () => {
		return (
			<WeeklyTimeSheetTable>
				{this.renderTableHeader()}
				<WeeklyTimeSheetBody>
					{this.renderUserDetails()}
					{this.renderTimeSheetTypes()}
				</WeeklyTimeSheetBody>
			</WeeklyTimeSheetTable>
		);
	};

	renderNoDataText = () => {
		const { userStore } = this.props;
		if (!userStore?.isUserTimeSheetAvailable) {
			return (
				<TimeSheetNotAvailable>NO DATA AVAILABLE</TimeSheetNotAvailable>
			);
		}
	};

	render() {
		const { userStore } = this.props;
		if (userStore) {
			const {
				getUserWeeklyTimeSheetAPIStatus,
				getUserWeeklyTimeSheetAPIError,
				getUserWeeklyTimeSheet,
			} = userStore;
			return (
				<LoadingWrapper
					apiStatus={getUserWeeklyTimeSheetAPIStatus as APIStatus}
					apiError={getUserWeeklyTimeSheetAPIError}
					onRetry={getUserWeeklyTimeSheet}
				>
					{this.renderWeeklyTimeSheet()}
					{this.renderNoDataText()}
				</LoadingWrapper>
			);
		}
	}
}

export default WeeklyTimeSheet;
