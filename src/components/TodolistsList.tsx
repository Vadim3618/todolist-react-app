import React, {useCallback, useEffect} from "react";
import {addTodolistTC, ChangeTodoTitleTC, fetchTodosTC, filterAC, removeTodolistTC} from "../reducers/todoListsReducer";
import {FilterValueType, TaskStatuses} from "../common/types";
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from "../reducers/tasksReducer";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "./AddItemForm";
import Paper from "@mui/material/Paper";
import TodoList from "./TodoList";
import {useAppDispatch, useAppSelector} from "../common/hooks";
import {Navigate} from "react-router-dom";

export const TodolistsList = () => {
	const todolists = useAppSelector(state => state.todolists)
	const tasks = useAppSelector(state => state.tasks)
	const isLoggedIn = useAppSelector(state => state.auth.isLoginIn)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!isLoggedIn) return//предовращаем загрузку тудулистов если не залогинены
		dispatch(fetchTodosTC())
	}, [])

	const changeFilter = useCallback((tlId: string, filter: FilterValueType) => {
		dispatch(filterAC(tlId, filter))
	}, [dispatch])

	const removeTask = useCallback((todoId: string, taskId: string) => {
		dispatch(removeTaskTC(todoId, taskId))
	}, [dispatch])

	const removeTodoList = useCallback((todoId: string) => {
		dispatch(removeTodolistTC(todoId))
	}, [dispatch])

	const addTask = useCallback((todoID: string, title: string) => {
		dispatch(addTaskTC(todoID, title))
	}, [dispatch])

	const changeStatus = useCallback((tlId: string, id: string, newIsDone: TaskStatuses) => {
		dispatch(updateTaskStatusTC(tlId, id, newIsDone))
	}, [dispatch])

	const changeTaskTitle = useCallback((tlId: string, id: string, newTitle: string) => {
		dispatch(updateTaskTitleTC(tlId, id, newTitle))
	}, [dispatch])

	const addTodoList = useCallback((title: string) => {
		dispatch(addTodolistTC(title))
	}, [dispatch])

	const changeTodoListTitle = useCallback((todoId: string, newTitle: string) => {
		dispatch(ChangeTodoTitleTC(todoId, newTitle))
	}, [dispatch])

	//если не залогинены то редирект на страницу логинизации
	if (!isLoggedIn) {
		return <Navigate to={'/login'}/>
	}

	return (
		<>
			<Grid container style={{padding: '20px'}}>
				<AddItemForm title={'Add New TodoList'} addItem={addTodoList}/>
			</Grid>
			<Grid container spacing={5}>
				{todolists.map(tl => {
					return <Grid key={tl.id} item>
						<Paper elevation={6} style={{padding: '10px'}}>
							<TodoList
								key={tl.id}
								tlId={tl.id}
								title={tl.title}
								filter={tl.filter}
								tasks={tasks[tl.id]}
								entityStatus={tl.entityStatus}
								addTask={addTask}
								removeTask={removeTask}
								changeFilter={changeFilter}
								changeStatus={changeStatus}
								removeTodoList={removeTodoList}
								changeTaskTitle={changeTaskTitle}
								changeTodoListTitle={changeTodoListTitle}
							/>
						</Paper>
					</Grid>
				})}
			</Grid></>
	)
}