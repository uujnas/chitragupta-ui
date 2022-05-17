import { useState, useEffect } from 'react';
import axios from 'axios';
import Jsona from 'jsona';
import { useRouter } from 'next/router';
import Navbar from '../../components/layout/Navbar';
import SalariesDataTable from '../../components/dashboard/SalariesDataTable';
import { handleUnauthorized } from '../../lib/utils';
import { useGlobalContext } from '../../context';

function Salaries() {
  const router = useRouter();
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/salaries.json`,
          { headers: { Authorization: localStorage.token } },
        );

        const dataFormatter = new Jsona();
        setSalaries(dataFormatter.deserialize(response.data));
      } catch (error) {
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
}

export default Salaries;
