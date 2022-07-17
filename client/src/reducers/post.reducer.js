import { postConstants } from "../constants"

const initState = {
    post: {},
    posts: [],
    currentPage: 0,
    numberOfPages: 1,
    isLoading: true
}

const postReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case postConstants.GET_POSTS_REQUEST:
            return state = {
                ...state,
                isLoading: true
            }
        case postConstants.GET_POSTS_SUCCESS:
            return state = {
                ...state.posts,
                isLoading: false,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPage
            }
        case postConstants.GET_POST_BY_ID_REQUEST:
            return state = {
                ...state,
                isLoading: true
            }
        case postConstants.GET_POST_BY_ID_SUCCESS:
            return state = {
                ...state,
                post: action.payload,
                isLoading: false
            }
        case postConstants.GET_POSTS_BY_SEARCH_REQUEST:
            return state = {
                ...state,
                isLoading: true
            }
        case postConstants.GET_POSTS_BY_SEARCH_SUCCESS:
            return state = {
                ...state,
                isLoading: false,
                posts: action.payload
            }
        case postConstants.CREATE_POSTS_REQUEST:
            return state = {
                ...state,
                isLoading: true
            }
        case postConstants.CREATE_POSTS_SUCCESS: 
            return state = {
                ...state,
                isLoading: false,
                posts: [...state.posts, action.payload]
            }    
        case postConstants.UPDATE_POSTS_REQUEST:
            return state = {
                ...state,
                isLoading: true
            }
        case postConstants.UPDATE_POSTS_SUCCESS: 
        case postConstants.LIKE_POSTS_SUCCESS:
            const updatedState = state.posts.map(post => post._id === action.payload._id ? action.payload : post) 
            return state = {
                ...state,
                isLoading: false,
                posts: updatedState
            }  
        case postConstants.DELETE_POSTS_REQUEST:
            return state = {
                ...state,
                isLoading: true
            }
        case postConstants.DELETE_POSTS_SUCCESS:
            const deletedState = state.posts.filter(post => post._id !== action.payload)    
            return state = {
                ...state,
                isLoading: false,
                posts: deletedState
            } 
        default:
            return state
    }
}   

export default postReducer