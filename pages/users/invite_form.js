import React, { useState } from "react";
import axios from "axios";

const InviteForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/invite.json`,
        {
          email,
        },
        { headers: { Authorization: localStorage.token } }
      );

      if (response.statusText == "OK") {
        setSuccess("Successfully invited user...");
        setError("");
      } else {
        setError("Failed to invite user...");
      }
    } catch (error) {
      setError(error.response.data.message || error.response.data.error);
      setSuccess("");
    }
  };

  return (
    <section className="my-8 pt-14">
      <div className="container px-2 py-2 mx-auto md:w-full md:max-w-2xl">
        {error.length > 0 && (
          <div id="error-message">
            <span className="text-red-500">{error}</span>
          </div>
        )}

        {success.length > 0 && (
          <div id="success-message">
            <span className="text-green-500">{success}</span>
          </div>
        )}
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="pan-number"
            >
              Email
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="pan-number"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button
          className="inline-block px-4 py-2 text-white bg-blue-500 rounded"
          onClick={(e) => formSubmit(e)}
        >
          Invite
        </button>
      </div>
    </section>
  );
};

export default InviteForm;
