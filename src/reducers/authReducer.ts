import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../api/api";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: initialStateType = {
	isLoginIn: false
}
type initialStateType = {
	isLoginIn: boolean
}
export const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
	switch (action.type) {
		case "LOGIN/SET_IS_LOGGED_IN":
			return {...state, isLoginIn: action.value}
		default:
			return state
	}
}

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'LOGIN/SET_IS_LOGGED_IN', value} as const)


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.login(data)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true))
				dispatch(setAppStatusAC('succeeded'))
			} else {
				handleServerAppError(res.data, dispatch);
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType | SetAppStatusActionType|SetAppErrorActionType>) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.logout()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(false))
				dispatch(setAppStatusAC('succeeded'))
			} else {
				handleServerAppError(res.data, dispatch);
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>