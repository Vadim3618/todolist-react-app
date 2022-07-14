import {TasksActionType} from "../reducers/tasksReducer";
import {TodosActionType} from "../reducers/todoListsReducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {rootReducer, store} from "../reducers/store";

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3,
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}

export type TodoListType = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type TodoListDomainType = TodoListType & {
	filter: FilterValueType
	entityStatus: RequestStatusType
}

export type TaskDomainType = TaskType & {
	entityStatus: RequestStatusType
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TaskType = {
	description?: string
	title: string
	status?: number
	priority?: number
	startDate?: string
	deadline?: string
	id?: string
	todoListId: string
	order?: number
	addedDate?: string
}

export type TaskObjectType = { [key: string]: TaskDomainType[] }

export type FilterValueType = 'all' | 'completed' | 'active'

export type ResponseType<D = {}> = {
	resultCode: number
	messages: Array<string>
	fieldsErrors: Array<string>
	data: D
}

export type UpdateTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}

export type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: TaskType[]
}

export type RootReducerType = ReturnType<typeof rootReducer>

export type AppActionsType = TasksActionType | TodosActionType

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>