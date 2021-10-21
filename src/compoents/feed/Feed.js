import {useEffect, useState} from "react";
import axios from "axios";
import VoicePost from "../voice_post/VoicePost";
import CreateBtn from "../create_btn/CreateBtn";

function Feed() {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		axios.get('http://127.0.0.1:8000/api/last_five_posts')
			.then(function (response) {
				setPosts(response.data["posts"])
			})
			.catch(function (error) {
				console.log("ERROR!", error);
			})


	}, [])

	return (
		<div className="feed">
			{posts.map((post) => {
				return (
					<VoicePost
						title={post.title}
						key={post.postID}
						voiceURL={post.voice}
					/>
				)
			})

			}
		<CreateBtn />
		</div>
	);
}

export default Feed;
