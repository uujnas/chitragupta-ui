import React, { useEffect, useCallback } from "react";
import Navbar from "../../../components/layout/Navbar";
import UsersDataTable from "../../../components/dashboard/UsersDataTable";
import { useGlobalContext } from "../../../context";
import axios from "axios";
import Jsona from "jsona";

const Users = () => {
  const dataFormatter = new Jsona();
  const { setUsers, user } = useGlobalContext();

  const fetchUsers = useCallback(async () => {
    const usersController = new AbortController();

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/users.json`,
        {
          headers: { Authorization: localStorage.token },
          signal: usersController.signal,
        }
      );

      setUsers(dataFormatter.deserialize(response.data));
      usersController = null;
    } catch (error) {
      console.log(error);
    }

    return () => usersController?.abort();
  }, [user]);

  useEffect(() => fetchUsers(), []);

  return (
    <>
      <Navbar />
      <div className="p-12 mx-6 -mt-6 bg-white rounded shadow h-3/5">
        <UsersDataTable />
      </div>
    </>
  );
};

export default Users;
