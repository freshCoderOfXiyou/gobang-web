(function () {
	//init canvas
	var cav=document.getElementById('gameview')
	cav.width=600
	cav.height=600
	var ctx=cav.getContext('2d')

	//define variable
	const RADIUS=13.5
	const INTERVAL=30
	//cav location
	var cavTop=parseInt(cav.getBoundingClientRect().top)
	var cavLeft=parseInt(cav.getBoundingClientRect().left)
	//define pieces
	var whitePieces=[]
	var blackPieces=[]
	//define init color
	color='black'
	//define chess board array
	var chessBoard=[]
	// for(var i=0;i<19;i++){

	// }
	//define wins
	var wins=[]
	for(var i=0;i<19;i++){
		wins[i]=[]
		for(var j=0;j<19;j++){
			wins[i][j]=[]
		}
	}
	//define wins index:count
	var count=0
	//define array of who win
	var blackWin=[]
	var whiteWin=[]
	//define game is over
	var over=false
	//define the chess board
	var chessBoard=[]
	for(i=0;i<19;i++){
		chessBoard[i]=[]
		for(j=0;j<19;j++){
			chessBoard[i][j]=0
		}
	}
	//all horizontal line 
	for(i=0;i<19;i++){
		for(j=0;j<15;j++){
			for(var k=0;k<5;k++){
				wins[i][j+k][count]=1
			}
			count++
		}
	}
	//all vertical line
	for(i=0;i<15;i++){
		for(j=0;j<19;j++){
			for(var k=0;k<5;k++){
				wins[i+k][j][count]=1
			}
			count++
		}
	}

	//all slash line
	for(i=0;i<15;i++){
		for(j=0;j<15;j++){
			for(var k=0;k<5;k++){
				wins[i+k][j+k][count]=1
			}
			count++
		}
	}
	for(i=0;i<15;i++){
		for(j=18;j>3;j--){
			for(var k=0;k<5;k++){
				wins[i+k][j-k][count]=1
			}
			count++
		}
	}
	// console.log(wins)
	// document.writeln(count)

	//initial who wins array
	for(var i=0;i<count;i++){
		 blackWin[i]=0
		 whiteWin[i]=0
	}
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
		for(var i=0;i<19;i++){
			var begin=28+i*INTERVAL
			ctx.moveTo(25,begin)
			ctx.lineTo(570,begin)
		}
		for(i=0;i<19;i++){
			begin=29+i*INTERVAL
			ctx.moveTo(begin,25)
			ctx.lineTo(begin,570)
		}
		ctx.stroke()
		ctx.closePath()
		//draw point
		drawPiece(119,118,'gray',6)
		drawPiece(479,478,'gray',6)
		drawPiece(119,478,'gray',6)
		drawPiece(479,118,'gray',6)
		drawPiece(299,298,'gray',6)

		drawPiece(299,118,'gray',6)
		drawPiece(299,478,'gray',6)
		drawPiece(119,298,'gray',6)
		drawPiece(479,298,'gray',6)
	}

	/*draw pieces
	*/
	function drawPiece(posx,posy,color,r) {
		//define gradient color 
		var gradientColor=ctx.createRadialGradient(posx+2,posy-2,r*3/5,posx+2,posy-2,0)
		if (color=='black') {
			gradientColor.addColorStop(0,"#0a0a0a")
			gradientColor.addColorStop(1,'#676367')
		}else if (color=='white') {
			gradientColor.addColorStop(0,'#d1d1d1')
			gradientColor.addColorStop(1,'#fff')
		}else{
			var gradientColor=color
		}
		
		ctx.fillStyle=gradientColor
		ctx.beginPath()
		ctx.arc(posx,posy,r,0,Math.PI*2)
		ctx.fill()
		ctx.closePath()
	}

	/*
	*function:judge the location has pieces
	*/
	function hadPiece(x,y) {
		var had=false
		for(var i=0,len=blackPieces.length;i<len;i++){
			if (x==blackPieces[i].pieceX&&y==blackPieces[i].pieceY) {
				had=true
			}
		}
		for(i=0,len=whitePieces.length;i<len;i++){
			if (x==whitePieces[i].pieceX&&y==whitePieces[i].pieceY) {
				had=true
				// console.log("param:"+x,y)
				// console.log("array:"+whitePieces.pieceX,whitePieces[i].pieceY)
			}
		}
		return had
	}



		
	/*
	*function sort array
	*/
	function sortPieces(arr){
	//sort the arr
		arr.sort(function (cur,next) {
			if (cur.piecesX<next.pieceX) {
				return 0
			}
			else if(cur.pieceX==next.piecesX){
				if (cur.pieceY<next.pieceY) {
					return 0
				}
				else  {
					return 1
				}
			}
			else if (cur.pieceX>next.pieceX) {
				return 1
			}
		})
	}

	/*
	*function define computer ai
	*/
	function computeAI() {

		//define the max score
		var max=0
		//define the max location
		var u=0,v=0
		
		//initial blackScore array and whiteScore array
		var blackScore=[]
		var whiteScore=[]
		for(var i=0;i<19;i++){
			blackScore[i]=[]
			whiteScore[i]=[]
			for(var j=0;j<19;j++){
				blackScore[i][j]=0
				whiteScore[i][j]=0
			}
		}
		//travercy every point of chess board
		for(i=0;i<19;i++){
			for(j=0;j<19;j++){
				//if current position doesn't have piece
				if (chessBoard[i][j]==0) {
					for(var k=0;k<count;k++){
						//if current position has wins
						if (wins[i][j][k]) {
							//fristly caculate black pieces
							if (blackWin[k]==1) {
								blackScore[i][j]+=200
							}
							else if (blackWin[k]==2) {
								blackScore[i][j]+=400
							}
							else if(blackWin[k]==3){
								blackScore[i][j]+=2000
							}
							else if(blackWin[k]==4){
								blackScore[i][j]+=10000
							}
							//then caculate white piece 
							if (whiteWin[k]==1) {
								whiteScore[i][j]+=220
							}
							else if (whiteWin[k]==2) {
								whiteScore[i][j]+=420
							}
							else if(whiteWin[k]==3){
								whiteScore[i][j]+=2100
							}
							else if(whiteWin[k]==4){
								whiteScore[i][j]+=40000
							}
						}
					}
				}
				//search the best point of black
				if (max<blackScore[i][j]) {
					max=blackScore[i][j]
					u=i
					v=j
				}
				else if (max==blackScore[i][j]) {
					if (whiteScore[i][j]>whiteScore[u][v]) {
						u=i
						v=j
					}
				}
				//search the best point of white
				if (max<whiteScore[i][j]) {
					max=whiteScore[i][j]
					u=i
					v=j
				}
				else if (max==whiteScore[i][j]) {
					if (blackScore[i][j]>blackScore[u][v]) {
						u=i
						v=j
					}
				}
			}
		}//end outer for 

		console.log("function inner "+u,v)	
		return {locx:u,locy:v}
	}//end function computeAI

	/*
	*function one step
	*@param: x , y
	*@result:draw a piece at ( x , y )
	*/
	function oneStep(x,y){
			drawPiece(x*INTERVAL+29,y*INTERVAL+28,color,RADIUS)
			var singlePiece={
				pieceX:x,
				pieceY:y
			}
			if (color=='black') {
				color='white'
				//'1' mean black piece
				chessBoard[x][y]=1
				blackPieces.push(singlePiece)
				for(var k=0;k<count;k++){
					if (wins[x][y][k]) {
						blackWin[k]++
						console.log("one step score"+blackWin[k])
						if (blackWin[k]==5) {
							setTimeout(function(){alert('black win')},1)
							over=true
							break
						}
					}
				}

			}else{	
				color='black'
				//'2' mean white piece
				chessBoard[x][y]=2
				whitePieces.push(singlePiece)
				for(var k=0;k<count;k++){
					if (wins[x][y][k]) {
						whiteWin[k]++
						if(whiteWin[k]==5){
							setTimeout(function(){alert('white win')},1)
							over=true
							break
						}
					}
				}
			}
	}

	//add event listener
	cav.addEventListener('click', function (e) {
		if (over) {
			return
		}
		
		var x=Math.round((e.clientX-cavLeft-28)/INTERVAL)
		var y=Math.round((e.clientY-cavTop-28)/INTERVAL)
		var had=hadPiece(x,y)
		if(!had){
			oneStep(x,y)
		}
		var computelocation=computeAI()
		console.log(computelocation.locx,computelocation.locy)
		if(!over){
			oneStep(computelocation.locx,computelocation.locy)
		}
		
	}, false)//end event listener

	
	drawBoard()


	//test code
	// drawPiece(27,27,'red')
	// drawPiece(28+INTERVAL,28,'red')
	// drawPiece(28+2*INTERVAL,28,'red')
	// drawPiece(28,28+INTERVAL,'red')
	// drawPiece(28+INTERVAL*20,28+INTERVAL*20,'red')
	function drawAll() {
		for(var i=0;i<19;i++){
			var x=29+i*INTERVAL
			for(var j=0;j<19;j++){
				var y=28+j*INTERVAL
				drawPiece(x,y,'black',RADIUS)
			}
		}
	}
	// drawAll()	
})()