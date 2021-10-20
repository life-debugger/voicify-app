import './App.css';

import Feed from "./compoents/feed/Feed";
import {
	BrowserRouter as Router,
	Switch,
	Route, Redirect,
} from "react-router-dom";
import NewPost from "./compoents/newPost/NewPost";
import LoginForm from "./compoents/login_page/LoginPage";


function App() {

	const isLoggedIn = () => {
		return !!sessionStorage.getItem('username');
	}

	if (!isLoggedIn()) {
		return (
			<Router>
				<Redirect to="/login"/>
				<Route path="/login">
					<LoginForm/>
				</Route>
			</Router>
		)
	}

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/new-post">
						<NewPost/>
						<NewPost/>
					</Route>
					<Route path="/feed">
						<Feed/>
					</Route>
					<Route path="/login">
						<LoginForm/>
					</Route>
				</Switch>

			</div>
		</Router>
	);

}

export default App;
