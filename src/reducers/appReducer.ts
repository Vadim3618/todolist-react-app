import {RequestStatusType} from "../common/types";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {setIsLoggedInAC} from "./authReducer";

const initialState = {
	status: 'idle' as RequestStatusType,//происходит ли сейчас взаимодействие с сервером
	error: null as null | string,//когда ошибка мы запишем текст ошибки сюда
	isInitialized: false //проинициализировано ли апп или нет перед стартом апп
}

export type ActionsType = SetAppStatusActionType
	| SetAppErrorActionType
	| ReturnType<typeof setAppInitializedAC>

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case "APP/SET_IS_INITIALIZED":
			return {...state, isInitialized: action.value}
		case 'APP/SET_STATUS':
			return {...state, status: action.status}
		case "APP/SET_ERROR":
			return {...state, error: action.error}
		default:
			return state
	}
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET_ERROR', error} as const)

export const setAppInitializedAC = (value: boolean) => {
	return {type: 'APP/SET_IS_INITIALIZED', value} as const
}
// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
	authAPI.me()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true))
			} else {
				// dispatch(setAppErrorAC(res.data.messages[0]))
			}
			dispatch(setAppInitializedAC(true))
		})
}
