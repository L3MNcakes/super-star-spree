Crafty.c("Grid", {
    init : function() {
        this.addComponent("2D, Canvas, Mouse, Keyboard");

        this._c = 0; // cols
        this._r = 0; // rows
        this._w = 64; // width
        this._block_tiles = []; // tiles
        this._person_tiles = [];
        this._mode = "block";
    },

    newGrid : function(rows, cols, width) {
        this._r = rows;
        this._c = cols;
        this._w = width;

        for(i=0;i<this._r;i++) {
            for(j=0;j<this._c;j++) {
                tx = j * this._w;
                ty = i * this._w;
                px = tx;
                py = ty + (this._w / 2);

                block_tile = Crafty.e("MapEdit_Tile")
                    .Tile(tx,ty,this._w);

                person_tile = Crafty.e("MapEdit_Person")
                    .Person(px,py,this._w);

                this._block_tiles.push(block_tile);
                this._person_tiles.push(person_tile);
            }
        }

        this.bind("KeyDown", function(e) {
            if(e.key == Crafty.keys["P"]) {
                if(this._mode == "block") this._mode = "person";
                else if (this._mode == "person") this._mode = "block";

                Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
            }
        });

        this.attr({
            x : 0,
            y : 0,
            w : Crafty.viewport.width,
            h : Crafty.viewport.height
        });
    }
});
