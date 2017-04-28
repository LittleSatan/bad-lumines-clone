function GameScreen() {

    this.barSpeed = [5, 2, 3],
        this.fallSpeed = [50, 40, 20],
        this.waitBeforeFall = [120, 80, 60],
        this.time = 0,
        this.frame = 0,
        this.gameOverFrame = 0,
        this.fadeout = 0,
        this.level = 0,
        this.gameState = 0,
        this.playerPos = 7,
        this.playerCurrentBlock = [
            [new Block(Math.floor(Math.random() * 2) + 1), new Block(Math.floor(Math.random() * 2) + 1)],
            [new Block(Math.floor(Math.random() * 2) + 1), new Block(Math.floor(Math.random() * 2) + 1)]
        ]
    this.playerY = 0;
    this.playerYFall = this.waitBeforeFall[this.level];
    this.playerYFallCooldown = 15;
    this.barPos = 0;

    this.playerMoveLeftCooldown = 0,
        this.playerMoveRightCooldown = 0,
        this.arena = [
            [new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(0), new Block(3)],
            [new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3), new Block(3)]
        ],
        this.nextBlocks = [
            [
                [new Block(Math.floor(Math.random() * 2) + 1), new Block(Math.floor(Math.random() * 2) + 1)],
                [new Block(Math.floor(Math.random() * 2) + 1), new Block(Math.floor(Math.random() * 2) + 1)]
            ],
            [
                [new Block(Math.floor(Math.random() * 2) + 1), new Block(Math.floor(Math.random() * 2) + 1)],
                [new Block(Math.floor(Math.random() * 2) + 1), new Block(Math.floor(Math.random() * 2) + 1)]
            ],
            [
                [new Block(Math.floor(Math.random() * 2) + 1), new Block(Math.floor(Math.random() * 2) + 1)],
                [new Block(Math.floor(Math.random() * 2) + 1), new Block(Math.floor(Math.random() * 2) + 1)]
            ]
        ],
        this.background = new Background(2);

    this.checkGameover = function() {
        for (let x = 1; x < this.arena.length - 2; x++) {

            if (this.arena[x][0].color > 0) {
                console.log("game over");
                this.gameState = 2;
            }

            if (this.arena[x][1].color > 0) {
                this.arena[x][1] = new Block(0);
            }
        }

    };

    this.makeNewBlocks = function() {
        this.playerYFall = this.waitBeforeFall[this.level];
        this.arena[this.playerPos + 1][this.playerY] = this.playerCurrentBlock[0][0];
        this.arena[this.playerPos + 2][this.playerY] = this.playerCurrentBlock[1][0];
        this.arena[this.playerPos + 1][this.playerY + 1] = this.playerCurrentBlock[0][1];
        this.arena[this.playerPos + 2][this.playerY + 1] = this.playerCurrentBlock[1][1];
        this.playerY = 0;
        this.playerPos = this.arena.length * 0.5 - 2;
        this.playerCurrentBlock = this.nextBlocks[0];
        this.nextBlocks[0] = this.nextBlocks[1];
        this.nextBlocks[1] = this.nextBlocks[2];
        this.nextBlocks[2] = [
            [new Block(Math.floor(Math.random() * 2) + 1), new Block(Math.floor(Math.random() * 2) + 1)],
            [new Block(Math.floor(Math.random() * 2) + 1), new Block(Math.floor(Math.random() * 2) + 1)]
        ];
    }

    this.rotateClock = function() {
        let placeholder = this.playerCurrentBlock[0][0];
        this.playerCurrentBlock[0][0] = this.playerCurrentBlock[0][1];
        this.playerCurrentBlock[0][1] = this.playerCurrentBlock[1][1];
        this.playerCurrentBlock[1][1] = this.playerCurrentBlock[1][0];
        this.playerCurrentBlock[1][0] = placeholder;
    }

    this.rotateConClock = function() {
        let placeholder = this.playerCurrentBlock[0][0];
        this.playerCurrentBlock[0][0] = this.playerCurrentBlock[1][0];
        this.playerCurrentBlock[1][0] = this.playerCurrentBlock[1][1];
        this.playerCurrentBlock[1][1] = this.playerCurrentBlock[0][1];
        this.playerCurrentBlock[0][1] = placeholder;
    }

    this.moveDown = function() {
        if (this.playerYFall == 0) {
            if (this.arena[this.playerPos + 1][this.playerY + 2].color >= 1 || this.arena[this.playerPos + 2][this.playerY + 2].color >= 1) {
                this.makeNewBlocks();
            } else {
                this.playerY++;
                this.playerYFall = this.fallSpeed[this.level];
            }
        } else {
            this.playerYFall--;
        }
    }

    this.moveLeft = function() {
        if (this.arena[this.playerPos][this.playerY].color < 1 && this.arena[this.playerPos][this.playerY + 1].color < 1) {
            this.playerPos--;
        }

    }

    this.moveRight = function() {
        if (this.arena[this.playerPos + 3][this.playerY].color < 1 && this.arena[this.playerPos + 3][this.playerY + 1].color < 1) {
            this.playerPos++;
        }

    }

    this.update = function() {

        if (this.gameState === 1) {

            if (keys[13] == 2) {
                this.gameState = 0;
                return;
            }

        }

        if (this.gameState === 2) {

            if (this.fadeout === 0 && keys[13] == 2) {
                this.fadeout = 1;
            }

            if (this.gameOverFrame < 10) this.gameOverFrame++;
            if (this.fadeout > 0) this.fadeout++;
            if (this.fadeout === 15) {
                scene = new GameScreen();
                return;
            }
        }

        if (this.gameState === 0) {

            if (keys[13] == 2) {
                this.gameState = 1;
                return;
            }

            if (keys[40] == 2) {
                this.playerYFall = 0;
            }

            if (keys[40] == 1) {
                if (this.playerYFallCooldown == 0) {
                    this.playerYFall = 0;
                    this.playerYFallCooldown = 3;
                } else {
                    this.playerYFallCooldown--;
                }
            }

            if (keys[40] != 1) {
                this.playerYFallCooldown = 15;
            }

            if (keys[69] == 2 || keys[32] == 2) {
                this.rotateClock();
            }

            if (keys[81] == 2) {
                this.rotateConClock();
            }

            if (keys[37] == 0 || keys[39] >= 1) this.playerMoveLeftCooldown == 20;
            if (keys[39] == 0 || keys[37] >= 1) this.playerMoveRightCooldown == 20;
            if (keys[37] >= 1 && keys[39] >= 1) {
                this.playerMoveLeftCooldown == 20;
                this.playerMoveRightCooldown == 20;
            }
            if ((keys[37] != 0 || keys[39] != 0) && !(keys[37] != 0 && keys[39] != 0)) {
                if (keys[37] == 2) {
                    // left
                    this.moveLeft();
                    this.playerMoveLeftCooldown = 20;
                } else if (keys[37] == 1 && this.playerMoveLeftCooldown == 0) {
                    // left
                    this.moveLeft();
                    this.playerMoveLeftCooldown = 3;
                } else if (keys[37] == 1 && this.playerMoveLeftCooldown > 0) {
                    this.playerMoveLeftCooldown--;
                } else if (keys[39] == 2) {
                    // right
                    this.moveRight();
                    this.playerMoveRightCooldown = 20;
                } else if (keys[39] == 1 && this.playerMoveRightCooldown == 0) {
                    // right
                    this.moveRight();
                    this.playerMoveRightCooldown = 3;
                } else if (keys[39] == 1 && this.playerMoveRightCooldown > 0) {
                    this.playerMoveRightCooldown--;
                }
            }

            // blocks will fall down
            for (let x = 1; x < this.arena.length - 1; x++) {
                for (let y = this.arena[x].length - 2; y > 2; y--) {
                    if (this.arena[x][y].color == 0) {
                        if (this.arena[x][y - 1].fallDown()) {
                            this.arena[x][y] = this.arena[x][y - 1];
                            this.arena[x][y - 1] = new Block(0);
                        }
                    }
                }
            }

            this.barPos += this.barSpeed[this.level];
            if (this.barPos >= 829) this.barPos = 0;
            this.moveDown();
            this.checkGameover();
            this.frame++;

        }
    };

    this.draw = function(c, ctx) {

        ctx.globalAlpha = 1;

        this.background.draw(c, ctx);
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, gwidth, gheight);

        ctx.fillStyle = '#000';
        ctx.fillRect(gwidth * 0.5 - 8 * 50 + 52 * this.playerPos, 170, 102, 518);

        for (let x = 1; x < this.arena.length - 1; x++) {
            for (let y = 2; y < this.arena[x].length - 1; y++) {
                this.arena[x][y].draw(c, ctx, x, y);
            }
        }

        for (let x = 0; x < this.playerCurrentBlock.length; x++) {
            for (let y = 0; y < this.playerCurrentBlock[x].length; y++) {
                if (this.playerCurrentBlock[x][y].color === 1) ctx.fillStyle = '#F00';
                if (this.playerCurrentBlock[x][y].color === 2) ctx.fillStyle = '#00F';
                ctx.fillRect(gwidth * 0.5 - 8 * 50 + 52 * this.playerPos + 52 * x, 66 + 52 * y + 52 * this.playerY, 50, 50);
                ctx.fillStyle = '#FFF';
                ctx.globalAlpha = 0.3;
                ctx.fillRect(gwidth * 0.5 - 8 * 50 + 52 * this.playerPos + 52 * x, 66 + 52 * y + 52 * this.playerY, 50, 50);
                ctx.globalAlpha = 1;
            }
        }

        ctx.fillStyle = '#F0F';
        ctx.globalAlpha = 1;
        ctx.fillRect(243 + this.barPos, 170, 1, 518);
        ctx.globalAlpha = 0.8;
        ctx.fillRect(242 + this.barPos, 170, 1, 518);
        ctx.globalAlpha = 0.7;
        ctx.fillRect(241 + this.barPos, 170, 1, 518);
        ctx.globalAlpha = 0.65;
        ctx.fillRect(240 + this.barPos, 170, 1, 518);
        ctx.globalAlpha = 1;

        for (let a = 0; a < this.nextBlocks.length; a++) {
            for (let x = 0; x < this.nextBlocks[a].length; x++) {
                for (let y = 0; y < this.nextBlocks[a][x].length; y++) {
                    if (this.nextBlocks[a][x][y].color === 1) ctx.fillStyle = '#F00';
                    if (this.nextBlocks[a][x][y].color === 2) ctx.fillStyle = '#00F';
                    ctx.fillRect(55 + 63 * x, 170 + 63 * y + a * 160, 60, 60);
                }
            }
        }

        if (this.frame < 15) {
            ctx.globalAlpha = 1 - ((1 / 15) * this.frame);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, gwidth, gheight);
        }

        if (this.gameState == 2) {
            if (this.gameOverFrame >= 1) {
                ctx.globalAlpha = (1 / 20) * this.gameOverFrame;
                if (this.gameOverFrame >= 10) ctx.globalAlpha = 0.5;
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, gwidth, gheight);
                ctx.fillStyle = '#000';
                ctx.globalAlpha = ctx.globalAlpha = (1 / 16.6) * this.gameOverFrame;
                ctx.fillRect(0, 0, gwidth, gheight);
                ctx.fillRect(gwidth * 0.05, gheight * 0.5 - 160, gwidth * 0.9, 260);
                ctx.fillStyle = "#FFF";
                ctx.textAlign = "center";
                ctx.globalAlpha = (1 / 10) * this.gameOverFrame;
                ctx.font = "200px Courier";
                ctx.fillText("Game Over", gwidth * 0.5, gheight * 0.5);
                ctx.font = "40px Courier";
                ctx.fillText("Press Enter to restart", gwidth * 0.5, gheight * 0.5 + 60);
            }

            if (this.fadeout >= 1) {
                ctx.globalAlpha = (1 / 15) * this.fadeout;
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, gwidth, gheight);
            }

        }

        if (this.gameState == 1) {
            ctx.fillStyle = '#000';
            ctx.globalAlpha = 0.6;
            ctx.fillRect(0, 0, gwidth, gheight);
            ctx.fillRect(gwidth * 0.25, gheight * 0.5 - 160, gwidth * 0.5, 260);
            ctx.fillStyle = "#FFF";
            ctx.textAlign = "center";
            ctx.font = "200px Courier";
            ctx.fillText("PAUSE", gwidth * 0.5, gheight * 0.5);
            ctx.font = "40px Courier";
            ctx.fillText("Press Enter to resume", gwidth * 0.5, gheight * 0.5 + 60);
        }

    };
}