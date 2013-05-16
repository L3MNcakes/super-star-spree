Crafty.c("MapEdit_SpriteGrid", {
    // _rect : null,

    init : function() {
        this.addComponent("2D,Canvas,Mouse,Keyboard");

        this._tiles = [];

        this.bind("Remove", function() {
            for(t in this._tiles) {
                this._tiles[t].destroy();
            }
        });

        this.bind("KeyDown", function(e) {
            if(e.key == Crafty.keys["ESC"]) {
                Crafty.trigger("MapEditGrid_Activate");
                this.destroy();
            }
        });

        return this;
    },

    tileset : function(ts) {

        tw = 32;

        pw = tw * 3;
        ph = tw * Math.ceil(Object.keys(ts.sprite).length / 3);

        /**
        this._rect = Crafty.e("2D,DOM")
            .attr({
                /**
                x : (Crafty.viewport.width / 2) - (pw / 2),
                y : (Crafty.viewport.height / 2) - (pw / 2),
                x : mousePos.x,
                y : mousePos.y,
                w : pw,
                h : ph,
                z : 10
            });
            **/

        i = 0;

        x = Math.floor(Crafty.mousePos.x);
        y = Math.floor(Crafty.mousePos.y);

        for(s in ts.sprite) {
            px = x + (tw * (i % 3));
            py = y + (tw * Math.floor(i / 3));

            t = Crafty.e("MapEdit_SpriteTile,"+ts.sprite[s])
                .attr({
                    x : px - 1,
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
