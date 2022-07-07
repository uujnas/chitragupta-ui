export const columns = [
  {
    Header: 'date',
    accessor: 'date',
  },
  {
    Header: 'Group Lunch',
    accessor: (originalRow) =>
      originalRow.group_lunches
        .map((group_lunches) => `GroupLunch-${group_lunches.id}`)
        .join(', '),
  },
]
