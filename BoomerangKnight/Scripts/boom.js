// cross-browser support for requestAnimationFrame
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
//SIGNALR Mo-FO

// monster
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "../Images/Game/monster.svg";


//var monster=
//{
//    width: 128,
 //   height: 128
//}

(function () {
    // Declare a proxy to reference the hub. 
    var gameHub = $.connection.gameHub;
   
    // Create a function that the hub can call to update players locations.
    gameHub.client.updatePlayers = function (playersList) {

        for (var i = 0; i < playersList.length; i++) {
            {
                ctx.clearRect(playersList[i].X, playersList[i].Y, 46, 46);
                if (monsterReady)
                ctx.drawImage(monsterImage, playersList[i].X, playersList[i].Y, 40, 40);

                
            }
        }
        //UPDATE PLayers
    };

    //gameHub.server.updateLocation(x, y);
    w.updateLocation = function (xx, yy) {
        // gameHub.server.updateLocation({ x: xx, y: yy });
        gameHub.server.updateLocation(xx, yy);
       
    }

    // Start the connection.
    $.connection.hub.start().done(function () {

        //aici ar trebui sa-i trimitem username-ul serverului dar mai incolo;
    });
})();






// canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 999;
canvas.height = 461;
document.body.appendChild(canvas);

var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas2.getContext("2d");
canvas2.width = 999;
canvas2.height = 461;
document.body.appendChild(canvas2);

// background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () 
{
	bgReady = true;
};
bgImage.src = "../Images/Game/background.png";

// hero
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () 
{
	heroReady = true;
};
heroImage.src = "../Images/Game/heroFin.svg";


var boomerangReady = false;
var boomerangImage = new Image();
boomerangImage.onload = function () {
	boomerangReady = true;
};
boomerangImage.src = "../Images/Game/boomerangFin.svg";
/*
// hero LEft
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () 
{
	heroReady = true;
};
heroImage.src = "../Images/Game/heroLeft.svg";

//boom Left
var boomerangLeftReady = false;
var boomerangLeftImage = new Image();
boomerangLeftImage.onload = function () {
	boomerangLeftReady = true;
};
boomerangLeftImage.src = "../Images/Game/boomLeft.svg";
*/
//sunete de lupta
var gethit = new Audio('../Sounds/gettinghit.wav');
var dieing = new Audio('../Sounds/dieing.wav');
var hit = new Audio('../Sounds/hit.wav');


// obiecte
var hero = {
	speed: 256, // pixel /s
width: 128,
height: 128	,
health: 100,
death:0,
kills:0,
};

var boomerang=
{
	width:32,
	height:32,
	clicked:false,
	nextX:0,
	nextY:0,
	xInitial:0,
	yInitial:0,
	speed:10
}




//variabila scor
var scor = 0;

// handler de controale
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);





//on click boomerang boss
w.onclick=function(e)
{
	if(e.pageX<999 && e.pageY<461)
	{
		//boomerang.x+=(-1)*(boomerang.x - e.clientX)/2;
		//boomerang.y+=(-1)*(boomerang.y - e.clientY)/2;
		if(boomerang.clicked==false)
		{
		boomerang.clicked=true;
		hit.play();
		boomerang.xInitial=hero.x+hero.width/4;
		boomerang.yInitial=hero.y;
		boomerang.nextX=e.clientX;
		boomerang.nextY=e.clientY;
		}
	}
		
}
	

// reset game cand apare coliziune cu monstru..... modificare later pt cand dispar toti monstrii se termina nivel
var reset = function () {
	hero.x =  (Math.random() * (canvas.width - 27));
	hero.y =  (Math.random() * (canvas.height - 31));
	hero.deaths+=1;
	boomerang.clicked=false;
	boomerang.x=hero.x;
	boomerang.y=hero.y;
	dieing.play();
	
	
};


// functie de update .... modificata pe parcurs dupa nevoi
//hero move
var update = function (modifier) 
{
	if (87 in keysDown) { // w
	    if ((hero.y) >= 0)			//verifica daca marginea hartii #Artificiu de boss
	    
	        hero.y -= hero.speed * modifier;
	    updateLocation(hero.x, hero.y);
	    
		//gethit.play();
	}
	if (83 in keysDown) { // s
	if((hero.y+hero.height/4)<=canvas.height)
	
	    hero.y += hero.speed * modifier;
	    updateLocation(hero.x, hero.y);
	//dieing.play();
	}
	if (65 in keysDown) { // a
	if((hero.x)>=0)
	    hero.x -= hero.speed * modifier;
	updateLocation(hero.x, hero.y);
	}
	if (68 in keysDown) { // d
	if((hero.x+hero.width/4)<=canvas.width) //verifica daca marginea hartii #Artificiu de boss
	    hero.x += hero.speed * modifier;
	updateLocation(hero.x, hero.y);
		
	}
	
	if(hero.health<=0)
	{
		reset();
	}
};

var update_boomerang=function(modifier)
{
	if(boomerang.clicked==false)
	{
		boomerang.x=hero.x;
		boomerang.y=hero.y;
	}
	
	if(boomerang.clicked==true)
	{
		//var aux=boomerang.yInitial-boomerang.nextY;
		//var aux2=boomerang.xInitial-boomerang.nextX;
		//var angle=Math.acos(Math.abs(aux)/Math.sqrt(aux*aux+aux2*aux2));
		//var radians=angle * Math.PI / 180;
		var radians=Math.atan2(boomerang.nextY - boomerang.yInitial, boomerang.nextX - boomerang.xInitial);
		//var angle=radians * Math.PI / 180;
		//var dgy = boomerang.nextY - boomerang.yInitial;
		//var dgx = boomerang.nextX - boomerang.xInitial;
		//theta = Math.atan2(dgy, dgx);
		//var radians = theta;
		//theta *= 180/Math.PI // rads to degs
		
		//var panta = dgy/dgx;
		//var radians = panta * 180/Math.PI;
		boomerang.x+=Math.cos(radians) *boomerang.speed ;
		boomerang.y+=Math.sin(radians) *boomerang.speed;
		
		if(boomerang.x+128<0 || boomerang.x > canvas.width || boomerang.y+128 < 0 || boomerang.y>canvas.heigth)
		{
			boomerang.clicked=false;
		}
		
	}
}

//functie de verificare coliziuni

//fct des bckg

var bkgrend = function () {
    ctx.clearRect(hero.x, hero.y, 32, 32);
    ctx.clearRect(boomerang.x, boomerang.y, 32, 32);
    
    if (bgReady) {
        ctx2.drawImage(bgImage, 0, 0);
    }
};

// functie desenare
var render = function () {
	
   
	//aici puse obstacole... ordinea conteaza  imaginile se pot suprapune picteaza layer peste layer fiecare pixel whatev
	//...
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if(boomerangReady)
	{
		ctx.drawImage(boomerangImage,boomerang.x,boomerang.y);
	}
	

	
	// scor momentan afisat pe acelasi canvas... bpl pun pe altu l8r in panel cum stabilisem in baza
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	//ctx.fillText("Capete in gura: " + scor, 32, 32);
};







// main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	bkgrend();
	update(delta / 1000); //date.now returneaza in milisecunde trebe conversie
	update_boomerang(delta/1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};


// start la gioc
var then = Date.now();

reset();
main();