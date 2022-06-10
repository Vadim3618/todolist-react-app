import React, {useCallback, useEffect} from 'react';
import './App.css';
import SearchAppBar from "./components/SearchAppBar";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./reducers/store";
import {
	addTodoListAC,
	changeTodoListTitleAC, fetchTodosTC,
	filterAC,
	removeTodoListAC
} from "./reducers/todoListsReducer";
import {
	addTaskAC,
	addTaskTC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	removeTaskTC, updateTaskStatusTC
} from "./reducers/tasksReducer";
import {Container, Grid, Paper} from "@mui/material";
import {AddItemForm} from "./components/AddItemForm";
import TodoList from "./components/TodoList";
import {FilterValueType, TaskObjectType, TaskStatuses, TodoListDomainType} from "./common/types";
import {useAppDispatch, useAppSelector} from "./reducers/hooks";


const App = () => {

	const todolists = useAppSelector(state => state.todolists)
	const tasks = useAppSelector(state => state.tasks)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTodosTC())
	}, [])

	const changeFilter = useCallback((tlId: string, filter: FilterValueType) => {
		dispatch(filterAC(tlId, filter))
	}, [dispatch])
	const removeTask = useCallback((todoId: string, taskId: string) => {
		dispatch(removeTaskTC(todoId, taskId))
	}, [dispatch])
	const removeTodoList = useCallback((tlId: string) => {
		dispatch(removeTodoListAC(tlId))
	}, [dispatch])
	const addTask = useCallback((todoID: string, title: string) => {
		dispatch(addTaskTC(todoID, title))
	}, [dispatch])
	const changeStatus = useCallback((tlId: string, id: string, newIsDone: TaskStatuses) => {
		dispatch(updateTaskStatusTC(tlId, id, newIsDone))
	}, [dispatch])
	const addTodoList = useCallback((title: string) => {
		dispatch(addTodoListAC(title))
	}, [dispatch])
	const changeTaskTitle = useCallback((tlId: string, id: string, newTitle: string) => {
		dispatch(changeTaskTitleAC(tlId, id, newTitle))
	}, [dispatch])
	const changeTodoListTitle = useCallback((tlId: string, newTitle: string) => {
		dispatch(changeTodoListTitleAC(tlId, newTitle))
	}, [dispatch])
	return (
		<div className={'App'}>
			<SearchAppBar/>
			<Container fixed>
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
				</Grid>
			</Container>

		</div>
	)
}

export default App;

