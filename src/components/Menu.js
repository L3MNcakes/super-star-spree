Crafty.c("Menu", {
    init : function() {
        this._opts = [];
        this._rect = null;
        this._text = [];
    },

    newMenu : function(options, selected, x, y, w, color) {
        this._opts = options;
        this._selec = selected;
        this._color = color;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = (this._opts.length * 28) + 56;


        this.attr({
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h
        });

        var entity = this;

        this.trigger("Change");

    },

    draw : function() {
        this._rect = Crafty.e("Rectangle")
            .rect(this.x, this.y, this.w, this.h, this._color)
            .draw();
        
        for(i=0;i<this._opts.length;i++) {
            t_col = (this._opts[i] == this._selec) ? "#00FFFF" : "#FFFFFF";

            t = Crafty.e("2D, DOM, Text")
                    .attr({
                        x : this.x + 24,
                        y : this.y + (24 * (i + 1)),
                        w : this.w,
                        h : this.h
                    })
                    .text(this._opts[i])
                    .textColor(t_col)
                    .textFont({"size" : "24px"})
                    .css({'font-size' : '10px'});

            this._text.push(t);
        }
    }
});
