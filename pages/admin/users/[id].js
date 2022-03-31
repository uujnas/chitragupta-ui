import React, { useState, useEffect } from "react";
import Navbar from "../../../components/layout/Navbar";
import { useRouter } from "next/router";
import axios from "axios";
import Jsona from "jsona";

const User = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dataFormatter = new Jsona();

  const MAX_SICK_LEAVE_BALANCE = 5;
  const MAX_PAID_LEAVE_BALANCE = 18;
  const MAX_UNPAID_LEAVE_BALANCE = 25;

  const leave_percentage = (leave_balance, total) =>
    user ? Math.round((leave_balance / total) * 100) : 0;

  useEffect(() => {
    let controller = new AbortController();

    const fetch_user = async (id) => {
      try {
        // fetch user from remote api
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/users/${id}.json`,
          {
            headers: { Authorization: localStorage.token },
            signal: controller.signal,
          }
        );

        setUser(dataFormatter.deserialize(response.data));
        controller = null;
      } catch (error) {
        console.log(error);
      }
    };

    fetch_user(router.query.id);

    return () => controller?.abort();
  }, []);

  useEffect(() => console.log(user), [user]);

  return (
    <>
      <Navbar />

      <div className="bg-white w-[300px] mx-auto">
        <div className="pt-10 text-center">
          <div>
            <div>
              <img
                className="w-20 h-20 mx-auto rounded-full lg:w-24 lg:h-24"
                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
              <div>
                <div className="my-5 text-xs font-medium lg:text-sm">
                  <h2 className="text-2xl">
                    {user && `${user.first_name} ${user.last_name}`}
                  </h2>
                </div>
                <div className="w-full my-4 border-b-2"></div>
              </div>
            </div>

            <div className="px-4">
              <div className="mb-3">
                <div className="flex">
                  <span className="mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-mail"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  {user && user.email}
                </div>
              </div>

              <div className="mb-3">
                <div className="flex">
                  <span className="mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-calendar"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </span>
                  {user && user.start_date}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-blue-700 dark:text-white">
                    Sick Leave Balance
                  </span>
                  <span className="text-sm text-blue-700 dark:text-white">
                    {user && user.sick_leave_balance}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{
                      width: `${leave_percentage(
                        user ? user.sick_leave_balance : 0,
                        MAX_SICK_LEAVE_BALANCE
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-blue-700 dark:text-white">
                    Paid Leave Balance
                  </span>
                  <span className="text-sm text-blue-700 dark:text-white">
                    {user && user.paid_leave_balance}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{
                      width: `${leave_percentage(
                        user ? user.paid_leave_balance : 0,
                        MAX_PAID_LEAVE_BALANCE
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-blue-700 dark:text-white">
                    Paid Leave Balance
                  </span>
                  <span className="text-sm text-blue-700 dark:text-white">
                    {user && user.unpaid_leave_balance}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{
                      width: `${leave_percentage(
                        user ? user.unpaid_leave_balance : 0,
                        MAX_UNPAID_LEAVE_BALANCE
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
