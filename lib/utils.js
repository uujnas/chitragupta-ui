import axios from "axios";

const addGreptcha = () => {
  const recaptcha_script = document.createElement("script");
  recaptcha_script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`;
  recaptcha_script.id = "recaptcha";
  document.head.append(recaptcha_script);

  // clean up
  return () => {
    recaptcha_script.remove();
  };
};

const getCaptchaScore = async () => {
  const score = await grecaptcha
    .execute(process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY, { action: "submit" })
    .then((token) => {
      // We must make request to backend from here
      // if we try to force our way google simply won't let us
      return axios.get(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/user_scores`,
        { params: { token } }
      );
    }).then((response) => response.data.score );

  return score;
};

export { addGreptcha, getCaptchaScore };
