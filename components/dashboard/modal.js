import React from 'react';

const Modal = ({ showModal, setShowModal }) => {
  return (
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setShowModal(!showModal)}
            >
              <span class="sr-only">Close</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="mx-auto flex items-center  h-12 w-fit px-6 rounded bg-green-100">
            {/* <!-- Heroicon name: outline/check --> */}
            <div className="text-green-600">Sick Leave Balance : 5</div>
          </div>
          <div className="px-5 py-7">
            <label className="block pb-1 text-sm font-semibold text-gray-600">
              Reason
            </label>
            <input
              type="text"
              disabled
              className="w-full px-3 py-3 mt-1 mb-5 text-sm border rounded-lg"
            />
            <label className="block pb-1 text-sm font-semibold text-gray-600">
              Status
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-3 mt-1 mb-5 text-sm border rounded-lg"
            />

            <div class="mt-3">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
              >
                Rejected
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
