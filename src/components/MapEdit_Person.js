Crafty.c("MapEdit_Person", {
    _state : "empty",
    _image : null,

    init : function() {
        this.addComponent("2D, Canvas, Mouse");
    },

    Person : function(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = w;
        this.z = 0;

        var entity = this;

        entity.bind("Grid_ModeChange", function(e) {
            if(e.mode == "person") this._activate();
            else this._deactivate();
        });

        return this;

    },

    getImage : function() {
        return this._image;
    },

    destroyImage : function() {
        if(this._image !== null) {
            this._image.destroy();
            this._state = "empty";
        }
    },

    _activate : function() { 
        this.z = 9;
        this.attr({z : 9});

        var entity = this;
        
        entity.bind("MouseOver", function() {
            if(this._state = "empty") {
                this._image = Crafty.e("2D,Canvas,Image")
                    .attr({
                        x : this.x,
                        y : this.y,
                        w : this.w,
                        h : this.h,
                        z : this.z
                    })
                    .image("web/images/p1.png");
            }
        });

        entity.bind("MouseOut", function() {
            if(this._state == "empty" && this._image !== null) {
                this._image.destroy();
            }
        });

        entity.bind("MouseDown", function(e) {
            if(e.mouseButton == Crafty.mouseButtons.LEFT) {
                if(this._state == "set") {
                    this._state = "empty";
                } else if (this._state == "empty") {
                    this._state = "set";
                    Crafty.trigger("MapEditPerson_StateSet", {'tile' : this});
                }
            }
        });

        entity.bind("MapEditPerson_StateSet", function(e) {
            if(this != e.tile && this._image !== null) {
                this.destroyImage();
            }
        });
    },

    _deactivate : function() {
        this.z = 0;
        this.attr({z : 0});
        
        if(this._state == "empty" && this._image !== null) {
            this.destroyImage();
        }

        var entity = this;

        entity.unbind("MouseOver");
        entity.unbind("MouseOut");
        entity.unbind("MouseDown");
    }
});
