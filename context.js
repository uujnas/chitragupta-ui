import { createContext, useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import Jsona from "jsona";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState({ user: {} });
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = useCallback(async () => {
    const leave_requests = await axios.get(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests.json`,
      { headers: { Authorization: localStorage.token } }
    );
    const dataFormatter = new Jsona();

    // sets global state for leave requests
    setLeaveRequests(dataFormatter.deserialize(leave_requests.data));
  }, [leaveRequests]);

  useEffect(() => fetchLeaveRequests(), []);

  return <AppContext.Provider value={{ user, setUser, leaveRequests, setLeaveRequests }}>{children}</AppContext.Provider>;
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
