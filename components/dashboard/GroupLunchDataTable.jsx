import { connect } from 'react-redux'
import DataTable from './DataTable'
import { columns } from '../../data/groupLunchData'
import { fetchGroupLunch } from '../../redux/actions/groupLunchActions'
import { TableContainer } from '../modalComponents'

const GroupLunchDaysDataTable = ({ fetchGroupLunch }) => {
  const rowClick = () => {}
  return (
    <TableContainer>
      <DataTable
        rowClick={rowClick}
        columns={columns}
        fetchFunction={fetchGroupLunch}
      />
    </TableContainer>
  )
}

export default connect(() => ({}), { fetchGroupLunch })(GroupLunchDaysDataTable)
