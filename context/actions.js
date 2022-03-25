const APPROVE_LEAVE_REQUEST = "APPROVE_LEAVE_REQUEST";

export const type = { APPROVE_LEAVE_REQUEST }

const update_leave_request = async (leave_request) => {
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
    return ((error.response && error.response.data) || error.message)
  }
}
