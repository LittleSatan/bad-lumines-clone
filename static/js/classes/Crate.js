function Crate(x, y, color) {

    this.color = color;
    this.pos = [x, y];
    this.connected = false;

    this.update = function() {

    };

    this.draw = function(c, ctx) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.color;
        ctx.drawImage(window.sprite, this.spritePos[0] * 40, this.spritePos[1] * 40, 40, 40, this.pos[0] - offsetX, this.pos[1] - offsetY, tileSize, tileSize);
    };
}