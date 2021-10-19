import './App.css';

import Feed from "./compoents/feed/Feed";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NewPost from "./compoents/newPost/NewPost";


function App() {

	return (
		<Router>

			<div className="App">
				<Switch>
					<Route path="/new-post">
						<NewPost/>
					</Route>
					<Route path="/feed">
						<Feed/>
					</Route>
				</Switch>

			</div>
		</Router>
	);
}

export default App;
