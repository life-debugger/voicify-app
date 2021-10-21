const axios = require("axios");

const URL_ROOT = "http://127.0.0.1:8000/api/"

export const login_validator = (username, password, success_func, fail_func) => {
	let data = new FormData()
	data.append("username", username)
	data.append("password", password)
	axios.post(URL_ROOT + "login", data)
		.then(function (response) {
			if (response.data['status'] === "success") {
				success_func()
			} else {
				fail_func()
			}
		})
		.catch(function (response) {
			fail_func()
		});
}


export const upload_new_post = (title, voice, success_func, fail_func) => {
	let data = new FormData()
	let file = new File([voice.blob], 'recorded.mp3')
	data.append("title", title);
	data.append("voice", file);

	axios.post(URL_ROOT + 'upload_post', data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}).then(function (response) {
		if (response.data['status'] === "success") {
			success_func(response.data['msg'])
		} else {
			fail_func(response.data['msg'])
		}
	})
		.catch(function (response) {
			fail_func()
		});
}

export const get_user_info = (username, success_func, fail_func) => {
	let data = new FormData()
	data.append("username", username)

	axios.post(URL_ROOT + "get_user", data)
		.then(function (response) {
			if (response.data['status'] === "success") {
				success_func(response.data['user'])
			} else {
				fail_func()
			}
		})
		.catch(function (response) {
			fail_func()
		});
}

