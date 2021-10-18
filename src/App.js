import './App.css';

import AudioReactRecorder, {RecordState} from 'audio-react-recorder'
import {useState} from "react";
import AudioSpectrum from "react-audio-spectrum/lib/AudioSpectrum";
import axios from "axios";
import Post from "./compoents/post/Post";
import NewPost from "./compoents/newPost/NewPost";


function Recorder() {
	const [recordState, setRecordState] = useState(null)
	const [recordedFile, setRecordedFile] = useState("")

	const start = () => {
		setRecordState(RecordState.START)
	}
	const stop = () => {
		setRecordState(RecordState.STOP)
	}

	const onStop = (audioData) => {
		setRecordedFile(audioData)
		document.getElementById("player").load()
		console.log('audioData', audioData)
	}

	const getFileReadyToUpload = (bl) => {
		let formData = new FormData();
		let file = new File([bl.blob], 'recorded.mp3')
		formData.append("voice", file);
		return formData
	}

	return (
		<div style={{backgroundColor: 'gray', width: '100%'}}>
			<p>Recorder!</p>

			<AudioReactRecorder
				canvasWidth={0}
				canvasHeight={0}
				type={"audio/mpeg"}
				state={recordState}
				onStop={onStop}
			/>

			<button onClick={start}>Start</button>
			<button onClick={stop}>Stop</button>

			<audio id={"player"} autoPlay>
				<source src={recordedFile.url} type="audio/mpeg"/>
				Your browser does not support the audio element.
			</audio>

			<button onClick={() => {
				console.log('file', recordedFile)
				axios.post('http://127.0.0.1:8000/api/upload_post', getFileReadyToUpload(recordedFile), {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
			}}>
				Upload
			</button>

			<AudioSpectrum
				id="audio-canvas"
				// height={200}
				width={1000}
				audioId={'player'}
				capColor={'red'}
				capHeight={2}
				meterWidth={10}
				meterCount={512}
				meterColor={[
					{stop: 0, color: '#ffdd00'},
					{stop: 0.5, color: '#5c0cfd'},
					{stop: 1, color: '#ff0000'}
				]}
				gap={40}
			/>


		</div>
	)
}


function App() {

	return (
		<div className="App">
			{/*<Recorder/>*/}
			{/*<NewPost/>*/}
			<NewPost />
		</div>
	);
}

export default App;
