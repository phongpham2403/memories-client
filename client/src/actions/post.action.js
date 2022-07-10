import axios from "../helpers/axios"

export const getPosts = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`posts`);
            if (res.status === 200) {
                dispatch({
                    type: 'FETCH_ALL',
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
                    type: 'CREATE',
                    payload: res.data,
                });
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    };
};
