import React from 'react';
import {
  ModalBody,
  ModalBox,
  ModalContainer,
  ModalHeader,
  ModalOverlay
} from './modalComponents';

const Modal = ({ children, showModal, setShowModal, user }) => {
  return (
    <ModalContainer>
      <ModalOverlay aria-hidden="true">
        <ModalBox>
          <ModalHeader>
            <h4 className="text-lg font-semibold text-gray-900 lg:text-xl ">
              {`${user.first_name} ${user.last_name}`}
            </h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={() => setShowModal(!showModal)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </ModalHeader>
          <div className="flex items-center px-6 py-2 mx-auto mt-4 text-sm bg-green-100 rounded w-fit">
            <div className="text-green-600">Sick Leave Balance : {user.sick_leave_balance}</div>
          </div>
          <ModalBody>{children}</ModalBody>
        </ModalBox>
      </ModalOverlay>
    </ModalContainer>
  );
};

export default Modal;
