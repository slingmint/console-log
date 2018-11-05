const chalk = require('chalk')
const minimist = require('minimist')

module.exports = () => {
	const args = minimist(process.argv.slice(2))
	console.log(chalk.green("Test Program"))
	console.log(args)

	if (args.v || args.version) {
		console.log(chalk.red('version'))
		console.log(chalk.red(args.version))
	}

	require('./app/main.js')(args, chalk)
}

