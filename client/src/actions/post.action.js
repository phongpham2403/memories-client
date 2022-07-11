import axios from "../helpers/axios"
import { postConstants } from "../constants";

export const getPosts = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`posts`);
            if (res.status === 200) {
                dispatch({
                    type: postConstants.GET_POST,
                    payload: res.data,
                });
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const createPost = (post) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`posts/create`, post);
            if (res.status === 200) {
                dispatch({ 
                    type: postConstants.CREATE_POST,
                    payload: res.data,
                });
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const updatePost = (id, post) => {
    return async (dispatch) => {
        try {
            const res = await axios.patch(`posts/${id}/update`, post);
            console.log(res.data)
            if (res.status === 200) {
                dispatch({ 
                    type: postConstants.UPDATE_POST,
                    payload: res.data,
                });
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const deletePost = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`posts/${id}/delete`);
            if (res.status === 200) {
                dispatch({ 
                    type: postConstants.DELETE_POST,
                    payload: id,
                });
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const likePost = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.patch(`posts/${id}/like`);
            if (res.status === 200) {
                dispatch({ 
                    type: postConstants.LIKE_POST,
                    payload: res.data,
                });
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};


