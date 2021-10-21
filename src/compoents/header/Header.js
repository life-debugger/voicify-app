import './style.css'
import {Link} from "react-router-dom";
import logo from "../../images/logo.png"
import user_avatar from "../../images/hagrid-avatar.jpg"

function Header(props) {
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
					robbie hagrid
				</div>
			</div>

		</div>

	)
}

export default Header;
