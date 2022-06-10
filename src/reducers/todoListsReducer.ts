import {v1} from "uuid";
import {FilterValueType, TodoListDomainType, TodoListType} from "../common/types";
import {Dispatch} from "redux";
import {todolistsAPI} from "../api/todolist-api";
import {AppThunk} from "./store";


export type TodosActionType = removeTodoListACType
	| addTodoListACType
	| changeTodoListTitleACType
	| filterACType
	| setTodolistActionType

let initState: TodoListDomainType[] = []
export const TodoListsReducer = (state = initState, action: TodosActionType):
	TodoListDomainType[] => {
	switch (action.type) {
		case "SET_TODOS":
			return action.todos.map(tl => {
				return {...tl, filter: 'all'}
			})
		case "REMOVE-TODOLIST": {
			return state.filter(tl => tl.id !== action.tlId)
		}
		case "ADD-TODOLIST": {
			let NewTodolist = {
				id: action.tlId,
				filter: 'all' as FilterValueType,
				title: action.title,
				addedDate: '',
				order: 0
			}
			return [NewTodolist, ...state]
		}
		case "CHANGE-TODOLIST-TITLE": {
			return state.map(tl => tl.id === action.tlId
				? {...tl, title: action.title}
				: tl)
		}
		case "FILTER": {
			return state.map(el => el.id === action.tlId
				? {...el, filter: action.filter}
				: el)
		}
		default:
			return state
	}
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {
	return {
		type: "ADD-TODOLIST", tlId: v1(), title
	} as const
}

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (tlId: string) => {
	return {
		type: "REMOVE-TODOLIST", tlId
	} as const

}

type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (tlId: string, title: string) => {
	return {
		type: "CHANGE-TODOLIST-TITLE", tlId, title
	} as const
}

type filterACType = ReturnType<typeof filterAC>
export const filterAC = (tlId: string, filter: FilterValueType) => {
	return {
		type: "FILTER", filter, tlId
	} as const
}

export type setTodolistActionType = ReturnType<typeof setTodolistAC>
export const setTodolistAC = (todos: TodoListType[]) => {
	return {
		type: 'SET_TODOS', todos
	} as const
}

//thunks
export const fetchTodosTC = ():AppThunk => (dispatch) => {
	todolistsAPI.getTodolists()
		.then(res => {
			dispatch(setTodolistAC(res.data))
		})
}


