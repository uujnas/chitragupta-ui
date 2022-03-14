import axios from "axios";
import React, { useState } from "react";

const ProfileForm = () => {
  const [user, setUser] = useState({});

  if (typeof window !== "undefined") {
    const userId = localStorage.getItem("user_id");
  }

  const formSubmit = async (e) => {
    e.preventDefault();

    // patch request to user resource remote url
    const response = await axios.put(
      `http://localhost:4000/users/${userId}.json`,
      {
        user,
      },
      { headers: { Authorization: localStorage.token } }
    );

    if (response.statusText == "OK") {
      console.log("successfully updated user...");
    } else {
      console.log("Failed to update user");
    }
  };

  return (
    <section className="my-8 pt-14">
      <div className="container px-2 py-2 mx-auto md:w-full md:max-w-2xl">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              First Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Last Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="pan-number"
            >
              Pan Number
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="pan-number"
              onChange={(e) => setUser({ ...user, pan_number: e.target.value })}
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="citizenship-number"
            >
              Citizenship Number
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="citizenship-number"
              onChange={(e) =>
                setUser({ ...user, citizenship_number: e.target.value })
              }
            />
          </div>
        </div>

        <button
          className="inline-block px-4 py-2 text-white bg-blue-500 rounded"
          onClick={(e) => formSubmit(e)}
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default ProfileForm;
