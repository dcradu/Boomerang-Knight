// canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 999;
canvas.height = 461;
document.body.appendChild(canvas);

// background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "../Images/background.png";

//opponents
var opponents = [];

// hero
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "../Images/hero.svg";

var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
};


// obiecte
var hero = {
    speed: 256 // pixel /s
};
var monster = {};

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

// functie de update .... modificata pe parcurs dupa nevoi
var update = function (modifier) {
    if (87 in keysDown) { // w
        hero.y -= hero.speed * modifier;
    }
    if (83 in keysDown) { // s
        hero.y += hero.speed * modifier;
    }
    if (65 in keysDown) { // a
        hero.x -= hero.speed * modifier;
    }
    if (68 in keysDown) { // d
        hero.x += hero.speed * modifier;
    }
};

// functie desenare
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    //aici puse obstacole... ordinea conteaza  imaginile se pot suprapune picteaza layer peste layer fiecare pixel whatev
    //...
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
};

function renderOpponent(opponent)
{
        ctx.drawImage(heroImage, opponent.x, opponent.y);
}

// main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000); //date.now returneaza in milisecunde trebe conversie
    render();


    var gameHub = $.connection.gameHub;
    gameHub.client.connection();
    $.connection.hub.start();

    gameHub.client.addPlayer = function addPlayer(playerId) {
        opponents.push({
            id: playerId,
            x: canvas.width / 2,
            y: canvas.height / 2
        });

        for(var i=0; i<opponents.length; i++)
        {
            if(opponents[i].id == playerId)
            {
                renderOpponent(opponents[i]);
                break;
            }
        }
    };

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// cross-browser support for requestAnimationFrame
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// start la gioc
var then = Date.now();
reset();
main();