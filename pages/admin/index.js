import React from "react";
import Card from "../../components/card";
import Navbar from "../../components/layout/Navbar";
import { Btn } from "../../components/formComponents";

const Admin = () => {
  return (
    <>
      <Navbar />
      <div className="m-5">
        <Card topic="user" description="View and manage users">
          <a href="/admin/users">
            <Btn className="bg-gray-500">Visit</Btn>
          </a>
        </Card>
      </div>
    </>
  );
};

export default Admin;
