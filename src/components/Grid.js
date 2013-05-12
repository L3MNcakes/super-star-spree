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
                py = ty + (this._w / 4);

                Crafty.e("MapEdit_BaseTile")
                    .attr({
                        x : tx,
                        y : ty,
                        w : this._w,
                        h : this._w
                    });

                /**
                block_tile = Crafty.e("MapEdit_Tile")
                    .type("block")
                    .attr({
                        x : tx,
                        y : ty,
                        w : this._w,
                        h : this._w,
                        z : 5
                    })
                    .setAlpha()
                    .activate();

                person_tile = Crafty.e("MapEdit_Tile")
                    .type("player")
                    .attr({
                        x : px,
                        y : py,
                        w : this._w,
                        h : this._w,
                        z : 0
                    })
                    .setAlpha()
                    .single(true);
                // person_tile = Crafty.e("MapEdit_Person");

                this._block_tiles.push(block_tile);
                this._person_tiles.push(person_tile);
                **/
            }
        }

        this.bind("KeyDown", function(e) {
            if(e.key == Crafty.keys["P"]) {
                if(this._mode == "block") this._mode = "player";
                else if (this._mode == "star") this._mode = "player";
                else if (this._mode == "player") this._mode = "block";

                Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
            } else if(e.key == Crafty.keys["S"]) {
                if(this._mode == "block") this._mode = "star";
                else if (this._mode == "player") this._mode = "star";
                else if (this._mode == "star") this._mode = "block";

                Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
            }
        });

        /**
        this.bind("MapEditPerson_StateSet", function(e) {
            for(t in this._person_tiles) {
                if(e.tile != this._person_tiles[t]) {
                    this._person_tiles[t].destroyImage();
                } 
            }
        });
        **/

        this.attr({
            x : 0,
            y : 0,
            w : Crafty.viewport.width,
            h : Crafty.viewport.height
        });
    }
});
