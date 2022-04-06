import React, { useState, useEffect } from "react";
import { columns } from "../../data/salaryRecordsTableData";
import { TableContainer } from "../modalComponents";
import { Btn, Input } from "../formComponents";
import DataTable from "./DataTable";
import axios from "axios";

const SalaryRecordsDataTable = ({ salaryRecords }) => {
  const [error, setError] = useState("");
  const [date, setDate] = useState(null);
  // make request to remote api for salary records generation
  const generateSalaryRecords = async () => {
    if (!date) {
      setError("Date Must be present.");
    } else {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/generate_salary_records`,
        {
          salary_date: date,
        },
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      );
    }
  };

  return (
    <>
      <TableContainer>
        <div className="flex justify-end py-4">
          <Input
            className="w-full mr-4 sm:w-1/2 md:w-1/3"
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
          {error.length > 0 ? <span>{error}</span> : ""}
          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={generateSalaryRecords}
          >
            Generate
          </Btn>
        </div>

        <DataTable
          data={salaryRecords}
          rowClick={() => console.log()}
          columns={columns}
        />
      </TableContainer>
    </>
  );
};

export default SalaryRecordsDataTable;
