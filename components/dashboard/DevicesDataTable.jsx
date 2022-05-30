import { connect } from 'react-redux'
import DataTable from './DataTable'
import { columns } from '../../data/deviceTableData'
import { TableContainer } from '../modalComponents'
import { fetchDevices } from '../../redux/actions/dashboardActions'

function DevicesDataTable({ fetchDevices }) {
  return (
    <TableContainer>
      <DataTable
        rowClick={() => console.log('row clicked')}
        columns={columns}
        fetchFunction={fetchDevices}
      />
    </TableContainer>
  )
}

export default connect(() => ({}), { fetchDevices })(DevicesDataTable)
