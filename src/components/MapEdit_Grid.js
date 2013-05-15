Crafty.c("MapEdit_Grid", {
    _c : 0,
    _r : 0,
    _tw : gameContainer.conf.get("tile_width"),
    _mode : "block",
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

            Crafty.storage.open("SuperStarSpree");

            var map_obj = this.map_to_json(false);

            Crafty.storage.load("Maps","save",function(data) {
                maps = data || [];

                save_obj = {
                    'label' : 'map_' + maps.length + 1,
                    'map' : map_obj
                };

                maps.push(save_obj);

                Crafty.storage.save("Maps","save",maps);
            });

            this._mode = "block";
            Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
        });

        this.bind("MapEditMenu_Load", function() {
            if(this._menu) {
                this._menu.remove();
            }
            this._menu = null;

            var maps = null;
            var entity= this;

            Crafty.storage.open("SuperStarSpree");

            Crafty.storage.load("Maps","save",function(data) {
                maps = data;

                entity._mapLoad = new MapEditLoad();
                entity._mapLoad.maps(maps);
            });

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

                    tile.setActive(e.map[ind].s, e.map[ind].sp);

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

        this.bind("MapEditSpriteTile_Selected", function() {
            this._menu.remove();
            this._menu = null;
            this._activate();
        });

        this._activate();

        return this;
    },

    _activate : function() {
        this.bind("KeyDown", function(e) {
            switch(e.key) {
                case Crafty.keys["P"]:
                    if(this._mode != "player") { 
                        this._mode = "player";
                        Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
                    } else {
                        
                    }
                    break;
                case Crafty.keys["S"]:
                    this._mode = "star";
                    Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
                    break;
                case Crafty.keys["B"]:
                    if(this._mode != "block") {
                        this._mode = "block";
                        Crafty.trigger("Grid_ModeChange", {'mode' : this._mode});
                    } else {
                        if(this._menu) this._menu.remove();
                        Crafty.trigger("MapEditGrid_DeactivateTiles");
                        this._menu = new MapEditSpriteSelect(this._tiles[0].getElement('block'));
                        this._deactivate();
                    }
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
    },

    _deactivate : function() {
        this.unbind("KeyDown");
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
            'map' : []
        }

        for(t in this._tiles) {
            map_obj = {
                's' : this._tiles[t].getActiveSprite() || "empty",
                'sp' : this._tiles[t].getActiveSpritePosition() || "center_center"
            };
            
            obj.map.push(map_obj);
        }

        return asString ? JSON.stringify(obj) : obj;
    }
});
