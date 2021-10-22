import './style.css'
import avatar_pic from "../../images/hagrid-avatar.jpg"
import like_icon from "../../images/heart.png"
import share_icon from "../../images/share_icon.png"
import play_icon from "../../images/play_icon.png"
import stop_icon from "../../images/pause_icon.png"
import replay_icon from "../../images/replay.png"
import {useEffect, useRef, useState} from "react";

function VoicePost(props) {
	const [isPlaying, setIsplaying] = useState(false)
	const audioElement = useRef(new Audio(props.voiceURL))
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)

	useEffect(()=>{
		audioElement.current.load()
		setDuration(audioElement.current.duration)
	}, [])

	audioElement.current.onpause = () => {
		setIsplaying(false)
		setCurrentTime(0)
	}
	audioElement.current.ontimeupdate = (e) => {
		setCurrentTime(Math.floor(audioElement.current.currentTime))
	}
	const handlePlayBtn = () => {
		setDuration(Math.floor(audioElement.current.duration))
		if (isPlaying) {
			setIsplaying(false)
			audioElement.current.pause()
		} else {
			audioElement.current.play()
			setIsplaying(true)
		}
	}

	const handleReplayBtn = () => {
		audioElement.current.load()
		audioElement.current.play()
		setIsplaying(true)
	}

	return (
		<div className='voice_post'>
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
				<div className='icon_group'>
					<img
						src={share_icon}
						alt='heart_icon'
						className='icon pointer'
					/>
					<img
						src={like_icon}
						alt='heart_icon'
						className='icon pointer'
					/>
				</div>
			</div>
			<div className='post_body'>


				<div className='controller_group'>
					<img
						src={isPlaying ? stop_icon : play_icon}
						className='controller_icon  pointer'
						alt='play_icon'
						onClick={handlePlayBtn}
					/>
					<div className='timer'>
						{duration ? currentTime + "s : " + duration + "s" : ""}
					</div>
					<img
						src={replay_icon}
						onClick={handleReplayBtn}
						className='controller_icon pointer'
						alt='play_icon'
					/>
				</div>
				<div className='post_title'>
					{props.title}
				</div>
			</div>
		</div>

	)
}

export default VoicePost;
