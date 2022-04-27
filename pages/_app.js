import { useEffect } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import RouteGuard from '../components/routeGuard/RouteGuard'
import reducers from '../reducers'
import Head from 'next/head'
import { setToken, loadUser } from '../actions/authActions'
import '../styles/globals.css'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
let composeEnhancers = compose
if (typeof window !== 'undefined') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
)
function MyApp ({ Component, pageProps }) {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token){
      store.dispatch(setToken(token))
      store.dispatch(loadUser())
    }
  }, [])
  return (
    <>
      <Provider store={store}>
        <RouteGuard>
          <Head>
            <title>Chitragupta App</title>
            <meta name='description' content='chitragupta' />
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <Component {...pageProps} />
        </RouteGuard>
      </Provider>
    </>
  )
}

export default MyApp
