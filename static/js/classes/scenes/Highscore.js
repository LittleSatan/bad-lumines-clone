function Highscore() {

    this.frame = 0;
    this.fadeout = 0;
    this.highscoreList;

    var request = new XMLHttpRequest();
    request.open('GET', '/getHighScores', true);
    request.responseType = 'json';

    request.onload = function() {
        scene.highscoreList = request.response;
    }
    request.send();

    this.update = function() {
        if (this.fadeout == 0 && (keys[13] == 2 || keys[27])) {
            sound.chooseMenu();
            this.fadeout++;
        }
        if (this.fadeout === 15) {
            this.goTitle();
        }

        this.frame++;
        if (this.fadeout >= 1) this.fadeout++;
    };

    this.goTitle = function() {
        scene = new Title(2);
    }

    this.draw = function(c, ctx) {
        ctx.globalAlpha = 1;
        var grd = ctx.createLinearGradient(0, 0, 0, gwidth * 0.5);
        grd.addColorStop(0, "#75aaff");
        grd.addColorStop(1, "#003ea3");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "#000000";
        ctx.font = "100px Courier";
        ctx.textAlign = "center";
        ctx.fillText("Highscore", gwidth * 0.5, 100);
        ctx.font = "50px Courier";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(260, 130, 760, 520);
        ctx.fillStyle = '#FFF';
        ctx.globalAlpha = 1;
        ctx.fillText("Back", gwidth * 0.5, 630);

        if (this.highscoreList) {
            for (let i = 0; i <= 9; i++) {
                ctx.font = "45px Courier";
                ctx.textAlign = "left";
                ctx.fillText(this.highscoreList[i].name, 275, 175 + i * 45);
                ctx.textAlign = "right";
                ctx.fillText(this.highscoreList[i].score, 1005, 175 + i * 45);
            }

        } else {
            if (this.frame % 200 >= 150) {
                ctx.fillText("loading...", gwidth * 0.5, 390);
            } else if (this.frame % 200 >= 100) {
                ctx.fillText("loading..", gwidth * 0.5, 390);
            } else if (this.frame % 200 >= 50) {
                ctx.fillText("loading.", gwidth * 0.5, 390);
            } else
                ctx.fillText("loading", gwidth * 0.5, 390);
        }


        if (this.frame < 15) {
            ctx.globalAlpha = 1 - ((1 / 15) * this.frame);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, gwidth, gheight);
        }

        if (this.fadeout >= 1) {
            ctx.globalAlpha = (1 / 15) * this.fadeout;
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, gwidth, gheight);
        }

    };
}