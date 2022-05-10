import React, {useEffect} from "react";
import { connect } from 'react-redux'
import {clearErrors} from '../redux/actions/alertActions'
const Alert = (props) => {
  const {message, status, id, type} = props.alerts
  const show = (message !== null)
  const success = (type === 'success')
  useEffect(() => {
    setTimeout(function () {
     props.clearErrors()
    }, 5000);
  }, [show]);
  return (
    <>
      {show && (
        <div
          className={`${
            success
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-400"
          } border px-4 py-3 rounded relative`}
          role="alert"
        >
          <span className="block sm:inline">{JSON.stringify(message)}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => {
              props.clearErrors()
            }}
          >
            <svg
              className={`${
                success ? "text-green-500" : "text-red-500"
              } w-6 h-6 fill-current`}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  alerts: state.alerts,
})
export default connect(mapStateToProps, {clearErrors})(Alert)
