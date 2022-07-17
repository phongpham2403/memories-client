import { authConstant } from "../constants"

const initState = {
    authData: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authConstant.LOGIN:
        case authConstant.SIGNUP:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return state = {
                ...state,
                authData: action?.data 
            }
        case authConstant.LOGOUT: 
            localStorage.clear()
            return state = {
                ...state,
                authData: null
            }
        default:
            return state
    }
}

export default authReducer