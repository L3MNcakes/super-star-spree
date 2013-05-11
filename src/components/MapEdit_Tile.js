Crafty.c("MapEdit_Tile", {
    _state : "empty",

    _type : null,
    _type_map : {
        "block" : "mapedit_block",
        "player" : "mapedit_player",
        "star" : "mapedit_star"
    },
    
    init : function() {
        this.addComponent("2D,Canvas,Mouse,Sprite");
        
        return this;
    },

    type : function(key) {
        if(this._type !== null) {
            this.removeComponent(this.getTypeSprite(this._type));
        }

        if(typeof this._type_map[key] !== undefined) {
            this._type = key;
            this.addComponent(this.getTypeSprite(key));
        }

        return this;
    },

    setAlpha : function() {
        a = 0;

        switch(this._state) {
            case "empty":
            default:
                a = 0.0;
                break;
            case "hover":
                a = 0.5;
                break;
            case "set":
                a = 1.0;
                break;
        }

        this.attr({alpha : a});
        this.trigger("Change");
        
        return this;
    },

    getTypeSprite : function(key) {
        if(typeof key == undefined && this._type !== null) {
            key = this._type;
        }

        if(typeof this._type_map[key] !== undefined) {
            return this._type_map[key];
        } else {
            return false;
        }
    },

    activate : function() {
        this.z = 5;

        var entity = this;

        entity.bind("MouseOver", function() {
            if(this._state == "empty") {
                this._state = "hover";
                this.trigger("MapEditTile_StateChange");
            }
        });

        entity.bind("MouseOut", function() {
            if(this._state == "hover") {
                this._state = "empty";
                this.trigger("MapEditTile_StateChange");
            }
        });

        entity.bind("MouseDown", function(e) {
            if(e.mouseButton == Crafty.mouseButtons.LEFT) {
                if(this._state == "hover") {
                    this._state = "set";
                } else if (this._state == "set") {
                    this._state = "hover";
                }
                this.trigger("MapEditTile_StateChange");
            }
        });

        entity.bind("MapEditTile_StateChange", function() {
            this.setAlpha();
        });
    },

    deactivate : function() {
        this.z = 0;

        var entity = this;

        entity.unbind("MouseOver");
        entity.unbind("MouseOut");
        entity.unbind("MouseDown");
        entity.unbind("MapEditTile_StateChange");
    }
});
