import React, { useEffect, useState } from "react";
import Navbar from "../../../components/layout/Navbar";
import SalaryRecordsDataTable from "../../../components/dashboard/SalaryRecordsDataTable";
import axios from "axios";
import Jsona from "jsona";
import { handleUnauthorized } from "../../../lib/utils";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../../context";

const SalaryRecords = () => {
  const router = useRouter();

  const [salaryRecords, setSalaryRecords] = useState([]);
  const { setToken } = useGlobalContext();

  const fetchSalaryRecords = async (page = 1, batch = null) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/salary_records.json`,
        { headers: { Authorization: localStorage.token } }
      );

      const dataFormatter = new Jsona();
      // setSalaryRecords(dataFormatter.deserialize(response.data.data));

      return [
        dataFormatter.deserialize(response.data.data),
        response.data.total,
      ];
    } catch (error) {
      console.log(error);
      handleUnauthorized(error, setToken, router);
    }
  };

  return (
    <>
      <Navbar />
      <SalaryRecordsDataTable
        salaryRecords={salaryRecords}
        setSalaryRecords={setSalaryRecords}
        fetchRecords={fetchSalaryRecords}
      />
    </>
  );
};

export default SalaryRecords;
