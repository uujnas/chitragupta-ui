import React, { useEffect, useState } from "react";
import Navbar from "../../../components/layout/Navbar";
import SalaryRecordsDataTable from "../../../components/dashboard/SalaryRecordsDataTable";
import axios from "axios";
import Jsona from "jsona";

const SalaryRecords = () => {
  const [salaryRecords, setSalaryRecords] = useState([]);

  useEffect(() => {
    const fetchSalaryRecords = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/salary_records.json`,
          { headers: { Authorization: localStorage.token } }
        );

        const dataFormatter = new Jsona();
        setSalaryRecords(dataFormatter.deserialize(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchSalaryRecords();
  }, []);

  return (
    <>
      <Navbar />
      <SalaryRecordsDataTable
        salaryRecords={salaryRecords}
        setSalaryRecords={setSalaryRecords}
      />
    </>
  );
};

export default SalaryRecords;
