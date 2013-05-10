Crafty.c("Rectangle", {
    init : function() {
        this.addComponent("2D, Canvas, Color");

        this.bind("Draw", function(obj) {
            this._draw(obj.ctx, obj.pos);
        });

        this.bind("Remove", function() {
            this.unbind("Draw");
        });
    },

    rect : function(x, y, w, h, col, bor_w, bor_col) {
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 200;
        this.h = h || 200;
        this.color(col);
        this.border_width = bor_w;
        this.border_color = bor_col;

        this.attr({
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h
        });
    },

    _draw : function(ctx, pos) {
        ctx.fillStyle = this._color;
        ctx.fillRect(pos._x, pos._y, pos._w, pos._h);

        ctx.lineWidth = this.border_width;
        ctx.strokeStyle = this.border_color;
        ctx.beginPath();
        ctx.moveTo(pos._x, pos._y);
        ctx.lineTo(pos._x + pos._w, pos._y);
        ctx.lineTo(pos._x + pos._w, pos._y + pos._h);
        ctx.lineTo(pos._x, pos._y + pos._h);
        ctx.closePath();
        ctx.stroke();
    }
});
