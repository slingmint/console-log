const chalk = require('chalk')
const minimist = require('minimist')
const boxen = require('boxen')

module.exports = () => {
	const args = minimist(process.argv.slice(2))
	console.log(chalk.green("Test Program"))
	console.log(args)

	if (args.v || args.version) {
		console.log(chalk.red('version'))
		console.log(chalk.red(args.version))
	}

	require('./app/main.js')(args, chalk)

	var c = ''	
	getData().forEach(function(item) {
		c += getBoxen(item)
	})

	console.log(boxen(c, {padding: 5, align: 'left'}))
}


function getBoxen(itemObject) {
	var formatObject = {padding: 1, borderStyle: 'round', borderColor: 'black', backgroundColor: 'red'}
	return boxen(itemObject.start + ' - ' + itemObject.end + ' : ' + itemObject.subject, formatObject)	

}

function getData() {
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
		}
	]

}
