import Layout from '../components/layout/Layout';
import { RouteGuard } from '../components/routeGuard/RouteGuard';

import '../styles/globals.css';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </>
  );
}

export default MyApp;
