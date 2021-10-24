import './App.css';

import Feed from "./compoents/feed/Feed";
import {
	BrowserRouter as Router,
	Switch,
	Route, Redirect,
} from "react-router-dom";
import LoginForm from "./compoents/login_page/LoginPage";
import CreatePost from "./compoents/create_post/CreatePost";
import Header from "./compoents/header/Header";
import ProfilePage from "./compoents/profile_page/ProfilePage";
import {ToastContainer} from "react-toastify";


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

			<Header />
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
			<div className="App">
				<Switch>
					<Route path="/create-post">
						{/*<NewPost/>*/}
						<CreatePost />
					</Route>
					<Route path="/feed">
						<Feed/>
					</Route>
					<Route path="/login">
						<LoginForm/>
					</Route>
					<Route path="/profile">
						<ProfilePage/>
					</Route>
				</Switch>

			</div>
		</Router>
	);

}

export default App;
