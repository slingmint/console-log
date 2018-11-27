var request = require('request')


module.exports = function () {

	console.log('In MAIN')

	var tenant = 'common' // 'console-log-az'
	var appid = '3ea2d536-f5c6-480f-b5fb-569e7d7f4aeb'
	var pwd = 'zbYDHA4^~ngmozSZK6352[_'
	var authentication_url = 'https://login.microsoftonline.com/' + tenant + '/oauth2/token'
	var authentication_resource = 'https://management.azure.com'

	var options = {
		url: authentication_url,
		method:'POST',
		formData: {
			grant_type:'authorization_code',
//			grant_type:'client_credentials',
			client_id:appid,
			client_secret:pwd,
//			resource:authentication_resource
			scope:'user.read mail.read'
		},
		headers: {
		}

	}

var token = ''



	var options2 = {
		url: 'https://graph.microsoft.com/v1.0/me/messages',
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
