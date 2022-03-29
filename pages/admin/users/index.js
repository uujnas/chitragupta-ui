import React from "react";
import Navbar from "../../../components/layout/Navbar";
import UsersDataTable from "../../../components/dashboard/UsersDataTable";

const Users = () => {
  return (
    <>
      <Navbar />
      <div className="p-12 mx-6 -mt-6 bg-white rounded shadow h-3/5">
        <UsersDataTable
        />
      </div>
    </>
  );
};

export default Users;
