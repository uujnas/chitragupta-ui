import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { CSVLink } from "react-csv";
import { columns, data } from "../../data/tableData";
import { Btn } from "../formComponents";
import { useGlobalContext } from "../../context";
import DataTable from "./DataTable";

const LeaveRequestDataTable = ({
  showModal,
  setShowModal,
  setLeaveRequest,
}) => {
  const { leaveRequests } = useGlobalContext();

  const rowClick = (row) => {
    setLeaveRequest(row.original);
    setShowModal(!showModal);
  };

  const exportData = leaveRequests.map((d) => Object.values(d));

  return (
    <DataTable data={leaveRequests} rowClick={rowClick}>
      <div className="flex justify-end my-4">
        <Btn className="bg-teal-500 hover:bg-teal-600">
          <CSVLink
            data={exportData}
            filename={`${new Date().toISOString().slice(0, 18)}_report.csv`}
          >
            Export Data
          </CSVLink>
        </Btn>
      </div>
    </DataTable>
  );
};

export default LeaveRequestDataTable;
