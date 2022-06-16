import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { addGreptcha } from "../../lib/utils";
import { acceptInvitation } from "../../redux/actions/authActions";
import { connect } from "react-redux";

const InvitationAccept = ({acceptInvitation}) => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { invitation_token } = router.query;

  useEffect(() => addGreptcha(), []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    acceptInvitation(invitation_token, password, passwordConfirmation)
  };

  return (
    <section className="my-8 pt-14">
      <div className="container px-2 py-2 mx-auto md:w-full md:max-w-md">
        {error.length > 0 && (
          <div id="error-message">
            <span className="text-red-500">{error}</span>
          </div>
        )}
        <div className="w-full px-3 bg-white divide-y divide-gray-200 rounded-lg shadow">
          <div className="px-5 py-7">
            <label className="block pb-1 text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-3 mt-1 mb-5 text-sm border rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="block pb-1 text-sm font-semibold text-gray-600">
              Password Confirmation
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-3 mt-1 mb-5 text-sm border rounded-lg"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button
              type="button"
              className="inline-block w-full py-3 text-sm font-semibold text-center text-white transition bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 "
              onClick={handleSubmit}
            >
              <span className="inline-block mr-2 uppercase">JOIN</span>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(() => ({}), {
  acceptInvitation
}) (InvitationAccept);
