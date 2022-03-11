import ColumnFilter from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "Username",
    accessor: "user",
    Cell: ({ value }) => {
      return `${value.first_name} ${value.last_name}`
    },
  },
  {
    Header: "start date",
    accessor: "start_date",
    Cell: ({ value }) => {
      return new Date(value).toISOString().slice(0, 10);
    },
  },
  {
    Header: "end date",
    accessor: "end_date",
    Cell: ({ value }) => {
      return new Date(value).toISOString().slice(0, 10);
    },
  },
  {
    Header: "duration",
    Cell: ({ row }) => {
      const { start_date, end_date } = row.original;
      // we modified end date to include only till the last day of leave so need to add 1
      return Math.abs(new Date(start_date) - new Date(end_date)) / 86400000 + 1;
    },
  },
  { Header: "reason",
    accessor: "reply",
    Cell: ({value}) => value === null ? '' : `${value.reason}`
},
  { Header: "status", accessor: "status", Filter: ColumnFilter },
];
