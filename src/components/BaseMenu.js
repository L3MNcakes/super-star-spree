Crafty.c("BaseMenu", {
    _rect : null,
    _text_size : null,
    _text_family : null,


    init : function() {
        this.addComponent("2D,DOM,Mouse,Keyboard");
        this._opts = [];
    },

    menu : function(settings) {
        this._rect = Crafty.e("2D,DOM,Color")
            .attr({
                x : this.x,
                y : this.y,
                w : this.w,
                h : this.h,
                z : this.z || 10
            })
            .color(settings.color)
            .css({
                'border' : settings.border,
                'border-radius' : settings.border_radius
            });

        this._text_color = settings.text_color;
        this._text_size = settings.size;
        this._text_family = settings.family;
        this._selected_color = settings.select_color;

        this.bind("KeyDown", function(e) {
            if(e.key == Crafty.keys["ESC"]) {
                this.destroy();
            }
        });

        this.bind("Change", function() {
            this._rect.attr({
                x : this.x,
                y : this.y,
                w : this.w,
                h : this.h,
                z : this.z || 10
            });
        });

        this.bind("Remove", function() {
            this._rect.destroy();
            for(t in this._opts) {
                this._opts[t].text.destroy();
            }
        });

        return this;
    },

    addOption : function(option) {
        var t = Crafty.e("2D,DOM,Text,Mouse")
            .attr({
                x : this.x + this._text_size / 2,
                y : this.y + (this._text_size * (this._opts.length + 1)),
                w : this.w,
                h : this.h,
                z : 11
            })
            .text(option.label)
            .textColor(this._text_color)
            .textFont({
                'size' : this._text_size + 'px',
                'family' : this._text_family
            });

        var select_color = this._selected_color;
        var t_color = this._text_color;

        t.bind("MouseOver", function() {
            this
                .textColor(select_color)
                .css({
                    'cursor' : 'pointer'
                });
        });

        t.bind("MouseOut", function() {
            this.textColor(t_color);
        });

        switch(option.type) {
            case 'scene':

                t.bind("MouseDown", function(e) {
                    if(e.mouseButton == Crafty.mouseButtons.LEFT) {
                        Crafty.scene(option.action);
                    }
                });

                break;
            case 'event':

                t.bind("MouseDown", function(e) {
                    if(e.mouseButton == Crafty.mouseButtons.LEFT) {
                        data = option.data || {};
                        Crafty.trigger(option.action, data);
                    }
                });

                break;
        }

        opt = {
            'type' : option.type,
            'action' : option.action,
            'text' : t
        };


        this._opts.push(opt);

        this.trigger("Change");

        return this;
    },

    select_color : function(col) {
        this._selected_color = col;
    }

});
