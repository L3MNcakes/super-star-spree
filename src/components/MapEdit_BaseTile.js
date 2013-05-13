Crafty.c("MapEdit_BaseTile", {
    _plop_element : null,

    _offset : 0,

    _elements : {
        'block' : {
            'sprite' : 'mapedit_block',
            'z' : 3,
            'offset' : 0,
            'single' : false
        },
        'player' : {
            'sprite' : 'mapedit_player',
            'z' : 5,
            'offset' : 16,
            'single' : true
        },
        'star' : {
            'sprite' : 'mapedit_star',
            'z' : 4,
            'offset' : 16,
            'single' : false 
        },
        'empty' : {
        }
    },

    init : function() {
        this.addComponent("2D, Canvas, Mouse");

        this._sprites = [];
        for(e in this._elements) {
            this._sprites[e] = [];
        }

        this._plop_element = gameContainer.conf.get('MapEdit_default_plop');

        var entity = this;

        entity.bind("Remove", function() {
            for(elem in this._sprites) {
                states = this._sprites[elem];
                for(state in states) {
                    this._sprites[elem][state].destroy();
                }
            }
        });

        entity.bind("MouseOver", function() {
            if(!this.isSpriteActive(this._plop_element)) {
                this._pushSprite(this._plop_element,0.5,"hover");
            }
        });

        entity.bind("MouseOut", function() {
            if(!this.isSpriteActive(this._plop_element)) {
                this._popSprite(this._plop_element,"hover");
            }
        });

        entity.bind("MouseDown", function(e) {
            if(e.mouseButton == Crafty.mouseButtons.LEFT) {
                if(this.isSpriteActive(this._plop_element)) {
                    this._popSprite(this._plop_element,"active");
                } else {
                    this._pushSprite(this._plop_element,1,"active");
                    this._popSprite(this._plop_element,"hover");
                    if(this._elements[this._plop_element].single) {
                        Crafty.trigger("SinglePlop", {tile : this, element : this._plop_element});
                    }
                }
            }
        });

        entity.bind("Grid_ModeChange", function(e) {
            if(e.mode in this._elements) {
                this._elem(e.mode);
            }

            for(elem in this._elements) {
                this._popSprite(elem,"hover");
            }
        });

        for(elem in this._elements) {
            if(this._elements[elem].single) {
                entity.bind("SinglePlop", function(e) {
                    if(e.tile != this) {
                        this._popSprite(e.element, "active"); 
                    }
                });
            }
        }
    },

    _elem : function(elem) {
        if(elem in this._elements) {
            this._plop_element = elem;

            offset = this._elements[elem].offset || 0;

            this.attr({
                y : this.y + offset - this._offset
            });

            this._offset = offset;
        }
    },

    getElement : function(elem) {
        if(elem in this._elements) {
            return this._elements[elem];
        } else {
            return false;
        }
    },

    isSpriteActive : function(elem) {
        if("active" in this._sprites[elem]) {
            return this._sprites[elem]["active"].visible;
        }

        return false;
    },

    setActive : function(elem) {
        this._elem(elem);
        this._pushSprite(elem,1,"active");
    },

    _pushSprite : function(elem,alpha,state) {
        element = this.getElement(elem)

        if(element) {
            if(!(state in this._sprites[elem])) {
                sprite = Crafty.e("2D,Canvas,Sprite,"+element.sprite)
                    .attr({
                        x : this.x,
                        y : this.y,
                        w : this.w,
                        h : this.h,
                        z : element.z,
                        alpha: alpha
                    });

                this._sprites[elem][state] = sprite;
            } else {
                this._sprites[elem][state].visible = true;
            }
        }
    },

    _popSprite : function(elem,state) {
        if(state in this._sprites[elem]) {
            this._sprites[elem][state].visible = false;
        }
    }
});
