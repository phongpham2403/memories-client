const initState = {
    posts: []
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return state = {
                ...state.posts,
                posts: action.payload
            }
        case 'CREATE': 
            return state = {
                ...state,
                posts: [...state.posts, action.payload]
            }            
        default:
            return state
    }
}   

export default postReducer