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

function Post() {
	const audioElement = useRef(new Audio(test_audio));
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
				<div className='title'>I'm a what?!</div>
			</div>
			<div className='body'>

				<AudioSpectrum
					id="audio-canvas"
					height={200}
					width={1000}
					audioEle={audioElement.current}
					capColor={'red'}
					capHeight={2}
					meterWidth={10}
					meterCount={512}
					meterColor={[
						{stop: 0, color: '#ffdd00'},
						{stop: 0.5, color: '#6efdcb'},
						{stop: 1, color: '#ff0000'}
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
