export const handleUnauthorized = (error, router) => {
  // console.log(window.location.pathname);
  // console.log(error.response);
  if (error.response && error.response.statusText === 'Unauthorized') {
    // console.log(error.response);

    localStorage.token = '';

    router.push({
      pathname: '/login',
      // after login redirect to intended page
      query: { returnUrl: window.location.pathname },
    });
  }
};
