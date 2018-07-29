const gpio = require('onoff').Gpio

const red = new gpio(9, 'out')
const yellow = new gpio(10, 'out')
const green = new gpio(11, 'out')

const sleep = (howLong) => { 
	return new Promise((resolve) => {
		setTimeout(resolve, howLong)
	})
}

const runLights = async () => {
	while (true) {
		// Red
		red.writeSync(1)
		await sleep(3000)

		// Red and Yellow
		yellow.writeSync(1)
		await sleep(1000)

		// Green
		red.writeSync(0)
		yellow.writeSync(0)
		green.writeSync(1)
		await sleep(5000)

		// Yellow
		green.writeSync(0)
		yellow.writeSync(1)
		await sleep(2000)

		// Yellow off
		yellow.writeSync(0)
	}
}

const allLightsOff = () => {
	red.writeSync(0)
	yellow.writeSync(0)
	green.writeSync(0)
}

// Handle Ctrl+C exit cleanly 
process.on('SIGINT', () => {
	allLightsOff()
	process.exit()
})

allLightsOff()
runLights()
