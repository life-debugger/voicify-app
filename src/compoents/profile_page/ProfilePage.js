import './style.css'
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {get_user_info, update_user} from "../../api";


function Btn(props) {
	return (
		<div className='field'>
			<div className='label'>
			</div>
			<div
				className="btn pointer"
				placeholder={props.name}
				onClick={props.onClick}
			>
				{props.label}
			</div>
		</div>
	)
}


const handleLogoutBtn = (_history) => {
	sessionStorage.removeItem("username")
	_history.push("/login")

}


function ProfilePage(props) {
	const [user, setUser] = useState({})
	const username = sessionStorage.getItem('username')
	const [name, setName] = useState(user.name)
	const [email, setEmail] = useState(user.email)
	const [avatar, setAvatar] = useState(user.avatar)

	useEffect(() => {
		get_user_info(username, success_get_user, fail_get_user)
	}, [])


	const success_get_user = (user) => {
		setUser(user)
		setName(user.name)
		setEmail(user.email)
		setAvatar(user.avatar)
	}

	const fail_get_user = (msg) => {
		toast.error("Something went wrong")
	}

	const success_update = (msg) => {
		toast.success("Login was successful")
	}

	const fail_update = (msg) => {
		toast.error("Something was wrong")
	}

	const handleSubmitBtn = () => {
		let new_user = {username: user.username, name: name, email: email, avatar: avatar}
		update_user(new_user, success_update, fail_update)
	}

	function Field(props) {
		return (
			<div className='field'>
				<div className='label'>
					{props.label}
				</div>
				<input
					readOnly={true}
					className={props.name}
					value={props.value}
					placeholder={props.name}
				>
				</input>
			</div>
		)
	}

	const handleAvatarInput = (e) => {
		setAvatar(e.target.files[0])
	}
	const history = useHistory()
	return (
		<div className='profile_page'>
			<div className='profile_container'>
				<div className='right_part'>
					<img
						src={user.avatar}
						className='avatar'
						alt='avatar'
					/>
					<input
						className='custom-file-input btn submit_btn'
						id="file-upload" type="file"
						onChange={handleAvatarInput}
					/>
					<div
						className='btn change_btn pointer'
						onClick={handleSubmitBtn}
					>
						Submit
					</div>
				</div>
				<div className='left_part'>
					<Field
						name={'username'}
						value={"@" + username}
						label={'Username'}
					/>
					<div className='field'>
						<div className='label'>
							Name
						</div>
						<input
							className={'email'}
							value={name}
							onChange={(e) => {
								setName(e.target.value)
							}}
						>
						</input>
					</div>
					<div className='field'>
						<div className='label'>
							Email
						</div>
						<input
							className={'email'}
							value={email}
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						>
						</input>
					</div>

					{/*<Btn*/}
					{/*	label="Delete Account"*/}
					{/*	// onClick={handleDeleteBtn}*/}

					{/*/>*/}
					<Btn
						label="Logout"
						onClick={() => {
							handleLogoutBtn(history)
						}}
					/>

				</div>
			</div>
		</div>
	)
}

export default ProfilePage;