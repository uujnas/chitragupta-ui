import DataTable from './DataTable'
import { columns } from '../../data/leaveTableData'
import { fetchLeaveRequests } from '../../redux/actions/leaveActions'
import { connect } from 'react-redux'

function LeaveRequestDataTable({ showModal, setShowModal, setLeaveRequest }) {
  const rowClick = (row) => {
    setLeaveRequest(row.original)
    setShowModal(!showModal)
  }

  return (
    <DataTable
      rowClick={rowClick}
      columns={columns}
      fetchFunction={fetchLeaveRequests}
    />
  )
}

export default connect(() => {}, { fetchLeaveRequests })(LeaveRequestDataTable)
