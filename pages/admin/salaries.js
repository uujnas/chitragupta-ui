import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import axios from "axios";
import Jsona from "jsona";
import SalariesDataTable from "../../components/dashboard/SalariesDataTable";
import { handleUnauthorized } from "../../lib/utils";
import { useGlobalContext } from "../../context";
import { useRouter } from "next/router";

const Salaries = () => {
  const router = useRouter();
  const { setToken } = useGlobalContext();
  const [salaries, setSalaries] = useState([]);

  const fetchSalaries = async (page = 1, batch = null) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/salaries.json`,
        {
          headers: { Authorization: localStorage.token },
          params: { page, batch },
        }
      );

      const dataFormatter = new Jsona();
      setSalaries(dataFormatter.deserialize(response.data));

      return [
        dataFormatter.deserialize(response.data.data),
        response.data.total,
      ];
    } catch (error) {
      console.log(error);
      handleUnauthorized(error, setToken, router);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  return (
    <>
      <Navbar />
      <SalariesDataTable
        salaries={salaries}
        setSalaries={setSalaries}
        fetchRecords={fetchSalaries}
      />
    </>
  );
};

export default Salaries;
