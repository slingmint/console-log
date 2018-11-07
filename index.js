const DATAFILE = '/root/.cl-data'
const chalk = require('chalk')
const boxen = require('boxen')
const vorpal = require('vorpal')()
const fs = require('fs')
var data = []  //= initializeData()

module.exports = () => {

//	require('./app/main.js')(chalk)

	vorpal
		.command('add <begin> <end> <subject>', 'Adds A New Entry')
		.option('-b, --begin <begin>', 'Begin Time')
		.option('-e, --end <end>', 'End Time')
		.option('-s, --subject <subject>', 'Subject')
		.action(function(args, callback) {
//			if ((args.options.begin) && (args.options.end) && (args.options.subject)) {
				addEntry(args)
				refreshView()
//			} else {
//				refreshView()
//				console.log ("Invalid options.  See help.")
//			}
			callback()
		})


	vorpal
		.command('refresh', 'Refreshes the screen')
		.alias('r')
		.action(function(args, callback) {
			refreshView()
			callback()
		})



	vorpal
		.command('load', 'Loads last save file')
		.action(function(args, callback) {
			data = fs.readFileSync(DATAFILE, 'utf-8')
			data =  JSON.parse(data)
			refreshView()
			callback()
		})

	vorpal
		.command('save', 'Saves to file')
		.action(function(args, callback) {
			var jsondata = JSON.stringify(data)

			fs.writeFile(DATAFILE, jsondata, 'utf-8', function(err) {
				if (err) {
					console.log("Error saving file.")
					return console.log(err)
				}
			})	
			console.log(chalk.red('Datafile saved.'))
			callback()		
		})



//	refreshView()


	vorpal
		.delimiter('CL-CAL#')
		.show()
}


function refreshView() {
 	console.log('\033c')	
	var c = getHeader() 
	getData().forEach(function(item, index) {
		c += '\n' + getBoxen(item)
	})

	console.log(boxen(c, {padding: 0, align: 'left'}))
}

//function UseLaterpromptItem(v) {
//	self = v
//	self.prompt( {
//		type: 'input',
//		name: 'start',
//		message: 'Start Date: '
//	},
//	function (result) {
//		console.log('did something')
//	})
//}
function getHeader() {
	var formatObject = {align: 'left', float: 'left', padding: 3, borderStyle: 'round', borderColor: 'black', backgroundColor: 'blue'}

	return boxen("-----------------------------------------------------" + '\n' + 'asdf' + '\n' +
                     "-----------------------------------------------------", formatObject)
}

function getBoxen(itemObject) {
	var formatObject = {padding: 1, borderStyle: 'round', borderColor: 'black', backgroundColor: 'red'}
	return boxen(itemObject.start + ' - ' + itemObject.end + ' : ' + itemObject.subject, formatObject)	

}

function addEntry(options) {
	var a = options.begin.toString().replace(/\b(\d{1,2})(\d{2})/g, '$1:$2') 
	var b = options.end.toString().replace(/\b(\d{1,2})(\d{2})/g, '$1:$2') 

	var entry = {
		start: a,
		end: b,
		subject: options.subject
	} 
console.log(entry)
	data.push(entry)
}


function getData() {

	return data.sort(function(a,b) {
		var da = new Date('1970-01-01T' + a.start + 'Z')
		var db = new Date('1970-01-01T' + b.start + 'Z')

		return (da.getTime() > db.getTime()) ? 1 : ((db.getTime() > da.getTime()) ? -1 : 0)
	})
}


function initializeData() {
	return [
		{
			'start':'08:00',
		 	'end': '09:00',
		 	'subject' : 'This is an appointment at the beginning'
		},
		{
			'start':'09:00',
			'end':'11:00',
			'subject': 'Second Item To View'
		},
		{
			'start': '11:00',
			'end' : '11:30',
			'subject' : 'Test Item Number 3 To Look Into'
		},
		{
			'start' : '11:30',
			'end': '13:30',
			'subject' : 'Final item in Day'
		},
		{
			'start' : '13:30',
			'end': '13:45',
			'subject' : 'Test Another Line'
		},
		{
			'start' : '13:45',
			'end' : '14:00',
			'subject' : 'Another Test Line To see length limitations'
		},
		{
			'start' : '14:00',
			'end' : '14:15',
			'subject': 'Hello world again'
		},
		{
			'start' : '14:14',
			'end' : '14:30',
			'subject' : 'Hwllo world towards the end'
		}
	]

}
