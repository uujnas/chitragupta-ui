import React from "react";
import { CSVLink } from "react-csv";
import { useGlobalContext } from "../../context";
import DataTable from "./DataTable";
import { columns } from "../../data/leaveTableData.js"
import { Btn } from "../formComponents"

const LeaveRequestDataTable = ({
  showModal,
  setShowModal,
  leaveRequests,
  setLeaveRequest
}) => {
  const rowClick = (row) => {
    setLeaveRequest(row.original);
    setShowModal(!showModal);
  };

  const exportData = leaveRequests.map((d) => Object.values(d));

  return (
    <DataTable data={leaveRequests} rowClick={rowClick} columns={columns} />
  );
};

export default LeaveRequestDataTable;
