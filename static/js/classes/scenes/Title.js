function Title(selection) {

    if (selection) {
        this.select = selection;
        if (selection == 0) this.menuPos = [10, 0, 0, 0];
        if (selection == 1) this.menuPos = [0, 10, 0, 0];
        if (selection == 2) this.menuPos = [0, 0, 10, 0];
        if (selection == 3) this.menuPos = [0, 0, 0, 10];
    } else {
        this.select = 0,
            this.menuPos = [10, 0, 0, 0];
    };

    this.frame = 0,
        this.fadeout = 0,
        this.background = new Background(1);

    this.update = function() {
        if (this.fadeout >= 1) this.fadeout++;
        this.frame++;
        for (let i = 0; i < this.menuPos.length; i++)
            if (this.select === i && this.menuPos[i] < 10) this.menuPos[i]++;
        for (let i = 0; i < this.menuPos.length; i++)
            if (this.select !== i && this.menuPos[i] > 0) this.menuPos[i]--;
        if (this.fadeout === 0) {
            if (keys[13] === 2) {
                sound.chooseMenu();
                this.fadeout++;
            } else if (keys[40] === 2) {
                sound.selectMenu();
                this.select++;
                if (this.select > 3) this.select = 0;
            } else if (keys[38] === 2) {
                sound.selectMenu();
                this.select--;
                if (this.select < 0) this.select = 3;
            }
        }
        if (this.fadeout === 15) {
            if (this.select === 0) scene = new GameScreen();
            if (this.select === 1) scene = new GameModeSelect();
            if (this.select === 2) scene = new Highscore();
            if (this.select === 3) scene = new Options();
        }
    };

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
        ctx.fillText(document.title, gwidth * 0.5, 200);
        ctx.font = "50px Courier";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(90, 465, 360, 220);
        ctx.fillStyle = '#FFF';
        ctx.textAlign = "left";
        if (this.select === 0) {
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = 0.5 + 0.05 * this.menuPos[0];
        }
        ctx.fillText("Normal Game", 100 + this.menuPos[0], 515);
        if (this.select == 1) {
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = 0.5 + 0.05 * this.menuPos[1];
        }
        ctx.fillText("Mode Select", 100 + this.menuPos[1], 565);
        if (this.select == 2) {
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = 0.5 + 0.05 * this.menuPos[2];
        }
        ctx.fillText("Highscore", 100 + this.menuPos[2], 615);
        if (this.select == 3) {
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = 0.5 + 0.05 * this.menuPos[3];
        }
        ctx.fillText("Options", 100 + this.menuPos[3], 665);
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