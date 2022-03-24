import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import DataTable from "../components/dashboard/DataTable";
import Navbar from "../components/layout/Navbar";
import Modal from "../components/modal";
import { Btn, Input, Label } from "../components/formComponents";
import { User } from "../user-context";
import axios from "axios";
import Jsona from "jsona";

const home = () => {
  const [showModal, setShowModal] = useState(false);
  const pageProps = { label: "Dashboard", link: "/home" };
  const subPageProps = [
    { label: "Calendar", link: "/calendar" },
    { label: "Admin", link: "/admin" },
  ];
  const [leaveRequest, setLeaveRequest] = useState({});
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(User);

  useEffect(async () => {
    const leave_requests = await axios.get(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests.json`,
      { headers: { Authorization: localStorage.token } }
    );
    const dataFormatter = new Jsona();
    setLeaveRequests(dataFormatter.deserialize(leave_requests.data));
  }, []);

  const isAdmin = () => user.role === "admin";

  const updateLeaveRequest = async (status) => {
    const leave_request = {
      ...leaveRequest,
      status: status,
      approver_id: user.id,
    };

    try {
      // send update request to remote api
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/leave_requests/${leaveRequest.id}`,
        {
          leave_request: leave_request,
        },
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      );
      if (response.statusText == "OK") {
        setError("");
        setShowModal(false);

        const dataFormatter = new Jsona();
        const updatedLeaveRequest = dataFormatter.deserialize(response.data);

        //  now lets update the leaveRequest in leaveRequests collection (for table view)
        // first find index of the updatedLeaveRequest
        const index = leaveRequests.findIndex(
          (leave) => leave.id == leave_request.id
        );

        // now replace leave request at the index with updated one
        const leave_requests = [...leaveRequests];
        leave_requests[index] = updatedLeaveRequest;

        setLeaveRequests(leave_requests);
      }
    } catch (error) {
      setError((error.response && error.response.data) || error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Chitragupta App</title>
        <meta name="description" content="chitragupta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar page={pageProps} subPages={subPageProps} />
      <div className="p-12 mx-6 -mt-6 bg-white rounded shadow h-3/5">
        <DataTable
          leaveRequests={leaveRequests}
          showModal={showModal}
          setShowModal={setShowModal}
          setLeaveRequest={setLeaveRequest}
        />
        {showModal && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            user={leaveRequest.user}
          >
            {error !== "" && (
              <span className="text-red-500">{JSON.stringify(error)}</span>
            )}
            <Label>Reason</Label>
            <Input
              type="text"
              value={leaveRequest.title}
              onChange={(e) => {
                setLeaveRequest({
                  ...leaveRequest,
                  title: e.target.value
                })
              }}
              disabled={isAdmin()}
            />
            {isAdmin() && (
              <>
                <Label>Reply</Label>
                <Input
                  type="text"
                  value={leaveRequest.reply && leaveRequest.reply.reason}
                  onChange={(e) =>
                    setLeaveRequest({
                      ...leaveRequest,
                      reply_attributes: { reason: e.target.value },
                    })
                  }
                />
              </>
            )}

            {isAdmin() && leaveRequest.status !== "rejected" && (
              <Btn
                className="bg-red-500 hover:bg-red-600"
                onClick={() => updateLeaveRequest("rejected")}
              >
                Reject
              </Btn>
            )}
            {isAdmin() && leaveRequest.status !== "approved" && (
              <Btn
                className="ml-2 bg-green-500 hover:bg-green-600"
                onClick={() => updateLeaveRequest("approved")}
              >
                Approve
              </Btn>
            )}
            {!isAdmin() && (
              <Btn
                className="ml-2 bg-green-500 hover:bg-green-600"
                onClick={() => updateLeaveRequest(leaveRequest.status)}
              >
                Update
              </Btn>
            )}
          </Modal>
        )}
      </div>
    </>
  );
};

export default home;
