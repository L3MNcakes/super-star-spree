Crafty.c("Game_Bullet", {
    _dest : null,
    _start : null,
    _moving : false,
    _direction : null,

    init : function() {
        this.addComponent("2D,DOM,Color,Collision");

        this.collision();
        
        this.color("#FF0000");

        this.bind("EnterFrame",function() {
            dx = this.x + this._delta.x * this._speed;
            dy = this.y + this._delta.y * this._speed;

            if((dx > Crafty.viewport.width || dx < 0) && (dy > Crafty.viewport.height && dy < 0)) {
                this.destroy();
            } else {
                this.attr({
                    x : dx,
                    y : dy
                });
            }

        });
    },

    go_to : function(sx,sy,dx,dy,s) {
        this._start = new Crafty.math.Vector2D(sx,sy);
        this._dest = new Crafty.math.Vector2D(dx,dy);

        this._direction = this._dest.subtract(this._start); 
        this._delta = this._direction.normalize(); 
        this._speed = s;

        this.attr({
            x : sx,
            y : sy,
            w : 10,
            h : 5,
            z : 5,
            rotation : this._angle
        })
        .css({
            'border-radius' : '10px'
        });
    }
});
