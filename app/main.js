var request = require('request')


module.exports = function () {

	console.log('In MAIN')

	var tenant = 'common' // 'console-log-az'
	var appid = ''
	var pwd = ''


	var options = {
		url:'https://login.microsoftonline.com/' + tenant + '/oauth2/token',
		method:'POST',
		formData: {
			grant_type:'client_credentials',
			client_id:appid,
			client_secret:pwd,
			resource:'https://management.azure.com/'
		},
		headers: {
		}

	}

var token = ''



	var options2 = {
		url: 'https://outlook.office.com/api/v2.0/me/tasks',
		method: 'GET'
		//headers: {
	//		Authorization: 'Bearer ' + token,
	//		'Content-Type': 'application/json'
		//}

	}

	function callback2(error, response, body) {
		if (!error && response.statusCode == 200) { 
			console.log(body)
		} else {
			console.log(error)
			console.log(response.statusCode)
			console.log(body)
		}
	}

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			token = JSON.parse(body).access_token

			options2.headers = {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json'
			}
console.log(options2)
			request(options2, callback2)

		} else {
			console.log(error)
			console.log(response.statusCode)
			console.log(options.url)
			console.log(options.qs)
			console.log(body)
		}

	}


	request(options, callback)

	console.log('Out Of Main')



}
