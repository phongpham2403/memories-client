import axios from "../helpers/axios"
import { postConstants } from "../constants";

export const getPost = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: postConstants.GET_POST_BY_ID_REQUEST
            })
            const res = await axios.get(`posts/${id}`); 
            if (res.status === 200) {
                dispatch({
                    type: postConstants.GET_POST_BY_ID_SUCCESS,
                    payload: res.data,
                });
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getPosts = (page) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: postConstants.GET_POSTS_REQUEST
            })
            const res = await axios.get(`posts?page=${page}`);
            if (res.status === 200) {
                dispatch({
                    type: postConstants.GET_POSTS_SUCCESS,
                    payload: res.data,
                });
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getPostsBySearch = (searchQuery) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: postConstants.GET_POSTS_BY_SEARCH_REQUEST
            })
            const res = await axios.get(`posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
            if (res.status === 200) {
                dispatch({
                    type: postConstants.GET_POSTS_BY_SEARCH_SUCCESS,
                    payload: res.data,
                });
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const createPost = (post, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: postConstants.CREATE_POSTS_REQUEST
            })
            const res = await axios.post(`posts/create`, post);
            if (res.status === 200) {
                dispatch({ 
                    type: postConstants.CREATE_POSTS_SUCCESS,
                    payload: res.data,
                });
                navigate(`/posts/${res.data._id}`)
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
            dispatch({
                type: postConstants.UPDATE_POSTS_REQUEST
            })
            const res = await axios.patch(`posts/${id}/update`, post);
            console.log(res.data)
            if (res.status === 200) {
                dispatch({ 
                    type: postConstants.UPDATE_POSTS_SUCCESS,
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
            dispatch({
                type: postConstants.DELETE_POSTS_REQUEST
            })
            const res = await axios.delete(`posts/${id}/delete`);
            if (res.status === 200) {
                dispatch({ 
                    type: postConstants.DELETE_POSTS_SUCCESS,
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
                    type: postConstants.LIKE_POSTS_SUCCESS,
                    payload: res.data,
                });
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};




