import {Dispatch} from 'redux'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../reducers/appReducer";
import {ResponseType} from "../common/types";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
	if (data.messages.length) {
		dispatch(setAppErrorAC(data.messages[0]))
	} else {
		dispatch(setAppErrorAC('Some error occurred'))
	}
	dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
	dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
	dispatch(setAppStatusAC('failed'))
}