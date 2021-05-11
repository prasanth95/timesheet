import { format, sub, add, isValid } from "date-fns";

export const serverDateFormat = "yyyy-MM-dd";

export const readableFormat = "MMM dd, yyyy";

export const periodFormat = "MM/dd/yyyy";

export const tableDisplayFormat = "EEE MMM dd, yyyy";

export function getFormattedDate(date, dateFormat = serverDateFormat): string {
	return format(date, dateFormat);
}

export function getRecentWeekendDate(): Date {
	let currentDate = new Date();
	let dayIndex = currentDate.getDay();
	if (dayIndex === 0) {
		return currentDate;
	}
	return sub(currentDate, {
		days: dayIndex,
	});
}

export function getSelectedWeekInReadableFormat(
	selectedDate: string,
	format = readableFormat
): string {
	let formattedDate = new Date(selectedDate);
	let endDate = add(formattedDate, {
		days: 6,
	});
	if (isValid(formattedDate)) {
		return `${getFormattedDate(formattedDate, format)} - ${getFormattedDate(
			endDate,
			format
		)}`;
	}
	return "";
}

export function getDisplayDatesInTable(
	selectedDate: string,
	format = tableDisplayFormat
) {
	const formattedDate = new Date(selectedDate);
	return [
		getFormattedDate(formattedDate, format),
		getFormattedDate(add(formattedDate, { days: 1 }), format),
		getFormattedDate(add(formattedDate, { days: 2 }), format),
		getFormattedDate(add(formattedDate, { days: 3 }), format),
		getFormattedDate(add(formattedDate, { days: 4 }), format),
		getFormattedDate(add(formattedDate, { days: 5 }), format),
		getFormattedDate(add(formattedDate, { days: 6 }), format),
	];
}
