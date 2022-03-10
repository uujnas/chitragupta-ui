import React from 'react';
import Head from 'next/head';
import DataTable from '../components/dashboard/DataTable';
import Navbar from '../components/layout/Navbar';

const home = () => {
  return (
    <>
      <Head>
        <title>Chitragupta App</title>
        <meta name="description" content="chitragupta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar page={'Dashboard'} subPages={['Calendar', 'Admin']} />
      <div className="p-12 mx-6 -mt-6 bg-white rounded shadow h-3/5">
        <DataTable />
      </div>
    </>
  );
};

export default home;
