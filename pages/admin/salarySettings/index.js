import React, { useEffect, useState } from "react";
import Navbar from "../../../components/layout/Navbar";
import SalarySettingsDataTable from "../../../components/dashboard/SalarySettingsDataTable";
import axios from "axios";
import Jsona from "jsona";
import { handleUnauthorized } from "../../../lib/utils";
import { useGlobalContext } from "../../../context";
import { useRouter } from "next/router";

const salarySettings = () => {
  const router = useRouter();
  const { setToken } = useGlobalContext();
  const [salarySettings, setSalarySettings] = useState([]);

  const fetchSalarySettings = async (page = 1, batch = null) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/salary_settings.json`,
        {
          headers: { Authorization: localStorage.token },
          params: { page, batch },
        }
      );

      const dataFormatter = new Jsona();
      setSalarySettings(dataFormatter.deserialize(response.data));

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
      <SalarySettingsDataTable
        salarySettings={salarySettings}
        setSalarySettings={setSalarySettings}
        fetchRecords={fetchSalarySettings}
      />
    </>
  );
};

export default salarySettings;
