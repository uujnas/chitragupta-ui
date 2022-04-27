import { useRouter } from "next/router";
import { connect } from 'react-redux'

const RouteGuard = (props) => {
  const router = useRouter();
  // and paths only available to authenticated users
  const authCheck = (url) => {
    const publicPaths = ["/login"];
    const adminPaths = ["/admin", "/admin/users"];

    // why are we splitting with ?
    const path = url.split("?")[0];

    const token_verified = props.isAuthenticated;

    if (!token_verified && !publicPaths.includes(path)) {
      // first check if valid token is present
      router.push({
        pathname: "/login",
        // after login redirect to intended page
        query: { returnUrl: window.location.pathname }, // we are using window.location cuz router doesn't have access to query like id from here
      });
    } else if (!publicPaths.includes(path)) {
      // while loading user don't authorize except for public paths
    } else if (!isAdmin() && adminPaths.includes(path)) {
      // guard for admin paths
      router.push("/");
    }
  };
  return props.children
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})
export default connect(mapStateToProps)(RouteGuard)
