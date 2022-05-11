import DataTable from './DataTable';
import { columns } from '../../data/leaveTableData';

function LeaveRequestDataTable({ showModal, setShowModal, setLeaveRequest }) {
  const rowClick = (row) => {
    setLeaveRequest(row.original);
    setShowModal(!showModal);
  };

  return <DataTable rowClick={rowClick} columns={columns} />;
}

export default LeaveRequestDataTable;
