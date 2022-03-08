import React from 'react';
import { Link } from 'next/link';

const Navbar = () => {
  return (
    <header className="px-4 py-8 text-white bg-blue-500">
      <div className="flex justify-between">
        <div className="text-sm uppercase">dashboard</div>
        <div className="user">user</div>
      </div>
      <nav
        class="flex py-8 px-5 text-white-700   dark:bg-white-800 dark:border-white-700"
        aria-label="Breadcrumb"
      >
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a
              href="#"
              class="inline-flex items-center font-lg mr-6 font-medium text-white-700  dark:text-white-400 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li class="inline-flex items-center">
            <a
              href="#"
              class="inline-flex items-center text-sm font-medium text-white-700 hover:text-white-900 dark:text-white-400 dark:hover:text-white"
            >
              <svg
                class="mr-2 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </a>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                class="w-5 h-5 text-white-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <a
                href="#"
                class="ml-1 text-sm font-medium text-white-700 hover:text-white-900 md:ml-2 dark:text-white-400 dark:hover:text-white"
              >
                Dashboard
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                class="w-5 h-5 text-white-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-1 text-sm font-medium text-white-400 md:ml-2 dark:text-white-500">
                Calendar
              </span>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                class="w-5 h-5 text-white-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class=" text-sm font-medium text-white-400 md:ml-2 dark:text-white-500">
                Admin
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </header>
  );
};

export default Navbar;
