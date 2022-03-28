import { RouteGuard } from "../components/routeGuard/RouteGuard";
import AppProvider from "../context";
import Head from "next/head";

import "../styles/globals.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppProvider>
        <RouteGuard>
          <Head>
            <title>Chitragupta App</title>
            <meta name="description" content="chitragupta" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Component {...pageProps} />
        </RouteGuard>
      </AppProvider>
    </>
  );
}

export default MyApp;
