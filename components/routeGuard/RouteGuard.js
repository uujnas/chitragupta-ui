import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const RouteGuard = ({ children }) => {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(async () => {
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
  }, []);

  // we need to pass url as there can be paths available to all
  // and paths only available to authenticated users
  const authCheck = async (url) => {
    const publicPaths = ["/login"];
    // why are we splitting with ?
    const path = url.split("?")[0];

    const token_verified = await verify_token()
    if (!token_verified && !publicPaths.includes(path)) {
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
    const response = await axios.get("http://localhost:4000/api/v1/user.json", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
    });

    return response.statusText == "OK";
  } catch (error) {
    return false
  }
};

export { RouteGuard, verify_token };
