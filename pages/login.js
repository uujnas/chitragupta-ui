import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { verify_token } from "../components/routeGuard/RouteGuard";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const token_verified = async () => {
    const token_verified = await verify_token();
    if (token_verified) {
      router.push("/home");
    }
  };

  useEffect(token_verified, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")

    try {
      // make request to remote api login endpoint
      const response = await axios.post(
        "http://localhost:4000/users/sign_in.json",
        {
          user: { email, password },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.headers.authorization);
      router.push("/home")
    } catch (error) {
      localStorage.removeItem("token");
      setError("Invalid user or password.")
    }
  };

  return (
    <section className="my-8 pt-14">
      <div className="container px-2 py-2 mx-auto md:w-full md:max-w-md">
        <div className="w-full px-3 bg-white divide-y divide-gray-200 rounded-lg shadow">
          <div>
            {
              error.length >= 1 ? (
              <div className="text-red-500 text">
                {error}  
              </div>): ""
            }
          </div>
          
          <div className="px-5 py-7">
            <label className="block pb-1 text-sm font-semibold text-gray-600">
              E-mail
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-3 mt-1 mb-5 text-sm border rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block pb-1 text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-3 mt-1 mb-5 text-sm border rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="inline-block w-full py-3 text-sm font-semibold text-center text-white transition bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 "
              onClick={handleSubmit}
            >
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
            </button>
            <div className="px-3 py-3">
              <a href="#" className="inline-block underline">
                Forgot Password
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
