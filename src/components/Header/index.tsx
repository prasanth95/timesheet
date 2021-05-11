import React from "react";
import DatePickerComponent from "../../common/DatePicker";
import { UserDetails } from "../../stores/types";

import {
	UserDetailsWithDatePickerStrip,
	DatePickerContainer,
} from "./styledComponents";

interface Props {
	userDetails: UserDetails;
	onSelectDate: Function;
	selectedDate: Date;
}
class Header extends React.Component<Props> {
	renderDatePicker = () => {
		const { onSelectDate, selectedDate } = this.props;
		return (
			<DatePickerContainer>
				Date:{" "}
				<DatePickerComponent
					selected={selectedDate}
					onSelectDate={onSelectDate}
				/>
			</DatePickerContainer>
		);
	};

	render() {
		const { userDetails } = this.props;
		return (
			<UserDetailsWithDatePickerStrip>
				{userDetails.name}
				{this.renderDatePicker()}
			</UserDetailsWithDatePickerStrip>
		);
	}
}

export default Header;
