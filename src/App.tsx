import React, {useCallback, useEffect} from 'react';
import './App.css';
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "./components/errorSnackbar/errorSnackbar";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {AppBar, Button, CircularProgress} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {TodolistsList} from "./components/TodolistsList";
import {Login} from "./features/Login";
import {useAppDispatch, useAppSelector} from "./common/hooks";
import {initializeAppTC} from "./reducers/appReducer";
import { logoutTC } from './reducers/authReducer';


export const App = () => {
	const status = useAppSelector(state => state.app.status)
	//initialized знает пронициализированы ли мы
	const initialized = useAppSelector(state => state.app.isInitialized)
	const isLoggedIn = useAppSelector(state => state.auth.isLoginIn)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(initializeAppTC())
	}, [])

	const logoutHandler = useCallback(() => {
		dispatch(logoutTC())//вылогиниваемся и убиваем куку
	}, [])

	if (!initialized) {
		return <div style={{position: 'fixed', top: '30%', width: '100%', textAlign: 'center'}}>
			<CircularProgress/>
		</div>
	}

	return (
		<BrowserRouter>
			<div className={'App'}>
				<ErrorSnackbar/>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu">
							<Menu/>
						</IconButton>
						<Typography variant="h6">
							News
						</Typography>
						{isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
					</Toolbar>
					{status === 'loading' && <LinearProgress/>}
				</AppBar>
				<Container fixed>
					<Routes>
						<Route path={'/'} element={<TodolistsList/>}/>
						<Route path={'login'} element={<Login/>}/>
						<Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
						<Route path="*" element={<Navigate to='/404'/>}/>
					</Routes>
				</Container>
			</div>
		</BrowserRouter>
	)
}








