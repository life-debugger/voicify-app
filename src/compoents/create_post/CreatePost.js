import './style.css'
import avatar_pic from "../../images/hagrid-avatar.jpg"
import upload_icon from "../../images/upload.png"
import stop_icon from "../../images/stop_icon.png"
import replay_icon from "../../images/replay.png"
import record_icon from "../../images/record_icon.png"
import {useEffect, useMemo, useState} from "react";
import AudioReactRecorder, {RecordState} from "audio-react-recorder";
import {toast, ToastContainer} from "react-toastify";
import {upload_new_post} from "../../api";

function CreatePost(props) {
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)
	const [recordState, setRecordState] = useState(null)
	const [recordedFile, setRecordedFile] = useState("test-test")
	const [title, setTitle] = useState("")
	const audioElement = useMemo(() => (

		new Audio(recordedFile)
	), [recordedFile])
	useEffect(() => {
		audioElement.src = recordedFile.url
	}, [audioElement, recordedFile])

	audioElement.ontimeupdate = (e) => {
		let t = audioElement.currentTime
		if (t !== 0) {
			setCurrentTime(Math.floor(audioElement.currentTime))

		}
	}
	audioElement.onplay = (e) => {
	}
	const handleRecordBtn = () => {

		if (recordState === RecordState.START) {
			setRecordState(RecordState.STOP)
		} else {
			setRecordState(RecordState.START)
		}
	}

	const upload = () => {
		upload_new_post(title, recordedFile, success_upload, fail_upload)
	}

	const handleReplayBtn = () => {
		setDuration(Math.floor(audioElement.duration))
		audioElement.play().then((e) => {
		}, (e) => {
			console.warn(e)

		})
	}

	const success_upload = (msg) => {
		toast.success(msg)
		// history.push("/feed")
	}

	const fail_upload = (msg="Something went wrong") => {
		toast.error(msg)
	}
	const onStop = (audioData) => {
		setRecordedFile(audioData)
		audioElement.load()
	}

	const handleTitleInput = (e) => {
		setTitle(e.target.value)
	}

	return (
		<div className='voice_post'>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={true}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className='post_header'>
				<div className='post-owner'>
					<img
						src={avatar_pic}
						className='avatar'
						alt='avatar'
					/>
					<div className="user-info">
						<div className='name'>
							Rubeus Hagrid
						</div>
						<div className='username'>
							@hagrid
						</div>
					</div>
				</div>
				<div className='upload_btn pointer'
				     onClick={upload}
				>
					<div className='upload_text'>
						upload
					</div>
					<img
						src={upload_icon}
						alt='heart_icon'
						className='icon pointer'
					/>

				</div>
			</div>
			<div className='post_body'>
				<AudioReactRecorder
					className='recorder'
					canvasWidth={0}
					canvasHeight={0}
					type={"audio/mpeg"}
					state={recordState}
					onStop={onStop}
				/>


				<div className='controller_group'>
					<img
						src={recordState === RecordState.START ? stop_icon : record_icon}
						className='controller_icon  pointer'
						alt='play_icon'
						onClick={handleRecordBtn}
					/>
					<div className='timer'>
						{duration ? currentTime + "s : " + duration + "s" : "0s"}
					</div>
					<img
						src={replay_icon}
						onClick={handleReplayBtn}
						className='controller_icon pointer'
						alt='play_icon'
					/>
				</div>
				<textarea
					className='post_title'
					onChange={handleTitleInput}
					placeholder='Add a title...'
				>

				</textarea>
			</div>
		</div>

	)
}

export default CreatePost;
