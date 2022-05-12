import { useEffect, useCallback } from 'react'
import axios from 'axios'
import Jsona from 'jsona'
import { useRouter } from 'next/router'
import Navbar from '../../../components/layout/Navbar'
import UsersDataTable from '../../../components/dashboard/UsersDataTable'
import { useGlobalContext } from '../../../context'
import { handleUnauthorized } from '../../../lib/utils'
import { connect } from 'react-redux'
import { fetchUsers } from '../../../redux/actions/usersActions'

function Users(props) {
  const dataFormatter = new Jsona()
  const router = useRouter()
  // const { setUsers, user, setToken } = useGlobalContext();

  const fetchUsers = useCallback(async () => {
    let usersController = new AbortController()

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/users.json`,
        {
          headers: { Authorization: localStorage.token },
          signal: usersController.signal,
        },
      )

      setUsers(dataFormatter.deserialize(response.data))
      usersController = null
    } catch (error) {
      console.log(error)
      // handleUnauthorized(error, setToken, router);
    }

    return () => usersController?.abort()
  }, [])

  useEffect(() => {
    if (props.token) {
      props.fetchUsers()
    }
  }, [props.token])

  return (
    <>
      <Navbar />
      <div className="p-12 mx-6 -mt-6 bg-white rounded shadow h-3/5">
        <UsersDataTable />
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  user: state.auth.user,
})

export default connect(mapStateToProps, {
  fetchUsers,
})(Users)
