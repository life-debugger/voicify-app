import './style.css'
import hagridAvatar from '../../images/hagrid-avatar.jpg'
import share_icon from '../../images/share_icon.png'
import fav_icon from '../../images/heart_icon.png'
import play_icon from '../../images/play_icon.png'
import pause_icon from '../../images/pause_icon.png'
import AudioSpectrum from "react-audio-spectrum";
import {useState} from "react";
import test_audio from "../../audio/youre-a-wizard.mp3";

function Post(props) {
	const playerId = "" + props.postID + "test"
	const [isPlaying, setIsPlaying] = useState(false)
    console.log("ID:", playerId)
	return (
		<div className="post">

			<div className='top'>
				<div className='profile_info'>
					<img className='avatar' src={hagridAvatar} alt={'avatar'}/>
				</div>
				<div className='title'>{props.title}</div>
			</div>
			<audio
				id={playerId}
				// src={props.voiceURL}
				src={props.voiceURL}
				crossOrigin={'anonymous'}
				controlsList={'nodownload'}
				/>

			<div className='body'>

				<AudioSpectrum
					id="audio-canvas"
					height={200}
					width={450}
					audioId={playerId}
					capColor={'#007F8A'}
					capHeight={5}
					meterWidth={40}
					meterCount={512}
					meterColor={[
						{stop: 0, color: '#007F8A'},
						{stop: 0.55, color: '#00555e'},
						{start: .6, stop: .7, color: 'purple'},
					]}
					gap={40}
				/>

			</div>
			<div className='footer'>
				<img className='icon' src={fav_icon} alt={'fav'}/>
				{isPlaying ?
					<img className='icon pointer' src={pause_icon} alt={'pause'}
					     onClick={() => {
						     // audioElement.current.pause()
						     document.getElementById(playerId).pause()

						     setIsPlaying(false)
					     }}
					/>
					:
					<img className='icon pointer' src={play_icon} alt={'play'}
					     onClick={() => {
						     document.getElementById(playerId).onended = () => {
							     setIsPlaying(false)
						     }
						     console.log(props.voiceURL)
						     document.getElementById(playerId).load()
						     document.getElementById(playerId).play()
						     // audioElement.current.load()
						     // audioElement.current.play()
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
