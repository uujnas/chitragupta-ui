export const COLUMNS = [
  { Header: 'Username', accessor: 'username' },
  {
    Header: 'start date',
    accessor: 'start_date',
    Cell: ({ value }) => {
      return new Date(value).toISOString().slice(0, 10);
    }
  },
  {
    Header: 'end date',
    accessor: 'end_date',
    Cell: ({ value }) => {
      return new Date(value).toISOString().slice(0, 10);
    }
  },
  { Header: 'duration', accessor: 'duration' },
  { Header: 'reason', accessor: 'reason' },
  { Header: 'status', accessor: 'status' }
];
