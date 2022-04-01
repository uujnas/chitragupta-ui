import React, { useCallback, useEffect, useState, useRef } from "react";
import LeaveRequestDataTable from "../components/dashboard/LeaveRequestDataTable";
import Navbar from "../components/layout/Navbar";
import Modal from "../components/modal";
import { Btn, Input, Label } from "../components/formComponents";
import { useGlobalContext } from "../context";
import axios from "axios";
import Jsona from "jsona";
import LeaveBalanceBadge from "../components/leaveBalanceBadge";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [leaveRequest, setLeaveRequest] = useState({});
  const [error, setError] = useState("");
  const [allLeaves, setAllLeaves] = useState(false);

  const { user, leaveRequests, setLeaveRequests } = useGlobalContext();
  const dataFormatter = new Jsona();

  const isAdmin = () => user && user.role === "admin";

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

  const fetchLeaveRequests = useCallback(
    async (allLeaves = false) => {
      const leaveController = new AbortController();

      try {
        const leave_requests = await axios.get(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests.json`,
          {
            headers: { Authorization: localStorage.token },
            signal: leaveController.signal,
            params: { all_leaves: allLeaves },
          }
        );

        // sets global state for leave requests
        setLeaveRequests(dataFormatter.deserialize(leave_requests.data));
        leaveController = null;
      } catch (error) {
        console.log(error);
      }

      return () => leaveController?.abort();
    },
    [leaveRequests]
  );

  useEffect(() => fetchLeaveRequests(), []);

  return (
    <>
      <Navbar page={"Dashboard"} subPages={["Calendar", "Admin"]} />
      <div className="p-12 mx-6 -mt-6 bg-white rounded shadow h-3/5">
        <div className="flex justify-end py-4">
          <label className="mr-2">All Leaves</label>
          <button
            type="button"
            className={`${
              allLeaves ? "bg-indigo-600" : "bg-gray-200"
            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            role="switch"
            aria-checked="false"
            onClick={() => {
              setAllLeaves(!allLeaves);
              fetchLeaveRequests(!allLeaves);
            }}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`inline-block w-5 h-5 transition duration-200 ease-in-out transform ${
                allLeaves ? "translate-x-5" : "translate-x-0"
              } bg-white rounded-full shadow pointer-events-none ring-0`}
            ></span>
          </button>
        </div>

        <LeaveRequestDataTable
          showModal={showModal}
          setShowModal={setShowModal}
          setLeaveRequest={setLeaveRequest}
        />
        {showModal && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            title={`${leaveRequest.user.first_name} ${leaveRequest.user.last_name}`}
          >
            <div className="flex justify-between">
              <LeaveBalanceBadge
                label={"Sick Leave Balance"}
                balance={leaveRequest.user.sick_leave_balance || 0}
              />
              <LeaveBalanceBadge
                label={"Paid Leave Balance"}
                balance={leaveRequest.user.paid_leave_balance || 0}
              />
              <LeaveBalanceBadge
                label={"Unpaid Leave Balance"}
                balance={leaveRequest.user.unpaid_leave_balance || 0}
              />
            </div>
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
                  title: e.target.value,
                });
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

export default Home;
