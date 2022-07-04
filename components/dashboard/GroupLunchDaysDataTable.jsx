import { connect } from 'react-redux'
import DataTable from './DataTable'
import { columns } from '../../data/groupLunchDayTableData'
import { fetchGroupLunchDayRequest } from '../../redux/actions/groupLunchDayActions'
import { TableContainer } from '../modalComponents'

const GroupLunchDaysDataTable = ({ fetchGroupLunchDayRequest }) => {
  const rowClick = () => {
  }
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
