Crafty.c("MapEdit_BaseTile", {
    _plop_element : null,
    _sprite_pos : null,
    _active_sprite_pos : null,
    _active_sprite : null,

    _offset : 0,

    _elements : {
        'block' : {
            'sprite' : {
                'top_left' : 'tile_block_TL',
                'top_center' : 'tile_block_TC',
                'top_right' : 'tile_block_TR',
                'center_left' : 'tile_block_CL',
                'center_center' : 'tile_block_CC',
                'center_right' : 'tile_block_CR',
                'center_left' : 'tile_block_CL',
                'bottom_left' : 'tile_block_BL',
                'bottom_center' : 'tile_block_BC',
                'bottom_right' : 'tile_block_BR'
            },
            'z' : 3,
            'offset' : 0,
            'single' : false
        },
        'player' : {
            'sprite' : {
                'center_center' : 'tile_player'
            },
            'z' : 5,
            'offset' : 0,
            'single' : true
        },
        'star' : {
            'sprite' : {
                'center_center' : 'tile_star'
            },
            'z' : 4,
            'offset' : 0,
            'single' : false 
        },
        'empty' : {
            'sprite' : {
                'center_ceter' : ''
            }
        }
    },

    init : function() {
        this.addComponent("2D, Canvas, Mouse");

        this._sprites = [];
        for(e in this._elements) {
            this._sprites[e] = [];
        }

        this._plop_element = gameContainer.conf.get('MapEdit_default_plop');
        this._sprite_pos = "center_center";

        var entity = this;

        entity.bind("Remove", function() {
            for(elem in this._sprites) {
                states = this._sprites[elem];
                for(state in states) {
                    if(this._sprites[elem][state]) {
                        this._sprites[elem][state].destroy();
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

        entity.bind("MapEditSpriteTile_Selected", function(e) {
            this._sprite_pos = e.sprite_position;
            this._activate();
        });

        entity.bind("MapEditGrid_DeactivateTiles", function() {
            this._deactivate();
        });

        entity.bind("MapEditGrid_ActivateTiles", function() {
            this._activate();
        });

        entity.bind("MapEditMenu_Clear", function() {
            for(e in this._elements) {
                this._popSprite(e, "active");
                this._popSprite(e, "hover");
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

        this._activate();
    },

    _activate : function() {
        var entity = this;

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
                    this._active_sprite = this._plop_element;
                    this._active_sprite_pos = this._sprite_pos;
                    if(this._elements[this._plop_element].single) {
                        Crafty.trigger("SinglePlop", {tile : this, element : this._plop_element});
                    }
                }
            }
        });
    },

    _deactivate : function() {
        for(elem in this._elements) {
            this._popSprite(elem,"hover");
        }
        this.unbind("MouseOver");
        this.unbind("MouseOut");
        this.unbind("MouseDown");
    },

    _elem : function(elem,pos) {
        pos = pos || this._sprite_pos || "center_center";

        if(elem in this._elements) {
            sp = this._elements[elem].sprite || [];
            if(pos in sp) {
                this._sprite_pos = pos;
            } else {
                this._sprite_pos = "center_center";
            };

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
        return this._sprites[elem]["active"];
    },

    getActiveSprite : function() {
        return this._active_sprite;
    },

    getActiveSpritePosition : function() {
        return this._active_sprite_pos;
    },

    setActive : function(elem,pos) {
        this._elem(elem,pos);
        this._active_sprite = elem;
        this._pushSprite(elem,1,"active");
    },

    _pushSprite : function(elem,alpha,state) {
        if(element=this._elements[elem]) {
                sp = element.sprite[this._sprite_pos];

                sprite = Crafty.e("2D,Canvas,Sprite,"+sp)
                    .attr({
                        x : this.x,
                        y : this.y,
                        w : this.w,
                        h : this.h,
                        z : element.z || 0,
                        alpha: alpha
                    });

                this._sprites[elem][state] = sprite;
        }
    },

    _popSprite : function(elem,state) {
        if(state in this._sprites[elem]) {
            if(this._sprites[elem][state]) {
                this._sprites[elem][state].destroy();
                this._sprites[elem][state] = null;
            }
        }
    }
});
