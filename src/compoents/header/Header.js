import './style.css'
import {Link, useHistory} from "react-router-dom";
import logo from "../../images/logo.png"
import user_avatar from "../../images/hagrid-avatar.jpg"
import {useEffect, useState} from "react";
import {get_user_info} from "../../api";

function Header(props) {
	const username = sessionStorage.getItem('username')
	const [user, setUser] = useState({})
	const history = useHistory();
	useEffect(() => {
		get_user_info(
			username,
			(u) => {
				setUser(u)
			},
			() => {
				history.push('login')
			}
		)
	}, [username, history])

	return (
		<div className='header'>
			<div className='brand'>
				<Link to="/feed">
					<img
						src={logo}
						className='logo pointer'
						alt='logo'
					/>
				</Link>
				<Link to="/feed">
					<div className='brand_title pointer'>
						Voicify
					</div>
				</Link>
			</div>
			<div className='user_info'>

				<img
					alt='user-avatar'
					className='user_avatar'
					src={user_avatar}
				/>
				<div className='name'>
					{user.name}
				</div>

			</div>

		</div>

	)
}

export default Header;
