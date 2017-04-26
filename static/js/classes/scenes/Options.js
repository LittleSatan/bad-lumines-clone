function Options() {

    this.select = 0;
    this.frame = 0;
    this.fadeout = 0;

    this.update = function() {
        var c = document.getElementById("gameCanvas");
        if (this.fadeout === 0) {

            if (keys[13] == 2) {
                if (this.select == 4) {
                    sound.chooseMenu();
                    this.fadeout++;
                }
            } else if (keys[27] == 2) {
                sound.chooseMenu();
                this.fadeout++;
            } else if (keys[40] == 2) {
                this.select++;
                sound.selectMenu();
                if (this.select > 4) this.select = 0;
            } else if (keys[38] == 2) {
                this.select--;
                sound.selectMenu();
                if (this.select < 0) this.select = 4;
            } else if (keys[37] == 2) {
                // left

                if (this.select != 4 && this.select != 2) {
                    sound.selectMenu();
                }

                if (this.select == 0) {
                    settings.makeBig--;
                    if (settings.makeBig == -1) settings.makeBig = 2;
                    resize();
                }
                if (this.select == 1) {
                    settings.blur = !settings.blur;
                    resize();
                }
                if (this.select == 2) {
                    settings.bgm--;
                    if (settings.bgm <= 0) settings.bgm = 0;
                    var fraction = parseInt(settings.bgm) / 10;
                    bgmGainNode.gain.value = fraction * fraction;
                }
                if (this.select == 3) {
                    settings.se--;
                    if (settings.se < 0) settings.se = 0;
                }

            } else if (keys[39] == 2) {
                // right

                if (this.select != 4 && this.select != 2) {
                    sound.selectMenu();
                }

                if (this.select == 0) {
                    settings.makeBig++;
                    if (settings.makeBig == 3) settings.makeBig = 0;
                    resize();
                }
                if (this.select == 1) {
                    settings.blur = !settings.blur;
                    resize();
                }
                if (this.select == 2) {
                    settings.bgm++;
                    if (settings.bgm > 10) settings.bgm = 10;
                    var fraction = parseInt(settings.bgm) / 10;
                    bgmGainNode.gain.value = fraction * fraction;
                }
                if (this.select == 3) {
                    settings.se++;
                    if (settings.se > 10) settings.se = 10;
                }
            }

        }

        if (this.fadeout === 15) this.goTitle();

        this.frame++;
        if (this.fadeout >= 1) this.fadeout++;
    };

    this.goTitle = function() {

        var d = new Date();
        d.setTime(d.getTime() + (2592000000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "settings" + "=" + JSON.stringify(settings) + ";" + expires + ";path=/";

        scene = new Title(3);
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
        ctx.fillText("Options", gwidth * 0.5, 200);
        ctx.font = "50px Courier";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(290, 270, 700, 270);
        ctx.fillStyle = '#FFF';
        ctx.textAlign = "left";

        // Size
        if (this.select == 0) {
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = 0.5;
        }
        ctx.fillText("Big Screen", 50 + 250, 320);
        if (settings.makeBig == 1) {
            ctx.globalAlpha = 0.5;
            ctx.fillText("No", 370 + 250, 320);
            ctx.globalAlpha = 1;
            ctx.fillText("Yes", 460 + 250, 320);
            ctx.globalAlpha = 0.5;
            ctx.fillText("Strech", 560 + 250, 320);
        } else if (settings.makeBig == 2) {
            ctx.globalAlpha = 0.5;
            ctx.fillText("No", 370 + 250, 320);
            ctx.fillText("Yes", 460 + 250, 320);
            ctx.globalAlpha = 1;
            ctx.fillText("Strech", 560 + 250, 320);
        } else {
            ctx.globalAlpha = 1;
            ctx.fillText("No", 370 + 250, 320);
            ctx.globalAlpha = 0.5;
            ctx.fillText("Yes", 460 + 250, 320);
            ctx.fillText("Strech", 560 + 250, 320);
        }

        // Rendering
        if (this.select == 1) {
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = 0.5;
        }
        ctx.fillText("Rendering", 50 + 250, 370);
        if (settings.blur == false) {
            ctx.globalAlpha = 1;
            ctx.fillText("Pixel", 370 + 250, 370);
            ctx.globalAlpha = 0.5;
            ctx.fillText("Blur", 560 + 250, 370);
        } else {
            ctx.globalAlpha = 0.5;
            ctx.fillText("Pixel", 370 + 250, 370);
            ctx.globalAlpha = 1;
            ctx.fillText("Blur", 560 + 250, 370);
        }

        // BGM
        if (this.select == 2) {
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = 0.5;
        }
        ctx.fillText("Music", 50 + 250, 420);

        ctx.globalAlpha = 1;
        ctx.fillStyle = '#FFF';
        for (let i = 0; i <= 9; i++) {
            ctx.fillRect(250 + 250 + i * 44, 385, 5, 35);
        }
        for (let i = 0; i < settings.bgm; i++) {
            ctx.fillRect(250 + 250 + i * 44, 385, 30, 35);
        }

        // SE
        if (this.select == 3) {
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = 0.5;
        }
        ctx.fillText("Sound", 50 + 250, 470);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#FFF';
        for (let i = 0; i <= 9; i++) {
            ctx.fillRect(250 + 250 + i * 44, 435, 5, 35);
        }
        for (let i = 0; i < settings.se; i++) {
            ctx.fillRect(250 + 250 + i * 44, 435, 30, 35);
        }

        // Back
        if (this.select == 4) {
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = 0.5;
        }
        ctx.fillText("Back", 50 + 250, 520);

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