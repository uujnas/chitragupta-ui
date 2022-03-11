import React from 'react';
import Head from 'next/head';
import Navbar from '../components/layout/Navbar';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
  return (
    <>
      <Head>
        <title>Chitragupta App</title>
        <meta name="description" content="chitragupta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar page={'Dashboard'} subPages={['Calendar', 'Admin']} />
      <div className="p-8">
        <FullCalendar
          plugins={[dayGridPlugin]}
          events={[
            { title: 'head hurts', date: '2022-03-05' },
            { title: 'pain on hand joints', date: '2022-03-20' }
          ]}
        />
        ;
      </div>
    </>
  );
};

export default Calendar;
