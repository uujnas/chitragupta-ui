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

export const fullCalendarDate = (date) => {
  let end_date = new Date(date);
  end_date.setDate(end_date.getDate() + 1);
  end_date.toLocaleString();
  // we need to make sure we have date in YY-MM-DD format
  // '2022-1-1' is not valid date
  // '2022-01-01' is valid date
  return (`${end_date.getFullYear()}-${(`0${end_date.getMonth() + 1}`).slice(-2)}-${(`0${end_date.getDate()}`).slice(-2)}`)
}
