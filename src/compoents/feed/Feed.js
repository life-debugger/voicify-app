import {useEffect, useState} from "react";
import axios from "axios";
import Post from "../post/Post";
import NewPost from "../newPost/NewPost";

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
					<Post
						key={post.postID}
						title={post.title}
						voiceURL={post.voice}
						postID={post.postID}
					/>

				)
			})}
			<NewPost/>
		</div>
	);
}

export default Feed;
