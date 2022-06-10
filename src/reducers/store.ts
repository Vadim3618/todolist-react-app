import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodoListsReducer, TodosActionType} from "./todoListsReducer";
import {TasksActionType, TasksReducer} from "./tasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";


const rootReducer = combineReducers({
	todolists: TodoListsReducer,
	tasks: TasksReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type RootReducerType = ReturnType<typeof rootReducer>

type AppActionsType = TasksActionType|TodosActionType

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

// @ts-ignore
window.store = store