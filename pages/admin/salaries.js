import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import axios from "axios";
import Jsona from "jsona";
import SalariesDataTable from "../../components/dashboard/SalariesDataTable";

const Salaries = () => {
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
