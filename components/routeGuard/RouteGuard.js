import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { loadUser, setToken } from '../../redux/actions/authActions'

const RouteGuard = (props) => {
  const router = useRouter()

  const pathCheck = (url) => {
    const adminPaths = [
      '/admin',
      '/admin/users',
      '/admin/salaries',
      '/admin/salarySettings',
      '/admin/salaryRecords',
      '/users/invite_form',
    ]
    const path = url.split('?')[0]
    if (props.user) {
      if (props.user.role !== 'admin') {
        if (adminPaths.includes(path)) {
          router.push('/')
        }
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      props.setToken(token)
    }
    const publicPaths = ['/login', '/users/invitation_accept']
    if (!token && !publicPaths.includes(router.pathname)) {
      router.push({
        pathname: '/login',
        // after login redirect to intended page
        query: { returnUrl: window.location.pathname },
      })
    } else if (!props.isAuthenticated && token) {
      props.loadUser()
    }
    pathCheck(router.asPath)
  })
  return props.children
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})
export default connect(mapStateToProps, { loadUser, setToken })(RouteGuard)
