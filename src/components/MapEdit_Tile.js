Crafty.c("MapEdit_Tile", {
    _state : "empty",

    init : function() {
        this.addComponent("2D, Canvas, Mouse");
    },

    Tile : function(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = w;

        this._activate();

        var entity = this;

        entity.bind("Grid_ModeChange", function(e) {
            if(e.mode == "block") this._activate();
            else this._deactivate();
        });

        return this;
    },

    _activate : function() {
        var entity = this;

        entity.bind("MouseOver", function() {
            if(this._state == "empty") {
                this._image = Crafty.e("2D, Canvas, Image")
                    .attr({
                        x : this.x,
                        y : this.y,
                        w : this.w,
                        h : this.h
                    })
                    .image("web/images/block.png");
            }
        });

        entity.bind("MouseOut", function() {
            if(this._state == "empty") {
                this._image.destroy();
            }
        });

        entity.bind("MouseDown", function(e) {
            if(e.mouseButton == Crafty.mouseButtons.LEFT) {
                if(this._state == "set") this._state = "empty";
                else if(this._state == "empty") this._state = "set";
            }
        });
    },

    _deactivate : function() {
        var entity = this;

        entity.unbind("MouseOver");
        entity.unbind("MouseOut");
        entity.unbind("MouseDown");
    }
});
