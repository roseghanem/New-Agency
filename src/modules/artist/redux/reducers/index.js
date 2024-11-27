// **  Initial State
const initialState = {
    userData: {},
    token: false,
    loading: false
}

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                userData: action.userData,
                token: action.token
            }
        case 'USER_LOGOUT':
            const obj = { ...action }
            return { ...state, userData: {}, token: false, ...obj }
        case 'USER_MY_PROFILE':
            return {
                ...state,
                userData: action.payload
            }
        case 'USER_INFO_LOADING_START':
            return {
                ...state, loading: true
            }
        case 'USER_INFO_LOADING_END':
            return {
                ...state, loading: false
            }
        default:
            return state
    }
}
