export const columns = [
  {
    Header: 'Device Type',
    accessor: 'device_type',
    id: 'device_type',
    Cell: ({ row }) => {
      const { device_type } = row.original
      return device_type.device_type
    },
  },
  {
    Header: 'Username',
    accessor: 'Username',
    id: 'username',
    Cell: ({ row }) => {
      const { user } = row.original
      return user ? `${user.first_name} ${user.last_name}` : ''
    },
  },
  {
    Header: 'Identifier',
    accessor: 'identifier',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
]
