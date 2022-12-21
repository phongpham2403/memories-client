import axios from "../helpers/axios"
import { authConstant } from "../constants";

export const signin = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`user/signin`, formData);
            if (res.status === 200) {
                dispatch({
                    type: authConstant.LOGIN,
                    data: res.data,
                })
                navigate('/')
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const signup = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`user/signup`, formData);
            if (res.status === 200) {
                dispatch({
                    type: authConstant.SIGNUP,
                    data: res.data,
                })
                navigate('/')
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};



