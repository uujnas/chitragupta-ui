import React, { useState } from "react";
import Head from "next/head";
import DataTable from "../components/dashboard/DataTable";
import Navbar from "../components/layout/Navbar";
import Modal from "../components/modal";
import { Btn, Input, Label } from "../components/formComponents";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const pageProps = { label: "Dashboard", link: "/home" };
  const subPageProps = [
    { label: "Calendar", link: "/calendar" },
    { label: "Admin", link: "/admin" },
  ];
  return (
    <>
      <Head>
        <title>Chitragupta App</title>
        <meta name="description" content="chitragupta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar page={pageProps} subPages={subPageProps} />
      <div className="p-12 mx-6 -mt-6 bg-white rounded shadow h-3/5">
        <DataTable showModal={showModal} setShowModal={setShowModal} />
        {showModal && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            user={"Sujan Shah"}
          >
            <Label>Reason</Label>
            <Input type="text" />
            <Label>Reason</Label>
            <Input type="text" />

            <Btn className="bg-red-500 hover:bg-red-600">Rejected</Btn>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Home;
