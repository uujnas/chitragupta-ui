export const handleUnauthorized = (error, setToken, router) => {
  console.log(window.location.pathname);
  console.log(error.response);
  if (error.response && error.response.statusText === "Unauthorized") {
    console.log(error.response);

    setToken("");
    localStorage.token = "";

    router.push({
      pathname: "/login",
      // after login redirect to intended page
      query: { returnUrl: window.location.pathname },
    });
  }
};
