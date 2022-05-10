import React from "react";
import DataTable from "./DataTable";
import { columns } from "../../data/leaveTableData.js";

const LeaveRequestDataTable = ({
  showModal,
  setShowModal,
  leaveRequests,
  setLeaveRequest,
  fetchLeaveRequests,
}) => {
  const rowClick = (row) => {
    setLeaveRequest(row.original);
    setShowModal(!showModal);
  };

  return (
    <DataTable
      rowClick={rowClick}
      columns={columns}
    />
  );
};

export default LeaveRequestDataTable;
