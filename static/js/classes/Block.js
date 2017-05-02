function Block(color) {

    this.color = color;
    this.fallDownTimer = 0;
    this.group = 0;
    this.falling = false;

    this.fallDown = function() {
        if (this.fallDownTimer == 5) {
            this.fallDownTimer = 0;
            return true;
        } else {
            this.fallDownTimer++;
        }
    };

    this.draw = function(c, ctx, x, y) {
        if (this.color === 0) ctx.fillStyle = '#FFF';
        if (this.color === 1) ctx.fillStyle = '#F00';
        if (this.color === 2) ctx.fillStyle = '#00F';
        if (this.color === 3) ctx.fillStyle = '#0F0';
        ctx.fillRect(gwidth * 0.5 - 8 * 50 + 52 * (x - 1), 170 + 52 * (y - 2), 50, 50);
    };
}