import './style.css'
import poster_pic from "../../images/poster.png"
import {useEffect, useState} from "react";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {login_validator} from "../../api"
import {useHistory} from "react-router-dom";


function LoginPage() {
	const [usernameInput, setUsernameInput] = useState("")
	const [passwordInput, setPasswordInput] = useState("")
	let history = useHistory();

	const success_login = () => {
		sessionStorage.setItem('username', usernameInput)
		sessionStorage.setItem('password', passwordInput)
		toast.success("Login was successful")
		history.push("/feed")
	}

	const fail_login = () => {
		toast.error("Something was wrong")
	}

	const handle_login = () => {
		login_validator(usernameInput, passwordInput, success_login, fail_login)
	}

	const handleInput = (field, text) => {
		switch (field) {
			case 'username':
				setUsernameInput(text)
				break
			case 'password':
				setPasswordInput(text)
				break
			default:
				console.warn('add a field param')
		}
	}

	useEffect(() => {
		const listener = event => {
			if (event.code === "Enter" || event.code === "NumpadEnter") {
				event.preventDefault();
				handle_login()
			}
		};
		document.addEventListener("keydown", listener);
		return () => {
			document.removeEventListener("keydown", listener);
		};
	});


	return (
		<div className='login_page'>

			<div className='title'>
				Voicify
			</div>
			<div className='description'>
				it’s time to move on from text.
			</div>

			<div className='login_container'>
				<form onSubmit={handle_login} className='login_form'>
					<div className='login_title'>
						Login
					</div>
					<div className='input_group'>
						<input placeholder={'username'}
						       onChange={(e) => {
							       handleInput('username', e.target.value)
						       }}
						/>
						<input placeholder={'password'}
						       type='password'
						       onChange={(e) => {
							       handleInput('password', e.target.value)
						       }}
						/>
					</div>
					<div className='login_btn pointer' onClick={handle_login}>
						Login
					</div>
				</form>
				<div className='poster_container'>
					<img
						src={poster_pic}
						alt='voicify poster'
						className='poster'
					/>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
