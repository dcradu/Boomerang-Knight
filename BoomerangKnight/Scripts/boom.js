(function () {

    // center the canvas
    $(document).ready(function () {
        var availableWidth = 78 / 100 * $(window).width();
        var availableHeight = $(window).height();

        window.canvasTop = 0;
        window.canvasLeft = 0;

        var canvas = document.getElementById("myCanvas");
        if (availableHeight - 461 > 0) {
            canvas.style.top = (availableHeight - 461) / 2 + 'px';
            window.canvasTop = (availableHeight - 461) / 2;
        }
        if (availableWidth - 999 > 0) {
            canvas.style.left = (availableWidth - 999) / 2 + 'px';
            window.canvasLeft = (availableWidth - 999) / 2;
        }
    });


    // cross-browser support for requestAnimationFrame
    // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame = requestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame || mozRequestAnimationFrame;

    // list of players
    var currentPlayers;
    var canvasCopied = true;
   
    // load canvases
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 999;
    canvas.height = 461;
    document.body.appendChild(canvas);

    var playersCanvas = document.createElement("canvas");
    var ctxPlayers = playersCanvas.getContext("2d");
    playersCanvas.width = 999;
    playersCanvas.height = 461;

    // load background image
    var bgReady = false;
    var bgImage = new Image();
    bgImage.onload = function () {
        bgReady = true;
    };
    bgImage.src = "../Images/Game/background.png";

    // load player images
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

    // load sounds
    var gethit = new Audio('../Sounds/gettinghit.wav');
    var dieing = new Audio('../Sounds/dieing.wav');
    var hit = new Audio('../Sounds/hit.wav');


    // obiecte
    var hero = {
        speed: 256, // pixel /s
        width: 128,
        height: 128
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

    var keysDown = {};

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);


    // on click (for boomerang)
    onclick = function (e) {
        if (e.pageX - canvasLeft < 999 && e.pageY - canvasTop < 461) {
            if (boomerang.clicked == false) {
                boomerang.clicked = true;
                hit.play();
                boomerang.xInitial = hero.x + canvasLeft + hero.width / 4;
                boomerang.yInitial = hero.y + canvasTop;
                boomerang.nextX = e.clientX;
                boomerang.nextY = e.clientY;
            }
        }

    }

    var initializePlayer = function () {
        hero.x = (Math.random() * (canvas.width - 27));
        hero.y = (Math.random() * (canvas.height - 31));
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


    // updates hero movement based on keys pressed
    var update = function (modifier) {
        
        movementSize = hero.speed * modifier;

        if (87 in keysDown) { // w
            if ((hero.y) >= 0 && !isCollisionWihPlayerDetected(hero.x, hero.y - movementSize))			

                hero.y -= movementSize;
        }
        if (83 in keysDown) { // s
            if ((hero.y + hero.height / 4) <= canvas.height && !isCollisionWihPlayerDetected(hero.x, hero.y + movementSize))

                hero.y += movementSize;
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
            var radians = Math.atan2(boomerang.nextY - boomerang.yInitial, boomerang.nextX - boomerang.xInitial);
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

    var drawBackground = function (context) {

        if (bgReady) {
            context.drawImage(bgImage, 0, 0);
        }
    };

    // renders players on the temporary canvas playersCanvas(double buffering technique) 
    var render = function () {

        ctxPlayers.font = "16px Helvetica";
        drawBackground(ctxPlayers);
        renderPlayers();

    };

    var renderPlayers = function () {
        if (currentPlayers != undefined && canvasCopied) {
            for (var i = 0; i < currentPlayers.length; i++) {
                {
                    if (gameHub.connection.id == currentPlayers[i].ConnectionId) {
                   
                        userPanel.health.innerHTML = currentPlayers[i].Health;
                        userPanel.kills.innerHTML = currentPlayers[i].Kills;
                        userPanel.deaths.innerHTML = currentPlayers[i].Deaths;
                        userPanel.rank.innerHTML = currentPlayers[i].Rank;
                        hero.kills = currentPlayers[i].Kills;
                        hero.health = currentPlayers[i].Health;
                        if (hero.health < 1)
                            dieing.play();
                    }
                    
                    ctxPlayers.fillText(currentPlayers[i].Username, currentPlayers[i].X, currentPlayers[i].Y);
                    if (boomerangReady) {
                        ctxPlayers.drawImage(boomerangImage, currentPlayers[i].BoomerangX, currentPlayers[i].BoomerangY);
                    }
                    if (currentPlayers[i].Rank == 'Tool' && level1Ready) {
                            ctxPlayers.drawImage(heroLevel1, currentPlayers[i].X, currentPlayers[i].Y);
                    }
                    else if (currentPlayers[i].Rank == 'Poser' && level2Ready) {
                            ctxPlayers.drawImage(heroLevel2, currentPlayers[i].X, currentPlayers[i].Y);
                    }
                    else if (currentPlayers[i].Rank == 'Hustler' && level3Ready) {
                            ctxPlayers.drawImage(heroLevel3, currentPlayers[i].X, currentPlayers[i].Y);
                    }
                    else if (level4Ready) {
                        ctxPlayers.drawImage(heroLevel4, currentPlayers[i].X, currentPlayers[i].Y);
                    }
                }
                canvasCopied = false;
            }
        }
    }

    // main game loop
    var main = function () {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        update_boomerang(delta / 1000);

        then = now;

        requestAnimationFrame(main);
    };

    // Declare a proxy to reference the hub. 
    var gameHub = $.connection.gameHub;

    var userPanel =
        {
            health: document.getElementById('health'),
            kills: document.getElementById('kills'),
            deaths: document.getElementById('deaths'),
            rank: document.getElementById('rank')
        }

    gameHub.client.reset = function () {

        initializePlayer();
        dieing.play();
    }

    // Create a function that the hub can call to update players locations.
    gameHub.client.updatePlayers = function (playersList) {

        currentPlayers = playersList;

        render();

        if (canvasCopied == false) {
            ctx.clearRect(0, 0, 999, 441);
            ctx.drawImage(playersCanvas, 0, 0);
            canvasCopied = true;
        }

     };

    updateLocation = function () {
        gameHub.server.updateLocation(hero.x, hero.y, boomerang.x, boomerang.y);
    }

    // Start the connection.
    $.connection.hub.start().done(function () {

        setInterval(updateLocation, 1000/20);
        gameHub.server.receiveEmailFromNewPlayer(document.getElementsByClassName('emailDisconnect')[0].innerHTML);
    });



    // start game
    var then = Date.now();

    initializePlayer();
    main();


})();




