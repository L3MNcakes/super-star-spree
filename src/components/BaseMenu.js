Crafty.c("BaseMenu", {
    _rect : null,
    _text_size : null,
    _text_family : null,


    init : function() {
        this.addComponent("2D,DOM,Mouse");
        this._opts = [];

    },

    menu : function(settings) {
        this._rect = Crafty.e("2D,DOM,Color")
            .attr({
                x : this.x,
                y : this.y,
                w : this.w,
                h : this.h,
                z : 10
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

        switch(option.type) {
            case 'scene':
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

                t.bind("MouseDown", function(e) {
                    if(e.mouseButton == Crafty.mouseButtons.LEFT) {
                        Crafty.scene(option.action);
                    }
                });

                break;
            case 'event':
                break;
        }

        opt = {
            'type' : option.type,
            'action' : option.action,
            'text' : t
        };


        this._opts.push(opt);

        return this;
    }

});
