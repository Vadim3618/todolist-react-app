import React, {useCallback, useEffect} from 'react';
import './App.css';
import SearchAppBar from "./components/SearchAppBar";
import {addTodolistTC, ChangeTodoTitleTC, fetchTodosTC, filterAC, removeTodolistTC} from "./reducers/todoListsReducer";
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from "./reducers/tasksReducer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import {AddItemForm} from "./components/AddItemForm";
import TodoList from "./components/TodoList";
import {FilterValueType, TaskStatuses} from "./common/types";
import {useAppDispatch, useAppSelector} from "./reducers/hooks";
import {ErrorSnackbar} from "./components/errorSnackbar/errorSnackbar";


const App = () => {

	const status = useAppSelector(state => state.app.status)
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

	return (
		<div className={'App'}>
			<SearchAppBar/>
			{status === 'loading' && <LinearProgress/>
			}
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
				</Grid>
			</Container>
			<ErrorSnackbar/>
		</div>
	)
}

export default App;

