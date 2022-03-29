import React from "react";
import { CSVLink } from "react-csv";
import { columns } from "../../data/usersTableData";
import { Btn } from "../formComponents";
import { useGlobalContext } from "../../context";
import DataTable from "./DataTable";
import { useRouter } from "next/router";

const UsersDataTable = ({ showModal, setShowModal, setLeaveRequest }) => {
  const { users } = useGlobalContext();
  const router = useRouter();

  const rowClick = (row) => router.push(`/admin/users/${row.original.id}`);

  const exportData = users.map((d) => Object.values(d));

  return (
    <>
      {users && (
        <DataTable data={users} rowClick={rowClick} columns={columns}>
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
      )}
    </>
  );
};

export default UsersDataTable;
