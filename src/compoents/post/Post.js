import './style.css'
import profilePicture from '../../images/profile-image.jpg'
import hagridAvatar from '../../images/hagrid-avatar.jpg'
import share_icon from '../../images/share_icon.png'
import fav_icon from '../../images/heart_icon.png'
import play_icon from '../../images/play_icon.png'
import pause_icon from '../../images/pause_icon.png'
import AudioSpectrum from "react-audio-spectrum";
import test_audio from "../../audio/youre-a-wizard.mp3";
import {useRef, useState} from "react";

function Post(props) {
	const audioElement = useRef(new Audio(props.voiceURL));
	console.log("Post", props.voiceURL)
	audioElement.current.crossOrigin = "anonymous"
	audioElement.current.controlsList = "nodownload"
	const [isPlaying, setIsPlaying] = useState(false)
	audioElement.current.onended = () => {
		setIsPlaying(false)
	}

	return (
		<div className="post">

			<div className='top'>
				<div className='profile_info'>
					<img className='avatar' src={hagridAvatar} alt={'avatar'}/>
				</div>
				<div className='title'>{props.title}</div>
			</div>
			<div className='body'>

				<AudioSpectrum
					id="audio-canvas"
					height={200}
					width={500}
					audioEle={audioElement.current}
					capColor={'#003c41'}
					capHeight={0}
					meterWidth={50}
					meterCount={10}
					meterColor={[
						{stop: 0, color: '#007F8A'},
						{stop: 1, color: '#007F8A'},
						// {stop: 0.5, color: '#d46efd'},
						// {stop: 1, color: '#ff0000'}
					]}
					gap={40}
				/>

			</div>
			<div className='footer'>
			<img className='icon' src={fav_icon} alt={'fav'}/>
				{isPlaying ?
					<img className='icon pointer' src={pause_icon} alt={'pause'}
					     onClick={() => {
						     audioElement.current.pause()
						     setIsPlaying(false)
					     }}
					/>
					:
					<img className='icon pointer' src={play_icon} alt={'play'}
					     onClick={() => {
						     audioElement.current.load()
						     audioElement.current.play()
						     setIsPlaying(true)
					     }}
					/>
				}


				<img className='icon' src={share_icon} alt={'share'}/>

			</div>
		</div>
	);
}

export default Post;
