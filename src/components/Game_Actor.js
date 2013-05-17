Crafty.c("Game_Actor", {
    _stars : 0,
    _anim : ["walk_f1", "walk_f2","walk_f3", "walk_f4","walk_f5", "walk_f6"],
           // "walk_f7", "walk_f8","walk_f9", "walk_f10","walk_f11", "walk_f12"],

    init : function() {
        this.addComponent("Game_BaseTile,Twoway,BetterGravity,Collision");
        this._tile = gameContainer.conf.get("tiles").player;
        this._speed = 3;
        this._jump_speed = 6.5;
        this.twoway(this._speed, this._jump_speed);
        this.collision();
        this.gravity("platform");
        
        this.bind("Moved", function(from) {
            if(this.hit("Solid")) {
                this.attr({
                    x : from.x,
                    y : from.y
                });
            }

            if(this._sprite_position && (this.x % 2)) {
                ind = this._anim.indexOf(this._sprite_position);

                if(ind == this._anim.length - 1) {
                    ind = 0;
                } else {
                    ind += 1;
                }

                this.setPos(this._anim[ind]);
            }
        });

        this.bind("NewDirection", function(dir) {
            if(dir.x < 0) {
                this.flip();
            } else if(dir.x > 0) {
                this.unflip();
            }
        });

    },

    collectStar : function() {
        this._stars += 1;
    }
});
