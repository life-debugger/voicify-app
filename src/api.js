const axios = require("axios");

const URL_ROOT = "http://127.0.0.1:8000/api/"

export const login_validator = (username, password, success_func, fail_func) => {
    let data = new FormData()
    data.append("username",username)
    data.append("password",password)
	axios.post(URL_ROOT + "login",data)
		.then(function (response) {
			if (response.data['status'] === "success") {
				success_func()
			}else{
				fail_func()
			}
		})
		.catch(function (response) {
			fail_func()
		});


	// axios.post(URL_ROOT + "login", {
	// 	username: username,
	// 	password: password
	// })
	// 	.then(function (response) {
	// 		console.log(response);
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});
}