import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import axios from "axios";
import Jsona from "jsona";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // this is only to check if user is loading

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [users, setUsers] = useState([]);

  const dataFormatter = new Jsona();

  const fetchUser = useCallback(async () => {
    const userController = new AbortController();
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/user.json`,
        {
          headers: { Authorization: localStorage.token },
          signal: userController.signal,
        }
      );

      setUser(dataFormatter.deserialize(response.data));
      setLoading(false);
      userController = null;
    } catch (error) {
      console.log(error);
    }

    return () => userController?.abort();
  });

  const isAdmin = () => user && user.role == "admin";

  useEffect(() => fetchUser(), []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        leaveRequests,
        setLeaveRequests,
        users,
        setUsers,
        loading,
        setLoading,
        isAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};
