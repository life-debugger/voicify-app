import {useEffect, useState} from "react";
import axios from "axios";
import Post from "../post/Post";
import VoicePost from "../voice_post/VoicePost";

function Feed() {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		axios.get('http://127.0.0.1:8000/api/last_five_posts')
			.then(function (response) {
				console.log(response.data.posts);
				setPosts(response.data.posts)
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
			<VoicePost/>
		</div>
	);
}

export default Feed;
