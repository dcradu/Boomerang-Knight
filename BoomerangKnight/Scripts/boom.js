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

    //begin joc
    var currentPlayers;


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
    bgImage.onload = function () {
        bgReady = true;
    };
    bgImage.src = "../Images/Game/background.png";

    // hero
    var heroReady = false;
    var heroImage = new Image();
    heroImage.onload = function () {
        heroReady = true;
    };
    heroImage.src = "../Images/Game/heroFin.svg";


    var level1Ready = false;
    var heroLevel1 = new Image();
    heroLevel1.onload = function () {
        level1Ready = true;
    };
    heroLevel1.src = "../Images/Game/level1.svg";


    var level2Ready = false;
    var heroLevel2 = new Image();
    heroLevel2.onload = function () {
        level2Ready = true;
    };
    heroLevel2.src = "../Images/Game/level2.svg";

    var level3Ready = false;
    var heroLevel3 = new Image();
    heroLevel3.onload = function () {
        level3Ready = true;
    };
    heroLevel3.src = "../Images/Game/level3.svg";

    var level4Ready = false;
    var heroLevel4 = new Image();
    heroLevel4.onload = function () {
        level4Ready = true;
    };
    heroLevel4.src = "../Images/Game/level4.svg";

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
        height: 128,
        health: 100,
        death: 0,
        kills: 0,
    };

    var boomerang =
    {
        width: 32,
        height: 32,
        clicked: false,
        nextX: 0,
        nextY: 0,
        xInitial: 0,
        yInitial: 0,
        speed: 10
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
    w.onclick = function (e) {
        if (e.pageX < 999 && e.pageY < 461) {
            //boomerang.x+=(-1)*(boomerang.x - e.clientX)/2;
            //boomerang.y+=(-1)*(boomerang.y - e.clientY)/2;
            if (boomerang.clicked == false) {
                boomerang.clicked = true;
                hit.play();
                boomerang.xInitial = hero.x + hero.width / 4;
                boomerang.yInitial = hero.y;
                boomerang.nextX = e.clientX;
                boomerang.nextY = e.clientY;
            }
        }

    }


    // reset game cand apare coliziune cu monstru..... modificare later pt cand dispar toti monstrii se termina nivel
    var initializePlayer = function () {
        hero.x = (Math.random() * (canvas.width - 27));
        hero.y = (Math.random() * (canvas.height - 31));
        hero.deaths += 1;
        boomerang.clicked = false;
        boomerang.x = hero.x;
        boomerang.y = hero.y;
    };

    getHeroX = function () {
        return hero.x;
    }

    getHeroY = function () {
        return hero.Y;
    }

    // functie de update .... modificata pe parcurs dupa nevoi
    //hero move
    var update = function (modifier) {

        movementSize = hero.speed * modifier;

        if (87 in keysDown) { // w
            if ((hero.y) >= 0 && !isCollisionWihPlayerDetected(hero.x, hero.y - movementSize))			//verifica daca marginea hartii #Artificiu de boss

                hero.y -= movementSize;

            //gethit.play();
        }
        if (83 in keysDown) { // s
            if ((hero.y + hero.height / 4) <= canvas.height && !isCollisionWihPlayerDetected(hero.x, hero.y + movementSize))

                hero.y += movementSize;
            //dieing.play();
        }
        if (65 in keysDown) { // a
            if ((hero.x) >= 0 && !isCollisionWihPlayerDetected(hero.x - movementSize, hero.y))
                hero.x -= movementSize;
        }
        if (68 in keysDown) { // d
            if ((hero.x + hero.width / 4) <= canvas.width && !isCollisionWihPlayerDetected(hero.x + movementSize, hero.y + movementSize)) //verifica daca marginea hartii #Artificiu de boss
                hero.x += movementSize;

        }

    };




    function isCollisionWihPlayerDetected(newX, newY) {

        var width = 27.299;
        var height = 31.65;
        var i;

        if (currentPlayers == undefined) {
            return false;
        }

        for (i = 0; i < currentPlayers.length; i++) {

            if (currentPlayers[i].ConnectionId != gameHub.connection.id
             && newX < currentPlayers[i].X + width
             && newX + width > currentPlayers[i].X
             && newY < currentPlayers[i].Y + height
             && newY + height > currentPlayers[i].Y) {

                hitPlayerConnectionId = currentPlayers[i].ConnectionId;
                gethit.play();
                return true;
            }
        }

        return false;
    }


    var update_boomerang = function (modifier) {
        if (boomerang.clicked == false) {
            boomerang.x = hero.x;
            boomerang.y = hero.y;
        }

        if (boomerang.clicked == true) {
            //var aux=boomerang.yInitial-boomerang.nextY;
            //var aux2=boomerang.xInitial-boomerang.nextX;
            //var angle=Math.acos(Math.abs(aux)/Math.sqrt(aux*aux+aux2*aux2));
            //var radians=angle * Math.PI / 180;
            var radians = Math.atan2(boomerang.nextY - boomerang.yInitial, boomerang.nextX - boomerang.xInitial);
            //var angle=radians * Math.PI / 180;
            //var dgy = boomerang.nextY - boomerang.yInitial;
            //var dgx = boomerang.nextX - boomerang.xInitial;
            //theta = Math.atan2(dgy, dgx);
            //var radians = theta;
            //theta *= 180/Math.PI // rads to degs

            //var panta = dgy/dgx;
            //var radians = panta * 180/Math.PI;
            boomerang.x += Math.cos(radians) * boomerang.speed;
            boomerang.y += Math.sin(radians) * boomerang.speed;

            if (boomerang.x + 128 < 0 || boomerang.x > canvas.width || boomerang.y + 128 < 0 || boomerang.y > canvas.height) {
                boomerang.clicked = false;
            }

            if (isCollisionWihPlayerDetected(boomerang.x, boomerang.y)) {
                gameHub.server.boomerangHit(hitPlayerConnectionId);
                gethit.play();
                boomerang.clicked = false;
               
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
        if (hero.kills < 10) {
            if (heroReady) {
                ctx.drawImage(heroImage, hero.x, hero.y);
            }
        }
        else if (hero.kills < 25) {
            if (level1Ready) {
                ctx.drawImage(heroLevel1, hero.x, hero.y);
            }
        }
        else if (hero.kills < 50) {
            if (level2Ready) {
                ctx.drawImage(heroLevel2, hero.x, hero.y);
            }
        }
        else if (hero.kills < 75) {
            if (level3Ready) {
                ctx.drawImage(heroLevel3, hero.x, hero.y);
            }
        }
        else if (level4Ready) {
            ctx.drawImage(heroLevel4, hero.x, hero.y);
        }
        

        if (boomerangReady) {
            ctx.drawImage(boomerangImage, boomerang.x, boomerang.y);
        }

        renderOpponents();

        // scor momentan afisat pe acelasi canvas... bpl pun pe altu l8r in panel cum stabilisem in baza
        ctx.fillStyle = "rgb(250, 250, 250)";
      //  ctx.font = "24px Helvetica";
      //  ctx.textAlign = "left";
        //  ctx.textBaseline = "top";

        
    };

    var renderOpponents = function () {
        if (currentPlayers != undefined) {
            for (var i = 0; i < currentPlayers.length; i++) {
                {
                    if (gameHub.connection.id == currentPlayers[i].ConnectionId) {

                        userPanel.health.innerHTML = currentPlayers[i].Health;
                        userPanel.kills.innerHTML = currentPlayers[i].Kills;
                        userPanel.deaths.innerHTML = currentPlayers[i].Deaths;
                        hero.kills = currentPlayers[i].Kills;
                        hero.health = currentPlayers[i].Health;
                        if (hero.health < 1)
                            dieing.play();
                        ctx.fillText("xxx", hero.x, hero.y);
                    }
                    else

                    {
                        ctx.fillText("xxx", currentPlayers[i].X, currentPlayers[i].Y);
                        if (boomerangReady) {
                            ctx.drawImage(boomerangImage, currentPlayers[i].BoomerangX, currentPlayers[i].BoomerangY);
                        }
                        if (currentPlayers[i].Kills < 10) {
                            if (heroReady) {
                                ctx.drawImage(heroImage, currentPlayers[i].X, currentPlayers[i].Y);
                            }
                        }
                        else if (currentPlayers[i].Kills < 25) {
                            if (level1Ready) {
                                ctx.drawImage(heroLevel1, currentPlayers[i].X, currentPlayers[i].Y);
                            }
                        }
                        else if (currentPlayers[i].Kills < 50) {
                            if (level2Ready) {
                                ctx.drawImage(heroLevel2, currentPlayers[i].X, currentPlayers[i].Y);
                            }
                        }
                        else if (currentPlayers[i].Kills < 75) {
                            if (level3Ready) {
                                ctx.drawImage(heroLevel3, currentPlayers[i].X, currentPlayers[i].Y);
                            }
                        }
                        else if (level4Ready) {
                            ctx.drawImage(heroLevel4, currentPlayers[i].X, currentPlayers[i].Y);
                        }


                        
                     }
                }
            }
        }
    }






    // main game loop
    var main = function () {
        var now = Date.now();
        var delta = now - then;
        bkgrend();
        update(delta / 1000); //date.now returneaza in milisecunde trebe conversie
        update_boomerang(delta / 1000);
        ctx.clearRect(0, 0, 1000, 1000);
        render();

        then = now;

        // Request to do this again ASAP
        requestAnimationFrame(main);
    };


    // start la gioc
    var then = Date.now();

    initializePlayer();
    main();



    //end joc



    // Declare a proxy to reference the hub. 
    var gameHub = $.connection.gameHub;

    var userPanel =
        {
            health: document.getElementById('health'),
            kills: document.getElementById('kills'),
            deaths: document.getElementById('deaths')
        }

    gameHub.client.reset = function () {

        initializePlayer();
        dieing.play();
    }

    // Create a function that the hub can call to update players locations.
    gameHub.client.updatePlayers = function (playersList) {

        currentPlayers = playersList;

   
        //UPDATE PLayers
    };

    //gameHub.server.updateLocation(x, y);
    w.updateLocation = function () {
        // gameHub.server.updateLocation({ x: xx, y: yy });
        gameHub.server.updateLocation(hero.x, hero.y, boomerang.x, boomerang.y);

    }

    // Start the connection.
    $.connection.hub.start().done(function () {

        setInterval(updateLocation, 1000/15);
        //aici ar trebui sa-i trimitem username-ul serverului dar mai incolo;
    });
})();




