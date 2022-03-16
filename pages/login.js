import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  FormContainer,
  Input,
  Label,
  FormControl,
  Btn
} from '../components/formComponents';
import { useRouter } from "next/router";
import { verify_token } from "../components/routeGuard/RouteGuard";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const token_verified = async () => {
    console.log(process.env.NEXT_PUBLIC_REMOTE_URL);
    const token_verified = await verify_token();
    if (token_verified) {
      router.push(getRedirect());
    }
  };

  const getRedirect = () => {
    return router.query && router.query.returnUrl
      ? router.query.returnUrl
      : "/home";
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`;
    script.id = "recaptcha";
    document.head.append(script);
  });

  useEffect(token_verified, []);

  const handleSubmit = async (e) => {
    console.log("handling submit");
    e.preventDefault();

    // first we will check captcha score
    grecaptcha.ready(function async () {
      grecaptcha
        .execute(process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY, { action: "submit" })
        .then(function (token) {
          console.log(token)
          // We must make request to backend from here
          // if we try to force our way google simply won't let us
          // console.log(token)
        })
    });

    return;

    setError("");

    try {
      // make request to remote api login endpoint
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/users/sign_in.json`,
        {
          user: { email, password },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.headers.authorization);
      router.push(getRedirect());
    } catch (error) {
      localStorage.removeItem("token");
      setError("Invalid user or password.");
    }
  };

  return (
    <section className="my-8 pt-14">
      <FormContainer>
        <div>
          {error.length >= 1 ? (
              <div className="text-red-500 text">{error}</div>
          ) : (
              ""
          )}
        </div>
        <FormControl>
          <Label>E-mail</Label>
          <Input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Password</Label>
          <Input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Btn type="button" onClick={handleSubmit} className="bg-blue-500">
              <span className="inline-block mr-2 uppercase">Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline-block w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Btn>
            <div>
              <a href="#" className="inline-block underline">
                Forgot Password
              </a>
            </div>
          </div>
        </FormControl>
      </FormContainer>
    </section>
  );
};

export default Login;
