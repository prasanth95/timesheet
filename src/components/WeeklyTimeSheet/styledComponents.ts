import styled from "styled-components";

export const WeeklyTimeSheetTable = styled.table`
	width: 100%;
	border: 1px solid #eeeee4;
	text-align: left;
	border-collapse: collapse;
`;

export const WeeklyTimeSheetHeader = styled.thead`
	width: 100%;
`;

export const WeeklyTimeSheetHeaderRow = styled.tr`
	background-color: #154c79;
	width: 100%;
	height: 30px;
	border: 1px solid #ddd;
`;

export const WeeklyTimeSheetHeaderText = styled.th.attrs({
	colSpan: 9,
})`
	padding: 5px;
	color: white;
	border: 1px solid #ddd;
`;

export const WeeklyTimeSheetBody = styled.tbody``;

export const WeeklyTimeSheetBodyRow = styled.tr`
	background-color: white;
	width: 100%;
	height: 20px;
	padding: 5px;
	border: 1px solid #ddd;
`;

export const WeeklyTimeSheetBodyHeaderText = styled.th`
	color: black;
	padding: 5px;
	border: 1px solid #ddd;
`;

export const WeeklyTimeSheetBodyDataText = styled.td`
	color: black;
	padding: 5px;
	border: 1px solid #ddd;
`;

export const TimeSheetNotAvailable = styled.span`
	text-align: center;
	display: block;
`;
