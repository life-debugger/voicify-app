import './style.css'
import create_post_icon from "../../images/create_post_icon.png"
import {Link} from "react-router-dom";

function CreateBtn(props) {
	return (
		<div className='create_btn pointer'>
			<Link to={"/create-post"}>
				<img
					src={create_post_icon}
					className='icon'
					alt='create icon'
				/>
			</Link>
		</div>

	)
}

export default CreateBtn;
