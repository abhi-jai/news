import { Actions } from "./Actions";

let initialToast = {
    success: {message: null, status: null},
    error: {message: null, status: null},
    info: {message: null, status: null},
    warning: {message: null, status: null}
}

let initialState = {
    user: {},
    isLogged: false,
    authToken: null,
    toast: {
        success: {message: null, status: null},
        error: {message: null, status: null},
        info: {message: null, status: null},
        warning: {message: null, status: null}
    },
    logout: null
};
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.LOGIN:
            return {
                ...state,
                toast: initialToast,
                user: action.data
            };
        case Actions.LOGOUT:
            return {
                ...state,
                toast: initialToast,
                user: null,
                isLogged: false,
                authToken: null
            };
        case Actions.SET_TOKEN:
            return {
                ...state,
                toast: initialToast,
                authToken: action.data,
                isLogged: true
            };
        case Actions.NOTIFY:
            return {
                user: state.user,
                isLogged: state.isLogged,
                authToken: state.authToken,
                logout: state.logout,
                toast: {
                    ...initialToast,
                    [action.data.type]: {
                        message: action.data.message,
                        status: true
                    }
                }
            };
        case Actions.NOTIFY_CLOSE:
            return {
                user: state.user,
                isLogged: state.isLogged,
                authToken: state.authToken,
                logout: state.logout,
                toast: {
                    ...initialToast
                }
            };
        case Actions.NOTIFY_LOGOUT:
            return {
                ...state,
                logout: action.data
            };
        default:
            return state;
    }
};
  
export default Reducer;