import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = (props: any) => {
	const [startDate, setStartDate] = useState(new Date());

	const isWeekEndDay = (date) => {
		const day = date.getDay();
		return day === 0;
	};
	const onChangeDate = (date) => {
		setStartDate(date as Date);
		const { onSelectDate } = props;
		onSelectDate && onSelectDate(date);
	};
	return (
		<DatePicker
			dropdownMode='select'
			popperPlacement='top-end'
			filterDate={isWeekEndDay}
			maxDate={new Date()}
			selected={startDate}
			onChange={(date) => {
				onChangeDate(date);
			}}
			{...props}
		/>
	);
};

export default DatePickerComponent;
