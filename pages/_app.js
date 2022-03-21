import { RouteGuard } from "../components/routeGuard/RouteGuard";
import  UserContext from "../user-context";

import "../styles/globals.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserContext>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </UserContext>
    </>
  );
}

export default MyApp;
