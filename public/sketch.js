let socket
let color = '#333'
let strokeWidth = 5
let cv

function reset() {
	/* Create 2D canvas */
	cv = createCanvas(window.innerWidth / 1.1, window.innerHeight / 1.1, P2D)
	canvasPosition()
	cv.background(255, 255, 255)
}

function setup() {
	/* Create 2D canvas */
	cv = createCanvas(window.innerWidth / 1.1, window.innerHeight / 1.1, P2D)
	canvasPosition()
	cv.background(255, 255, 255)

	/* Start socket connection on Port 3000 */
	socket = io.connect('http://localhost:3000')

	/* Callback function - on emit/broadcast receive */
	socket.on('draw', data => {
		stroke(data.color)
		strokeWeight(data.strokeWidth)
		line(data.x, data.y, data.px, data.py)
	})

	/* Add strokeWidth changer */
	const input = document.querySelector('body');
	input.onkeydown = (e) => {
		switch (e.keyCode) {
			case 49:
				color = '#333'
				break;
		
			case 69:
				color = '#FFFFFF'
				break;
			break;
	
			case 50:
				color = '#ff0000'
				break;
		
			case 51:
				color = '#ffa500'
				break;
		
			case 52:
				color = '#ffff00'
				break;
	
			case 53:
				color = '#008000'
				break;
		
			case 54:
				color = '#0000ff'
				break;
	
			case 55:
				color = '#4b0082'
				break;

			case 56:
				color = '#ee82ee'
				break;
			
			case 219:
				strokeWidth--;
				break;
		
			case 221:
				strokeWidth++;
				break;

			case 27:
				reset();
				break;
			
			default:
				break;
		}
	}
}

/* Allow sketch to re-render on window resizing */
function windowResized() {
	canvasPosition()
	cv.resizeCanvas(windowWidth / 1.3, windowHeight / 1.3, false)
}


function canvasPosition() {
	const x = (windowWidth - width) / 2
	const y = (windowHeight - height) / 2
	cv.position(x, y)
}


function mouseDragged() {
	/* Set stroke settings */
	stroke(color)
	strokeWeight(strokeWidth)

	/* Draw for co-ordinates */
	line(mouseX, mouseY, pmouseX, pmouseY)

	/* Send mouse coordinates */
	broadcastDrawing(mouseX, mouseY, pmouseX, pmouseY)
}

/* Sending data to the socket for broadcasting via emit */
function broadcastDrawing(x, y, pX, pY) {
	console.log("broadcasting")
	const data = {
		x: x,
		y: y,
		px: pX,
		py: pY,
		color: color,
		strokeWidth: strokeWidth,
	}

	socket.emit('draw', data)
}