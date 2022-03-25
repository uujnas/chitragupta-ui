import { type } from "./actions";

export const reducer = (leave_requests, action) => {
  switch (action.type) {
    case type.APPROVE_LEAVE_REQUEST:
      debugger
      return leave_requests.map((leave) => {
        if (action.id === leave.id) {
          return { ...leave, status: "approved" }
        } else {
          return leave;
        }
      });
    default:
      return { ...leave_requests };
  }
};
