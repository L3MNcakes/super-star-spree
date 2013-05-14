Crafty.c("Game_Grid", {
    _r : 0,
    _c : 0,
    _tw : gameContainer.conf.get("tile_width"),

    init : function() {
        this.addComponent("2D,Canvas,Mouse,Keyboard");
    },

    loadMap : function(map) {
        map = map || gameContainer['map'];

        this._r = map.rows;
        this._c = map.cols;

        for(i=0;i<this._r;i++) {
            for(j=0;j<this._c;j++) {
                ind = (this._r * i) + j;
                switch(map.map[ind]) {
                    case 'B':
                        tile = Crafty.e("Game_BlockTile")
                            .attr({
                                x : j * this._tw,
                                y : i * this._tw,
                                w : this._tw,
                                h : this._tw
                            });

                        break;
                    case 'S':
                        tile = Crafty.e("Game_StarTile")
                            .attr({
                                x : j * this._tw,
                                y : i * this._tw + (this._tw / 4),
                                w : this._tw,
                                h : this._tw
                            });
                            break;
                    case 'P':
                        tile = Crafty.e("Game_Actor")
                            .attr({
                                x : j * this._tw,
                                y : i * this._tw
                            });
                            break;
                }

                Crafty.e("2D,Canvas,ground")
                    .attr({
                        x : 0,
                        y : Crafty.viewport.width,
                        w : Crafty.viewport.width,
                        h : 1
                    })
            }
        }
    },
});
