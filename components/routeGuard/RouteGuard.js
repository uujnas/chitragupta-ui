import { useRouter } from 'next/router'
import {loadUser,setToken} from '../../redux/actions/authActions'
import {connect} from 'react-redux'
import {useEffect} from 'react'


const RouteGuard = (props) => {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      props.setToken(token)
    }
    if(!token && router.pathname !== '/login'){
      router.push('/login')
    }else if (!props.isAuthenticated && token){
      props.loadUser()
    }
  })
  return props.children
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user:state.auth.user
})
export default connect(mapStateToProps, {loadUser,setToken})(RouteGuard)
