var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var leftPressed = false;
var rightPressed = false;
var brickRowCount = 3;
var brickColumCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop =30;
var brickOffsetLeft = 30;
var score =0;
//...
var bricks = [];
for (c=0; c<brickColumCount; c++){
	bricks[c] = [];
	for (r=0; r<brickRowCount; r++){
		bricks[c][r] = {
			x:0, y:0 , status:1}
	}
}
//...
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBricks(){

	for(c=0; c<brickColumCount; c++){
		for(r=0; r<brickRowCount; r++){
			if(bricks[c][r].status == 1){
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX ,brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
		   }
		}
	}
};

// creates an event listener for a key press down
function keyDownHandler(e){
	if(e.keyCode == 39){
		rightPressed = true;
	};
	if(e.keyCode == 37){
		leftPressed = true;
	};
};

//creates an event listener for a key up remove
function keyUpHandler(e){
	if(e.keyCode == 39){
		rightPressed = false;
	};
	if(e.keyCode == 37){
		leftPressed = false;
	};
};

//drawball function..
function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();	
}
//function to draw paddle object
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
};

function collisionDetection(){
	for(c=0; c< brickColumCount; c++){
		for(r=0; r<brickRowCount; r++){
			var b = bricks[c][r];
			if(b.status == 1){
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y + brickHeight){
					dy = -dy; 
					b.status = 0;
					score++;
				if(score == brickRowCount*brickColumCount){
					alert("level complete");
					document.location.reload();
				    };
			    }
				
			}
		}
	}
};

function drawScore(){
	ctx.font ="16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
}



// draw function ...
 function draw() {
 	//draw object
 	ctx.clearRect(0,0, canvas.width, canvas.height)
 	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	collisionDetection();

	//ball changes direction if y is > than 0 or canvas height
	if(y + dy < ballRadius){
		dy = -dy;
	};
	if(y + dy > canvas.height-ballRadius){
		if(x > paddleX && x < paddleX + paddleWidth){
			dy = -dy;
		}
		else{
			alert("Game Over");
			document.location.reload();
		}
	};
	//ball change direction if x is > 0 or canvas width
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
		dx = -dx;
	};

	if(rightPressed && paddleX < canvas.width-paddleWidth){
		paddleX += 7;
	};
	if(leftPressed && paddleX > 0){
		paddleX -= 7;
	}
	// adds to x and y..
	x += dx;
	y += dy;
}

setInterval(draw, 10);

// the game is complete now to ass an extra challenge add 2 more levels to the game.