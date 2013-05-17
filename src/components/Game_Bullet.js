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
            dx = this._delta.x * this._speed;
            dy = this._delta.y * this._speed;

            if(dx > Crafty.viewport.width && dy > Crafty.viewport.height) {
                this.destroy();
            } else {
                this.attr({
                    x : this.x + dx,
                    y : this.y + dy
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
