import { RouteGuard } from "../components/routeGuard/RouteGuard";
import AppProvider from "../context";

import "../styles/globals.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppProvider>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </AppProvider>
    </>
  );
}

export default MyApp;
