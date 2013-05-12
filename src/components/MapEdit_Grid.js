Crafty.c("MapEdit_Grid", {
    _c : 0,
    _r : 0,
    _tw : gameContainer.conf.get("tile_width"),
    _mode : "empty",

    init : function() {
        this.addComponent("2D, Canvas, Mouse, Keyboard");

        this._tiles = [];

        this.bind("KeyDown", function(e) {
            switch(e.key) {
                case Crafty.keys["P"]:
                    this._mode = "player";
                    Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
                    break;
                case Crafty.keys["S"]:
                    this._mode = "star";
                    Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
                    break;
                case Crafty.keys["B"]:
                    this._mode = "block";
                    Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
                    break;
                case Crafty.keys["ESC"]:
                    this._mode = "empty";
                    Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
                    break;
            }
        });

        return this;
    },

    grid : function(rows,cols) {
        this._r = rows;
        this._c = cols;

        for(i=0;i<this._r;i++) {
            for(j=0;j<this._c;j++) {
                tile = Crafty.e("MapEdit_BaseTile")
                    .attr({
                        x : j * this._tw,
                        y : i * this._tw,
                        w : this._tw,
                        h : this._tw
                    })

                this._tiles.push(tile);
            }
        }

        return this;
    },

    map_to_json : function() {
        obj = {
            'rows' : this._r,
            'cols' : this._c,
            'tile_width' : this._tw,
            'map' : ''
        }

        for(t in this._tiles) {
            if(this._tiles[t].isSpriteActive("block")) {
                obj.map = obj.map + "B";
            } else if (this._tiles[t].isSpriteActive("player")) {
                obj.map = obj.map + "P";
            } else if (this._tiles[t].isSpriteActive("star")) {
                obj.map = obj.map + "S";
            }
        }

        return obj;
    }
});
