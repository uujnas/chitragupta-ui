import React from 'react';
import Head from 'next/head';
import DataTable from '../components/dashboard/DataTable';

const home = () => {
  return (
    <>
      <Head>
        <title>Chitragupta App</title>
        <meta name="description" content="chitragupat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-12 mx-6 -mt-6 bg-white rounded shadow h-3/5">
        <DataTable />
      </div>
    </>
  );
};

export default home;
