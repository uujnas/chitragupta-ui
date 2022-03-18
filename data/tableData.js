export const columns = [
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

export const data = [
  {
    username: 'Sagar Shah',
    start_date: '2016-02-15',
    end_date: '2016-02-18',
    duration: '3',
    reason: 'a mild fever',
    status: 'approved'
  },
  {
    username: 'Sujan BAsnet',
    start_date: '2022-03-08',
    end_date: '2016-02-15',
    duration: '1',
    reason: 'feeling lazy',
    status: 'rejected'
  },
  {
    username: 'Nihal Dhakal',
    start_date: '2022-02-14',
    end_date: '2022-02-15',
    duration: '1',
    reason: 'need to go to hospital',
    status: 'approved'
  }
];
