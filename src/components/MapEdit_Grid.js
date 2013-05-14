Crafty.c("MapEdit_Grid", {
    _c : 0,
    _r : 0,
    _tw : gameContainer.conf.get("tile_width"),
    _mode : "empty",
    _menu : null,
    _maps : {
        'first' : {
            'file' : 'src/maps/first.js'
        }
    },

    init : function() {
        this.addComponent("2D, Canvas, Mouse, Keyboard");

        this._tiles = [];

        this.bind("MapEditMenu_Save", function() {
            this._menu.remove();
            this._menu = null;

            this._mapSave = new MapEditSave();
            this._mapSave.fill(this.map_to_json());
        });

        this.bind("MapEditSave_Close", function() {
            this._mode = "block";
            Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
        });

        this.bind("MapEditMenu_Load", function() {
            if(this._menu) {
                this._menu.remove();
            }
            this._menu = null;

            this._mapLoad = new MapEditLoad();
            this._mapLoad.maps(this._maps);
        });

        this.bind("MapEditLoad_Load", function(e) {
            this._mapLoad.remove();
            this._r = e.rows;
            this._c = e.cols;

            Crafty("MapEdit_BaseTile").destroy();

            this._tiles = [];

            for(i=0;i<this._r;i++) {
                for(j=0;j<this._c;j++){
                    tile = Crafty.e("MapEdit_BaseTile")
                    .attr({
                        x : j * this._tw,
                        y : i * this._tw,
                        w : this._tw,
                        h : this._tw
                    });

                    ind = (this._r * i) + j;

                    switch(e.map[ind]) {
                        case 'B':
                            tile.setActive('block');
                            break;
                        case 'P':
                            tile.setActive('player');
                            break;
                        case 'S':
                            tile.setActive('star');
                            break;
                    }

                    this._tiles.push(tile);
                }
            }

            this._mode = "block";
            Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
        });

        this.bind("MapEditMenu_Test", function() {
            gameContainer.map = this.map_to_json(false);
            Crafty.scene('Game');
        });

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
                case Crafty.keys["M"]:
                    if(this._menu !== null) {
                        this._menu.remove();
                        this._menu = null;
                        this._mode = "block";
                        Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
                    } else {
                        this._menu = new MapEditMenu();
                        this._mode = "empty";
                        Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
                    }
                    break;
                case Crafty.keys["L"]:
                    Crafty.trigger("MapEditMenu_Load");
                    break;
                case Crafty.keys["T"]:
                    Crafty.trigger("MapEditMenu_Test");
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
                    });

                this._tiles.push(tile);
            }
        }

        return this;
    },

    map_to_json : function(asString) {
        if(asString === undefined) {
            asString = true;
        }

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
            } else {
                obj.map = obj.map + "#";
            }
        }

        return asString ? JSON.stringify(obj) : obj;
    }
});
