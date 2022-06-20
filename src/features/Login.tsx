import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {loginTC} from "../reducers/authReducer";
import {useAppDispatch, useAppSelector} from "../common/hooks";
import {Navigate} from "react-router-dom";


export const Login = () => {

	const dispatch = useAppDispatch()

		//isLoggedIn знает залогинены или нет
	const isLoggedIn = useAppSelector(state => state.auth.isLoginIn)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		validate: values => {
			if (!values.email) {
				return {email: 'Email is required'}
			}
			if (!values.password) {
				return {password: 'Password is required'}
			}
		},
		onSubmit: values => {
			dispatch(loginTC(values));
		},
	})

	//после авторизации попадем на гл страницуа
	if(isLoggedIn){
		return <Navigate to={'/'}/>
	}

	return <Grid container justifyContent={'center'}>
		<Grid item justifyContent={'center'}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl>
					<FormLabel>
						<p>To log in get registered
							<a href={'https://social-network.samuraijs.com/'}
							   target={'_blank'}> here
							</a>
						</p>
						<p>or use common test account credentials:</p>
						<p>Email: free@samuraijs.com</p>
						<p>Password: free</p>
					</FormLabel>
					<FormGroup>

						<TextField label="Email" margin="normal"
						           {...formik.getFieldProps('email')}/>
						{formik.errors.email ? <div>{formik.errors.email}</div> : null}

						<TextField type="password" label="Password"
						           margin="normal"
						           {...formik.getFieldProps('password')}/>
						{formik.errors.password ? <div>{formik.errors.password}</div> : null}

						<FormControlLabel label={'Remember me'} control={<Checkbox/>}
						                  checked={formik.values.rememberMe}
						                  {...formik.getFieldProps('rememberMe')}/>

						<Button type={'submit'} variant={'contained'} color={'primary'}>
							Login
						</Button>
					</FormGroup>
				</FormControl>
			</form>
		</Grid>
	</Grid>
}
