import {v1} from "uuid";
import {AppThunk, FilterValueType, RequestStatusType, TodoListDomainType, TodoListType} from "../common/types";
import {todolistsAPI} from "../api/todolist-api";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";

export type TodosActionType = removeTodoListACType
	| addTodoListACType
	| changeTodoListTitleACType
	| filterACType
	| setTodolistActionType
	| changeTodolistEntityStatusActionType

let initState: TodoListDomainType[] = []
export const TodoListsReducer = (state = initState, action: TodosActionType):
	TodoListDomainType[] => {
	switch (action.type) {
		case "TODO/SET_TODOS":
			return action.todos.map(tl => {
				return {...tl, filter: 'all', entityStatus: 'idle'}
			})
		case "TODO/CHANGE_TODO_ENTITY_STATUS":
			return state.map(tl => tl.id === action.todoId
				? {...tl, entityStatus: action.entityStatus}
				: tl)
		case "TODO/REMOVE_TODOLIST": {
			return state.filter(tl => tl.id !== action.tlId)
		}
		case "TODO/ADD_TODOLIST": {
			return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
		}
		case "TODO/CHANGE_TODOLIST_TITLE": {
			return state.map(tl => tl.id === action.tlId
				? {...tl, title: action.title}
				: tl)
		}
		case "TODO/FILTER": {
			return state.map(el => el.id === action.tlId
				? {...el, filter: action.filter}
				: el)
		}
		default:
			return state
	}
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todolist: TodoListType) => {
	return {
		type: "TODO/ADD_TODOLIST", tlId: v1(), todolist
	} as const
}

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (tlId: string) => {
	return {
		type: "TODO/REMOVE_TODOLIST", tlId
	} as const
}

type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (tlId: string, title: string) => {
	return {
		type: "TODO/CHANGE_TODOLIST_TITLE", tlId, title
	} as const
}

type filterACType = ReturnType<typeof filterAC>
export const filterAC = (tlId: string, filter: FilterValueType) => {
	return {
		type: "TODO/FILTER", filter, tlId
	} as const
}

export type setTodolistActionType = ReturnType<typeof setTodolistAC>
export const setTodolistAC = (todos: TodoListType[]) => {
	return {
		type: 'TODO/SET_TODOS', todos
	} as const
}

type changeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (todoId: string, entityStatus: RequestStatusType) => {
	return {type: 'TODO/CHANGE_TODO_ENTITY_STATUS', todoId, entityStatus} as const
}

//thunks
export const fetchTodosTC = (): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsAPI.getTodolists()
		.then(res => {
			dispatch(setTodolistAC(res.data))
			dispatch(setAppStatusAC('idle'))
		})
		.catch((err: AxiosError) => {
			dispatch(setAppErrorAC(err.message))
			dispatch(setAppStatusAC('idle'))
		})
}

export const removeTodolistTC = (todoId: string): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	dispatch(changeTodolistEntityStatusAC(todoId, 'loading'))
	todolistsAPI.deleteTodolist(todoId)
		.then(res => {
			res.data.resultCode === 0
				? dispatch(removeTodoListAC(todoId))
				: dispatch(setAppErrorAC(res.data.messages[0]))
			dispatch(setAppStatusAC('idle'))
		})
		.catch((err: AxiosError) => {
			dispatch(setAppErrorAC(err.message))
			dispatch(setAppStatusAC('idle'))
		})
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsAPI.createTodolist(title)
		.then(res => {
			res.data.resultCode === 0
				? dispatch(addTodoListAC(res.data.data.item))
				: dispatch(setAppErrorAC(res.data.messages[0]))
			dispatch(setAppStatusAC('idle'))
		})
		.catch((err: AxiosError) => {
			dispatch(setAppErrorAC(err.message))
			dispatch(setAppStatusAC('idle'))
		})
}

export const ChangeTodoTitleTC = (todoId: string, title: string): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsAPI.updateTodolist(todoId, title)
		.then(res => {
			res.data.resultCode === 0
				? dispatch(changeTodoListTitleAC(todoId, title))
				: dispatch(setAppErrorAC(res.data.messages[0]))
			dispatch(setAppStatusAC('idle'))
		})
		.catch((err: AxiosError) => {
			dispatch(setAppErrorAC(err.message))
			dispatch(setAppStatusAC('idle'))
		})
}


