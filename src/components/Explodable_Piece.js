Crafty.c("Explodable_Piece", {
    _up : false,
    _speed : 0,

    init : function() {
        this.addComponent("2D,Canvas,Sprite,BetterGravity,Collision,Delay");

        this._speed = Crafty.math.randomNumber(6, 10); 
        this._xdir = Crafty.math.randomNumber(-6, 6);

        var entity = this;
        entity.gravity("platform");

        this._falling = false;
        this._up = true;

        entity.bind("EnterFrame", function() {
            if(this._up) {
                this.y -= this._speed;
                this.x += this._xdir;
                this._falling = true;
            }
        });

        this.delay(function() {
            this.destroy();
        }, 3000)
    }
});
