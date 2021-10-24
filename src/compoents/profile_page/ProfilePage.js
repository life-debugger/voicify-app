import './style.css'
import avatar from "../../images/hagrid-avatar.jpg"
import {useHistory} from "react-router-dom";


function Field(props) {
	return (
		<div className='field'>
			<div className='label'>
				{props.label}
			</div>
			<input
				className={props.name}
				value={props.value}
				placeholder={props.name}
			>
			</input>
		</div>
	)
}

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

const handleDeleteBtn = () => {
	console.log("delete btn")
}

const handleLogoutBtn = (_history) => {
	sessionStorage.removeItem("username")
	_history.push("/login")

}


function ProfilePage(props) {
	const history = useHistory()
	return (
		<div className='profile_page'>
			<div className='profile_container'>
				<div className='right_part'>
					<img
						src={avatar}
						className='avatar'
						alt='avatar'
					/>
					<div className='btn submit_btn pointer'>
						Change
					</div>
					<div className='btn change_btn pointer'>
						Submit
					</div>
				</div>
				<div className='left_part'>
					<Field
						name={'username'}
						value={'@hagrid'}
						label={'Username'}
					/>
					<Field
						name={'name'}
						value={'robbie hagrid'}
						label={'Name'}
					/><Field
					name={'email'}
					value={'hagrid@hogwarts.edu'}
					label={'Email'}
				/>
					<Btn
						label="Delete Account"
						onClick={handleDeleteBtn}

					/>
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