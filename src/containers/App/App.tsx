import React from "react";
import { observer, inject } from "mobx-react";

import LoadingWrapper from "../../common/LoadingWrapper";
import Header from "../../components/Header";
import WeeklyTimeSheet from "../../components/WeeklyTimeSheet";
import UserStore from "../../stores/UserStore";
import { UserDetails } from "../../stores/types";
import {
	getFormattedDate,
	getRecentWeekendDate,
	getSelectedWeekInReadableFormat,
} from "../../utils/DateUtils";

import { UserAccumulatedTimeText } from "./styledComponents";

interface Props {
	userStore?: UserStore;
}

@inject("userStore")
@observer
class App extends React.Component<Props> {
	componentDidMount() {
		this.fetchUserDetails();
	}

	fetchUserDetails = () => {
		const { userStore } = this.props;
		if (userStore && !userStore.isUserDetailsAvailable()) {
			userStore.getUsersDetailsAPI();
			const recentWeekendDate = getRecentWeekendDate();
			userStore.setUserSelectedDate(getFormattedDate(recentWeekendDate));
			userStore.getUserWeeklyTimeSheet();
		}
	};

	onSelectDate = (date: string) => {
		const { userStore } = this.props;

		if (userStore) {
			userStore.setUserSelectedDate(getFormattedDate(date));
			userStore.getUserWeeklyTimeSheet();
		}
	};

	render() {
		const { userStore } = this.props;
		if (userStore) {
			const {
				getUserDetailsAPIStatus,
				getUserDetailsAPIError,
				getUsersDetailsAPI,
				userDetails,
				userSelectedDate,
			} = userStore;
			return (
				<LoadingWrapper
					apiStatus={getUserDetailsAPIStatus}
					apiError={getUserDetailsAPIError}
					onRetry={getUsersDetailsAPI}
				>
					<Header
						userDetails={userDetails as UserDetails}
						selectedDate={new Date(userSelectedDate as string)}
						onSelectDate={this.onSelectDate}
					/>
					<UserAccumulatedTimeText>
						Week (
						{getSelectedWeekInReadableFormat(userSelectedDate as string)})
					</UserAccumulatedTimeText>
					<WeeklyTimeSheet userStore={userStore} />
				</LoadingWrapper>
			);
		}
	}
}

export default App;
