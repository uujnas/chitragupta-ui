import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import DataTable from './DataTable'
import { columns } from '../../data/groupLunchDayTableData'
import { fetchGroupLunchDayRequest } from '../../redux/actions/groupLunchDayActions'
import { TableContainer } from '../modalComponents'

const GroupLunchDaysDataTable = ({ fetchGroupLunchDayRequest }) => {
    const router = useRouter()
    const rowClick = (row) => router.push(`/group_lunch_day/${row.original.id}`)

  return (
    <TableContainer>
      <DataTable
        rowClick={rowClick}
        columns={columns}
        fetchFunction={ fetchGroupLunchDayRequest }
      />
    </TableContainer>
  )
}

export default connect(() => ({}), { fetchGroupLunchDayRequest })(
  GroupLunchDaysDataTable,
)
