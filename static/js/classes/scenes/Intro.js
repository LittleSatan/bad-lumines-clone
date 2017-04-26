function Intro() {

    this.select = 0;
    this.fadeOut = 0;
    this.frame = 0;
    this.background = new Background(0);

    this.update = function() {
        this.background.update();
        if (this.fadeOut >= 1) {
            this.fadeOut++;
            if (this.fadeOut == 15) {
                sound.chooseMenu();
                scene = new Title();
            }
        } else {
            if (keys[13] == 2) {
                this.fadeOut = 1;
            }
        }
        this.frame++;
    };

    this.draw = function(c, ctx) {
        this.background.draw();
        ctx.globalAlpha = 1;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "#000000";
        ctx.font = "100px Courier";
        ctx.textAlign = "center";
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'purple';
        grd = ctx.createLinearGradient(0, 0, gwidth, gheight);
        grd.addColorStop(0, "rgb(255, 0, 128)");
        grd.addColorStop(1, "rgb(255, 153, 51)");
        ctx.fillStyle = grd;
        ctx.fillText("LUNIMES", gwidth * 0.5, 100);
        ctx.strokeText("LUNIMES", gwidth * 0.5, 100);
        ctx.fillStyle = "white";
        ctx.font = "50px Courier";
        ctx.fillText("Press Enter", gwidth * 0.5, 610 + (Math.sin(this.frame * 0.05) * 20));
        ctx.lineWidth = 0;
        ctx.globalAlpha = (1 / 15) * this.fadeOut;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, gwidth, gheight);
    };
}