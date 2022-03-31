import React from "react";
import Card from "../../components/card";
import Navbar from "../../components/layout/Navbar";
import { Btn } from "../../components/formComponents";
import Link from "next/link";

const Admin = () => {
  return (
    <>
      <Navbar />
      <div className="m-5">
        <Card topic="user" description="View and manage users">
          <Link href="/admin/users">
            <Btn className="bg-gray-500">Visit</Btn>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default Admin;
