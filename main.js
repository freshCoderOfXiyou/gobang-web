(function () {
	//init canvas
	var cav=document.getElementById('gameview')
	cav.width=600
	cav.height=600
	var ctx=cav.getContext('2d')
	//define variable
	const RADIUS=12
	const INTERVAL=27
	//cav location
	var cavTop=parseInt(cav.getBoundingClientRect().top)
	var cavLeft=parseInt(cav.getBoundingClientRect().left)
	// var cavTop=cav.getBoundingClientRect().top
	// var cavLeft=cav.getBoundingClientRect().left
	console.log(cavTop,cavLeft)
	/*
	*draw the board
	*/
	function drawBoard() {
		ctx.beginPath()
		ctx.strokeStyle='red'
		ctx.lineWidth=5
		ctx.lineJoin='round'
		ctx.lineCap='round'
		ctx.moveTo(10,10)
		ctx.lineTo(590,10)
		ctx.moveTo(10,10)
		ctx.lineTo(10,590)
		ctx.moveTo(590,590)
		ctx.lineTo(590,10)
		ctx.moveTo(590,590)
		ctx.lineTo(10,590)
		ctx.stroke()
		ctx.closePath()
        
        ctx.strokeStyle='black'
        ctx.lineWidth=1
        ctx.beginPath()
		//draw horizontal line
		for(var i=0;i<21;i++){
			var begin=INTERVAL+i*INTERVAL
			ctx.moveTo(25,begin)
			ctx.lineTo(570,begin)
		}
		for(i=0;i<21;i++){
			begin=INTERVAL+i*INTERVAL
			ctx.moveTo(begin,25)
			ctx.lineTo(begin,570)
		}
		ctx.stroke()
		ctx.closePath()
	}

	/*draw pieces
	*/
	function drawPiece(posx,posy,color) {
		ctx.fillStyle=color
		ctx.beginPath()
		ctx.arc(posx,posy,RADIUS,0,Math.PI*2)
		ctx.fill()
		ctx.closePath()
	}
	var color='black'
	//add event listener
	cav.addEventListener('click', function (e) {
		console.log(e.clientX-cavLeft,e.clientY-cavTop)
		var x=Math.round((e.clientX-cavLeft-28)/INTERVAL)*INTERVAL+26
		var y=Math.round((e.clientY-cavTop-28)/INTERVAL)*INTERVAL+26
		
		drawPiece(x,y,color)
		if (color=='black') {
			color='white'
		}else{
			color='black'
		}


	}, false)

	drawBoard()


	//test code
	// drawPiece(27,27,'red')
	// drawPiece(28+INTERVAL,28,'red')
	// drawPiece(28+2*INTERVAL,28,'red')
	// drawPiece(28,28+INTERVAL,'red')
	// drawPiece(28+INTERVAL*20,28+INTERVAL*20,'red')
	function drawAll() {
		for(var i=0;i<21;i++){
			var x=26+i*INTERVAL
			for(var j=0;j<21;j++){
				var y=26+j*INTERVAL
				drawPiece(x,y,'black')
			}
		}
	}
	// drawAll()	
})()