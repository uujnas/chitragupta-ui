import { RouteGuard } from '../components/routeGuard/RouteGuard';

import '../styles/globals.css';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RouteGuard>
          <Component {...pageProps} />
      </RouteGuard>
    </>
  );
}

export default MyApp;
