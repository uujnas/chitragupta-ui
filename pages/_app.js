import Layout from '../components/layout/Layout';
import { RouteGuard } from '../components/routeGuard/RouteGuard';

import '../styles/globals.css';

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
