import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Jsona from "jsona";
import { useGlobalContext } from "../../context";

const RouteGuard = ({ children }) => {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const { user, setUser, loading } = useGlobalContext();

  const isAdmin = () => user && user.role == "admin";

  useEffect(() => {
    const guard = async () => {
      const token_verified = await verify_token();

      if (token_verified) {
        const response = await current_user();
        const dataFormatter = new Jsona();
        setUser(dataFormatter.deserialize(response.data));
      }

      // on initial load run auth check
      await authCheck(router.asPath);

      // on route change start - hide page content by setting authorized to false
      const hideContent = () => setAuthorized(false);
      router.events.on("routerChangeStart", hideContent);

      // on route change complete - run auth check
      router.events.on("routeChangeComplete", authCheck);

      // unsubscribe from events in useEffect return function
      return () => {
        router.events.off("routeChangeStart", hideContent);
        router.events.off("routeChangeComplete", authCheck);
      };
    };

    guard();
  }, [loading]);

  // we need to pass url as there can be paths available to all
  // and paths only available to authenticated users
  const authCheck = async (url) => {
    const publicPaths = ["/login"];
    const adminPaths = ["/admin", "/admin/users"];

    // why are we splitting with ?
    const path = url.split("?")[0];

    const token_verified = await verify_token();

    if (loading) {
      setAuthorized(false);
    } else if (!isAdmin() && adminPaths.includes(path)) {
      setAuthorized(false);
      router.push("/");
    } else if (!token_verified && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        // after login redirect to intended page
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  };

  return authorized && children;
};

// validate auth token by hitting remote endpoint
const verify_token = async () => {
  try {
    const response = await current_user();

    return response.statusText == "OK";
  } catch (error) {
    return false;
  }
};

// get current user
const current_user = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/user.json`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

RouteGuard.getInitialProps = async (ctx) => {
  const token_verified = await verify_token();
  // check that we are in SSR and not in Client side
  if (
    typeof window === "undefined" &&
    ctx.ctx.res.writeHead &&
    !token_verified
  ) {
    ctx.ctx.res.writeHead(302, { Location: "account/login" });
    ctx.ctx.res.end();
  }
};

export { RouteGuard, verify_token };
