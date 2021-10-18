import './style.css'
import profilePicture from '../../images/profile-image.jpg'
import hagridAvatar from '../../images/hagrid-avatar.jpg'
import share_icon from '../../images/share_icon.png'
import fav_icon from '../../images/heart_icon.png'
import play_icon from '../../images/play_icon.png'
import pause_icon from '../../images/pause_icon.png'
import record_icon from '../../images/record.png'
import open_mic from '../../images/open-mic_icon.png'
import upload_icon from '../../images/upload.png'
import AudioSpectrum from "react-audio-spectrum";
import test_audio from "../../audio/youre-a-wizard.mp3";


import {useRef, useState} from "react";
import AudioReactRecorder, {RecordState} from "audio-react-recorder";
import axios from "axios";

function NewPost() {
	const [recordedFile, setRecordedFile] = useState("")
	// const audioElement = useRef(new Audio(recordedFile));
	const [isPlaying, setIsPlaying] = useState(false)
	// audioElement.current.onended = () => {
	// 	setIsPlaying(false)
	// }


	const [recordState, setRecordState] = useState(null)

	const start = () => {
		setRecordState(RecordState.START)
	}
	const stop = () => {
		setRecordState(RecordState.STOP)
	}

	const onStop = (audioData) => {

		setRecordedFile(audioData)
		// document.getElementById("player").load()
		console.log('audioData', audioData)
		// audioElement.current.load()
		document.getElementById('player').play().then((e) => {
			console.log(e)
		}, (e) => {
			console.log(e)
		})

	}

	const getFileReadyToUpload = (bl) => {
		let formData = new FormData();
		let file = new File([bl.blob], 'recorded.mp3')
		formData.append("voice", file);
		return formData
	}
	return (
		<div className="new-post">

			<div className='top'>
				<div className='profile_info'>
					<img className='avatar' src={hagridAvatar} alt={'avatar'}/>
				</div>
				<div className='title'>I'm a what?!</div>
			</div>
			<audio id="player" src={recordedFile.url} autoPlay/>
			<div className='body'>
				<AudioReactRecorder
					className='recorder'
					canvasWidth={0}
					canvasHeight={0}
					type={"audio/mpeg"}
					state={recordState}
					onStop={onStop}
				/>

				<AudioSpectrum
					id="audio-canvas"
					height={150}
					width={700}
					audioId={'player'}
					// audioEle={audioElement.current}
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
				{recordState === RecordState.START ?
					<img className='icon pointer' src={open_mic} alt={'pause'}
					     onClick={() => {
						     setRecordState(RecordState.STOP)
					     }}
					/>
					:
					<img className='icon pointer' src={record_icon} alt={'play'}
					     onClick={() => {
						     setRecordState(RecordState.START)
					     }}
					/>
				}

				{isPlaying ?
					<img className='icon pointer' src={pause_icon} alt={'pause'}
					     onClick={() => {
						     // audioElement.current.pause()
						     setIsPlaying(false)
						     document.getElementById("player").pause()
					     }}
					/>
					:
					<img className='icon pointer' src={play_icon} alt={'play'}
					     onClick={() => {
						     console.log(recordedFile)
						     document.getElementById("player").play()
						     // audioElement.current.play().then(() =>{console.log("hey")}, (e)=>{console.log(e)})
						     setIsPlaying(true)
					     }}
					/>
				}
				<img className='icon pointer' src={upload_icon} alt={'upload'}
				     onClick={() => {
					     axios.post('http://127.0.0.1:8000/api/upload_post', getFileReadyToUpload(recordedFile), {
						     headers: {
							     'Content-Type': 'multipart/form-data'
						     }
					     })
				     }}
				/>

			</div>

		</div>
	);
}

export default NewPost;
