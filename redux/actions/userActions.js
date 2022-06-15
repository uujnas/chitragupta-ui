import axios from "axios";
import {SET_REDIRECT} from "./types";
import {clearErrors, returnErrors} from "./alertActions";

export const profileFormSubmit = (userId, user) => async (dispatch) => {
    try {
        // patch request to user resource remote url
        await axios.put(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/users/${userId}.json`,
            {
                user,
            },
            {headers: {Authorization: localStorage.token}}
        );

        dispatch(clearErrors())
        dispatch({
            type: SET_REDIRECT,
            payload: "/"
        })
    } catch (error) {
        dispatch(returnErrors(
            error.response?.message,
            404,
            'PROFILE_FORM_SUBMIT_FAIL'
        ))
    }
}