Crafty.c("Grid", {
    init : function() {
        this.addComponent("2D, Canvas, Mouse");

        this._c = 0; // cols
        this._r = 0; // rows
        this._w = 64; // width
        this._tiles = []; // tiles
    },

    newGrid : function(rows, cols, width) {
        this._r = rows;
        this._c = cols;
        this._w = width;

        for(i=0;i<this._r;i++) {
            for(j=0;j<this._c;j++) {
                tx = j * this._w;
                ty = i * this._w;
                tile = Crafty.e("MapEdit_Tile")
                    .Tile(tx,ty,this._w);

                this._tiles.push(tile);
            }
        }

        this.attr({
            x : 0,
            y : 0,
            w : Crafty.viewport.width,
            h : Crafty.viewport.height
        });
    }
});
