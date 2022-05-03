import App from 'next/app'
import { wrapper } from "../redux/store"
import RouteGuard from '../components/routeGuard/RouteGuard'
import Head from 'next/head'
import '../styles/globals.css'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'


class WrappedApp extends App {
  static getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
    }
    return {
      pageProps,
    }
  })
  componentDidMount(){
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
      <RouteGuard>
        <Head>
          <title>Chitragupta App</title>
          <meta name='description' content='chitragupta' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Component {...pageProps} />
      </RouteGuard>
    </>
    )
  }
}

export default wrapper.withRedux(WrappedApp)
