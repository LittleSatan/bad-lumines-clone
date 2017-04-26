function Block(posX, posY) {

    this.pos = [posX, posY];
    this.blocks = [new Block(0, 0), new Block(1, 0), new Block(0, 1), new Block(1, 1), ]

    this.update = function() {

    };

    this.draw = function(c, ctx, offsetX, offsetY) {
        for (let i = 0; i < 4; i++) {
            this.blocks[i].update();
        }
    };
}