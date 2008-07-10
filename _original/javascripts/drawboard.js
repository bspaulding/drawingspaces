var canvas = null
var context = null
var drawing = false
var fluidPoints = []
var discretePoints = []
var lastPoint = null

function init() {
	canvas = document.getElementById('canvas')
	if(canvas.getContext('2d')) {
		context = canvas.getContext('2d')
		canvas.width = window.innerWidth-4
		canvas.height = window.innerHeight-4
	} else
		alert("We're sorry, your browser is incompatible with DrawBoard.")
}

function toggleDrawing() {
	if(drawing) {
		drawing = false
		lastPoint = null
	} else
		drawing = true
}

function draw(x,y) {
	if(drawing) {
		fluidPoints[fluidPoints.length] = [x,y]
		
		if(lastPoint != null) {
			context.beginPath()
			context.moveTo(lastPoint[0], lastPoint[1])
			context.lineTo(x,y)

			context.moveTo(lastPoint[0], lastPoint[1]-1)
			context.lineTo(x,y-1)
			context.closePath()

			context.stroke()
		}
				
		lastPoint = [x,y]
	}
}

function drawPoint(x,y,diameter) {
	discretePoints[discretePoints.length] = [x,y]
	context.beginPath()
	context.arc(x, y, diameter/2, 0, 6.28, 0)
	context.stroke()
}

// redraw() - incorrect, crashes browsers everywhere
function redraw() {
	drawing = true
	for(k = 0; k < fluidPoints.length; k++)
		draw(fluidPoints[k][0], fluidPoints[k][1])
	drawing = false
}

function clearDrawBoard() {
	context.clearRect(0, 0, canvas.width, canvas.height)
	fluidPoints = []
	discretePoints = []
}

function getDrawBoardImage() {
	window.open(canvas.toDataURL("image/png"))
}