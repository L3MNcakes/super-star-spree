Crafty.c("Game_Grid", {
    _r : 0,
    _c : 0,
    _tw : gameContainer.conf.get("tile_width"),
    _tile_class : {
        'block' : 'Game_BlockTile',
        'player' : 'Game_Actor',
        'star' : 'Game_StarTile'
    },

    init : function() {
        this.addComponent("2D,Canvas,Mouse,Keyboard");

        this.bind("MouseDown", function(e) {
            if(e.mouseButton == Crafty.mouseButtons.LEFT) {
                sx = Crafty("Game_Actor").x + (Crafty("Game_Actor").w / 2);
                sy = Crafty("Game_Actor").y + (Crafty("Game_Actor").h / 2);

                Crafty.e("Game_Bullet")
                    .go_to(sx, sy, Crafty.mousePos.x, Crafty.mousePos.y, 5);
            }
        });
    },

    loadMap : function(map) {
        map = map || gameContainer['map'];

        this._r = map.rows;
        this._c = map.cols;

        for(i=0;i<this._r;i++) {
            for(j=0;j<this._c;j++) {
                ind = (this._r * i) + j;
                tc = this._tile_class[map.map[ind].s];

                if(tc) {
                    tile = new Crafty.e(tc)
                        .attr({
                            x : j * this._tw,
                            y : i * this._tw,
                            w : this._tw,
                            h : this._tw
                        })
                        .setPos(map.map[ind].sp);
                }
            }
        }

        /**
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

                Crafty.e("2D,Canvas")
                    .attr({
                        x : 0,
                        y : Crafty.viewport.width,
                        w : Crafty.viewport.width,
                        h : 1
                    })
            }
        }
        **/
    },
});
