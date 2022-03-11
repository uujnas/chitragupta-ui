import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/layout/Navbar";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import axios from "axios";
import Jsona from "jsona";

const Calendar = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [createLeaveRequest, setCreateLeaveRequest] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(async () => {
    const leave_requests = await axios.get(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests.json`,
      { headers: { Authorization: localStorage.token } }
    );
    const dataFormatter = new Jsona();
    let events = dataFormatter.deserialize(leave_requests.data);

    //  we need to make some tweaks like set start_date to start and end_date to end as fullCalendar requires
    events.forEach((event) => {
      event.start = event.start_date;
      event.end = event.end_date;
      event.color = colorMap(event.status);
    });

    setLeaveRequests(events);

    console.log(events);
  }, []);

  const colorMap = (status) => {
    switch (status) {
      case "pending":
        return "blue";
        break;
      case "rejected":
        return "red";
        break;
      case "approved":
        return "green";
        break;
      default:
        return "blue";
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Chitragupta App</title>
        <meta name="description" content="chitragupta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar page={"Dashboard"} subPages={["Calendar", "Admin"]} />
      <div className="p-8">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          events={leaveRequests}
          selectable={true}
          editable={true}
          select={(info) => {
            // end date should be the last day of the leave, better not include the present day
            const endDate = new Date(info.endStr);
            endDate.setDate(endDate.getDate() - 1);
            endDate.toLocaleString();

            setCreateLeaveRequest(true)
            setStartDate(info.startStr)
            setEndDate(endDate)
            

            console.log("Select inseide", info);
          }}
        />
        ;
      </div>
    </>
  );
};

export default Calendar;
