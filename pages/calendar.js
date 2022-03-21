import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/layout/Navbar";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import axios from "axios";
import Jsona from "jsona";
import Modal from "../components/modal";
import {
  Input,
  Label,
  Select,
  Option,
  Btn,
} from "../components/formComponents";

const Calendar = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveRequest, setLeaveRequest] = useState({});
  const [creatingLeaveRequest, setCreatingLeaveRequest] = useState(false);
  const [updatingLeaveRequest, setUpdatingLeaveRequest] = useState(false);
  const [error, setError] = useState("");

  const dataFormatter = new Jsona();

  useEffect(async () => {
    const leave_requests = await axios.get(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests.json`,
      { headers: { Authorization: localStorage.token } }
    );
    let events = dataFormatter.deserialize(leave_requests.data);

    //  we need to make some tweaks like set start_date to start and end_date to end as fullCalendar requires
    events.forEach((event) => {
      event.start = event.start_date;
      event.end = fullCalendarEndDate(event.end_date);
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

  const fullCalendarEndDate = (date) => {
    let end_date = new Date(date);
    end_date.setDate(end_date.getDate() + 1);
    end_date.toLocaleString();
    // we need to make sure we have date in YY-MM-DD format
    // '2022-1-1' is not valid date
    // '2022-01-01' is valid date
    return `${end_date.getFullYear()}-${`0${end_date.getMonth() + 1}`.slice(
      -2
    )}-${`0${end_date.getDate()}`.slice(-2)}`;
  };

  const createLeaveRequest = (info) => {
    // end date should be the last day of the leave, better not include the present day
    const endDate = new Date(info.endStr);
    endDate.setDate(endDate.getDate() - 1);
    endDate.toLocaleString();

    setCreatingLeaveRequest(true);

    setLeaveRequest({
      ...leaveRequest,
      leave_type: "sick_leave",
      start_date: info.startStr,
      end_date: endDate,
      status: "pending",
    });
  };

  const addEvent = async () => {
    console.log("Adding leave request....");
    // create leave request
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests`,
        {
          leave_request: leaveRequest,
        },
        { headers: { Authorization: localStorage.token } }
      );

      if (response.statusText === "OK") {
        setCreatingLeaveRequest(false);
        // add newly created leave request to the calendar
        const leave_request = dataFormatter.deserialize(response.data);
        leave_request.start = leave_request.start_date
        leave_request.end = leave_request.end_date
        setLeaveRequests([...leaveRequests, leave_request]);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(
        (error.response &&
          (error.response.data.message || error.response.data.error)) ||
          error.message
      );
    }
  };

  const updateLeaveRequest = async ({ event }) => {
    console.log("Updating leave request", event);

    //  first get id of leave request with
    const id = event.id;

    // make request to remote API to get leave request detail
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests/${id}`,
      { headers: { Authorization: localStorage.token } }
    );

    const dataFormatter = new Jsona();
    setLeaveRequest(dataFormatter.deserialize(response.data));

    setUpdatingLeaveRequest(true);
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
          select={createLeaveRequest}
          eventClick={updateLeaveRequest}
        />
      </div>
      {creatingLeaveRequest && (
        <Modal
          setShowModal={setCreatingLeaveRequest}
          showModal={creatingLeaveRequest}
        >
          <div>
            <Label>Leave Type</Label>
            <Select
              onChange={(e) =>
                setLeaveRequest({ ...leaveRequest, leave_type: e.target.value })
              }
            >
              <Option value="sick_leave">Sick Leave</Option>
              <Option value="personal">Personal</Option>
              <Option value="others">Others</Option>
            </Select>

            <Label>Reason</Label>
            <Input
              onChange={(e) =>
                setLeaveRequest({ ...leaveRequest, title: e.target.value })
              }
            />

            <Btn className="bg-blue-500 hover:bg-blue-600" onClick={addEvent}>
              Submit
            </Btn>
          </div>
        </Modal>
      )}

      {updatingLeaveRequest && (
        <Modal
          setShowModal={setUpdatingLeaveRequest}
          showModal={updatingLeaveRequest}
        >
          <div>
            <Label>Leave Type</Label>
            <Select
              onChange={(e) =>
                setLeaveRequest({ ...leaveRequest, leave_type: e.target.value })
              }
            >
              <Option value="sick_leave">Sick Leave</Option>
              <Option value="personal">Personal</Option>
              <Option value="others">Others</Option>
            </Select>

            <Label>Reason</Label>
            <Input
              onChange={(e) =>
                setLeaveRequest({ ...leaveRequest, title: e.target.value })
              }
            />

            <Btn className="bg-blue-500 hover:bg-blue-600" onClick={addEvent}>
              Submit
            </Btn>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Calendar;
