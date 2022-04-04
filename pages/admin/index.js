import React from "react";
import Card from "../../components/card";
import Navbar from "../../components/layout/Navbar";
import { Btn } from "../../components/formComponents";
import Link from "next/link";

const Admin = () => {
  const adminPages = [
    {
      topic: "User",
      description: "View and manage users",
      link: "/admin/users"
    },
    {
      topic: "Salary",
      description: "View and manage salaries",
      link: "/admin/salaries"
    },
    {
      topic: "Salary Settings",
      description: "View and manage salary settings",
      link: "/admin/salarySettings"
    }
  ]

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap m-5">
        {
          adminPages.map((page) => (
            <Card topic={page.topic} description={page.description}>
              <Link href={page.link}>
                <Btn className="bg-gray-500">Visit</Btn>
              </Link>
            </Card>
          ))
        }
      </div>
    </>
  );
};

export default Admin;
