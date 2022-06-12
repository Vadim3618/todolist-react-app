import {RequestStatusType} from "../common/types";

const initialState = {
	status: 'idle' as RequestStatusType,
	error: null as null | string,
}

export type ActionsType = setAppStatusActionType | setAppErrorActionType

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET_STATUS':
			return {...state, status: action.status}
		case "APP/SET_ERROR":
			return {...state, error: action.error}
		default:
			return state
	}
}

type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)


type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET_ERROR', error} as const)


