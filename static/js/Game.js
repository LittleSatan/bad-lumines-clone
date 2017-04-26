"use strict";
var fps = 60,
    tileSize = 40,
    gwidth = 1280,
    gheight = 720,
    scene = null,
    keys = null,
    settings = null,
    sprite = null,
    sound = new Sound();


window.onload = function() {
    fps = 1000 / fps;
    keys = new Array(222);

    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "60px Courier";
    ctx.textAlign = "center";
    ctx.fillText("Loading...", gwidth * 0.5, gheight * 0.5);

    var name = "settings" + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            settings = JSON.parse(c.substring(name.length, c.length));
        } else {
            settings = { "makeBig": 0, "blur": false, "bgm": 10, "se": 10 };
        }
    }

    var request = new XMLHttpRequest();
    // Set the audio file src here
    request.open('GET', 'bgm/moose.mp3', true);
    // Setting the responseType to arraybuffer sets up the audio decoding
    request.responseType = 'arraybuffer';
    request.onload = function() {
        // Decode the audio once the require is complete
        audioContext.decodeAudioData(request.response, function(buffer) {
            bgmSource.buffer = buffer;
            // Simple setting for the buffer
            bgmSource.loop = true;
            // Play the sound!

            bgmSource.connect(bgmGainNode);
            bgmGainNode.connect(audioContext.destination);

            var fraction = parseInt(settings.bgm) / 10;
            bgmGainNode.gain.value = fraction * fraction;

            bgmSource.start(0);

            sprite = new Image();
            sprite.src = "";
            sprite.onload = function() {
                for (var i = 0; i < 222; i++) {
                    keys[i] = 0;
                }
                document.onkeydown = function(e) {
                    keyDown(e);
                };
                document.onkeyup = function(e) {
                    keyUp(e);
                };
                window.onresize = resize;
                resize();
                setup();
            };
            sprite.src = 'textures.png';

        }, function(e) {
            console.log('Audio error! ', e);
        });
    }

    // Send the request which kicks off 
    request.send();


};

function setup() {
    scene = new Intro();
    loop();
}

function loop() {
    var start = +new Date();
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    scene.draw(c, ctx);
    scene.update();
    clearPressedKeys();
    var end = +new Date();
    if (end - start <= 0) {
        setTimeout(window.requestAnimationFrame(loop), 0);
    } else {
        setTimeout(window.requestAnimationFrame(loop), fps - (end - start));
    }
}

function resize() {
    var c = document.getElementById("gamePanel");
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (settings.makeBig == 2) {
        c.style.width = w;
        c.style.height = h;
    } else if (settings.makeBig == 1 || w < gwidth || h < gheight) {
        if (h / w < 0.75) {
            c.style.height = h;
            c.style.width = (h / gheight * gwidth);
        } else {
            c.style.width = w;
            c.style.height = (w / gwidth * gheight);
        }
    } else {
        c.style.height = gheight;
        c.style.width = gwidth;
    }
    if (settings.blur) {
        document.getElementById("gameCanvas").style.imageRendering = "auto";
    } else {
        document.getElementById("gameCanvas").style.imageRendering = "pixelated";
    }

}

function keyDown(e) {
    e = e.keyCode;
    if (keys[e] === 0) keys[e] = 2;
}

function keyUp(e) {
    e = e.keyCode;
    if (keys[e] >= 1) keys[e] = 0;
}

function clearPressedKeys() {
    for (var i = 0; i < 222; i++) {
        if (keys[i] == 2) keys[i] = 1;
    }
}