Crafty.c("MapEdit_SpriteGrid", {
    _rect : null,

    init : function() {
        this.addComponent("2D,Canvas,Mouse");

        this._tiles = [];


        this.bind("MapEditSpriteTile_Selected",function(e) {
            for(t in this._tiles) {
                this._tiles[t].destroy();
            }

            if(this._rect) this._rect.destroy();
        });
    },

    tileset : function(ts) {

        tw = 32;

        pw = tw * 3;
        ph = tw * Math.ceil(Object.keys(ts.sprite).length / 3);

        this._rect = Crafty.e("2D,Canvas")
            .attr({
                x : (Crafty.viewport.width / 2) - (pw / 2),
                y : (Crafty.viewport.height / 2) - (pw / 2),
                /**
                x : Crafty.mousePos.x,
                y : Crafty.mousePos.y,
                **/
                w : pw,
                h : ph,
                z : 10
            });

        i = 0;

        for(s in ts.sprite) {
            px = this._rect.x + (tw * (i % 3));
            py = this._rect.y + (tw * Math.floor(i / 3));

            t = Crafty.e("MapEdit_SpriteTile,"+ts.sprite[s])
                .attr({
                    x : px,
                    y : py,
                    w : tw,
                    h : tw,
                    z : this.z
                })
                .sprite_position(s);

            this._tiles.push(t);

            i++;
        }


         return this;
    },
});
