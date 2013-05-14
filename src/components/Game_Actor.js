Crafty.c("Game_Actor", {
    _stars : 0,

    init : function() {
        this.addComponent("Game_BaseTile,tile_player,Keyboard,Twoway,BetterGravity,Collision");
        this.z = 4;
        this._speed = 3;
        this._jump_speed = 5;
        this.twoway(this._speed, this._jump_speed);
        
        this.bind("Moved", function(from) {
            if(this.hit("Solid")) {
                this.attr({
                    x : from.x,
                    y : from.y
                });
            }
        });

        this.bind("NewDirection", function(dir) {
            if(dir.x < 0) {
                this.flip();
            } else if(dir.x > 0) {
                this.unflip();
            }
        });

        this.gravity("platform");
    },

    collectStar : function() {
        this._stars += 1;
    }
});
