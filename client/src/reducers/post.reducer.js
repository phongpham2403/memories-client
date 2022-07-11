import { postConstants } from "../constants"

const initState = {
    posts: []
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case postConstants.GET_POST:
            return state = {
                ...state.posts,
                posts: action.payload
            }
        case postConstants.CREATE_POST: 
            return state = {
                ...state,
                posts: [...state.posts, action.payload]
            }    
        case postConstants.UPDATE_POST: 
        case postConstants.LIKE_POST:
            const updatedState = state.posts.map(post => post._id === action.payload._id ? action.payload : post) 
            return state = {
                ...state,
                posts: updatedState
            }  
        case postConstants.DELETE_POST:
            const deletedState = state.posts.filter(post => post._id !== action.payload)    
            return state = {
                ...state,
                posts: deletedState
            } 
        default:
            return state
    }
}   

export default postReducer