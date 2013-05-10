Crafty.c("Rectangle", {
    init : function() {
        this.addComponent("2D, Canvas, Color");
    },

    rect : function(x, y, w, h, col) {
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 200;
        this.h = h || 200;
        this.color(col);

        this.attr({
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h
        });

        var entity =  this;

        this.trigger("Change");
        return entity;
    },

    draw : function(ctx, pos) {
        ctx.fillStyle = this._color;
        ctx.fillRect(pos._x, pos._y, pos._w, pos._h);
    }
});
