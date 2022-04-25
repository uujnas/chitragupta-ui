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

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/salaries.json`,
          { headers: { Authorization: localStorage.token } }
        );

        const dataFormatter = new Jsona();
        setSalaries(dataFormatter.deserialize(response.data));
      } catch (error) {
        console.log(error);
        handleUnauthorized(error, setToken, router);
      }
    };

    fetchSalaries();
  }, []);

  return (
    <>
      <Navbar />
      <SalariesDataTable salaries={salaries} setSalaries={setSalaries} />
    </>
  );
};

export default Salaries;
