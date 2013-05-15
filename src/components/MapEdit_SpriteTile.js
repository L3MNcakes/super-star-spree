Crafty.c("MapEdit_SpriteTile", {
    _sprite_pos : null,

    init : function() {
        this.addComponent("2D,Canvas,Sprite,Mouse");

        this.attr({
            alpha : 0.9
        });

        this.bind("MouseOver", function() {
            this.attr({
                alpha : 1
            });
        });

        this.bind("MouseOut", function() {
            this.attr({
                alpha : 0.9
            });
        });

        this.bind("MouseDown", function(e) {
            if(e.mouseButton == Crafty.mouseButtons.LEFT) {
                Crafty.trigger("MapEditSpriteTile_Selected", {
                    'sprite_position' : this._sprite_pos
                });
            }
        });

        return this;
    },
    
    sprite_position : function(pos) {
        this._sprite_pos = pos;
        return this;
    }
});
