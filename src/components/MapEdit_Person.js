Crafty.c("MapEdit_Person", {
    _state : "empty",

    init : function() {
        this.addComponent("2D, Canvas, Mouse");
    },

    Person : function(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = w;

        var entity = this;

        entity.bind("Grid_ModeChange", function(e) {
            if(e.mode == "person") this._activate();
            else this._deactivate();
        });

    },

    _activate : function() { 
        var entity = this;
        
        entity.bind("MouseOver", function() {
            if(this._state = "empty") {
                this._image = Crafty.e("2D,Canvas,Image")
                    .attr({
                        x : this.x,
                        y : this.y,
                        w : this.w,
                        h : this.h
                    })
                    .image("web/images/p1.png");
            }
        });

        entity.bind("MouseOut", function() {
            if(this._state == "empty") {
                this._image.destroy();
            }
        });

        entity.bind("MouseDown", function(e) {
            if(e.mouseButton == Crafty.mouseButtons.LEFT) {
                if(this._state == "set") {
                    this._state == "empty";
                } else if (this._state == "empty") {
                    Crafty.trigger("MapEditPerson_StateSet");
                    this._image = Crafty.e("2D,Canvas,Image")
                        .attr({
                            x : this.x,
                            y : this.y,
                            w : this.w,
                            h : this.h
                        })
                        .image("web/images/p1.png");

                    this._state = "set";
                }
            }
        });

        entity.bind("MapEditPerson_StateSet", function() {
            if(this._state == "set") {
                this._image.destroy();
                this._state == "empty";
            }
        });
    },

    _deactivate : function() {
        var entity = this;

        entity.unbind("MouseOver");
        entity.unbind("MouseOut");
        entity.unbind("MouseDown");
        entity.unbind("MapEditPerson_StateSet");
    }
});
