Crafty.c("Explodable", {
    _explode_size : 4,

    init : function() {
        this.addComponent("Collision,BetterGravity");

        this.onHit("Game_Bullet", function(e) {
            spr = this._tile.sprite[this._sprite_position];    

            for(i in e) {
                obj = e[i].obj;
                if(obj) obj.destroy();
            }

            for(i=0;i<this._explode_size;i++) {
                for(j=0;j<this._explode_size;j++) {
                    Crafty.e("Explodable_Piece,"+spr)
                        .crop(
                            j * (32 / this._explode_size),
                            i * (32 / this._explode_size),
                            32 / this._explode_size,
                            32 / this._explode_size
                        )
                        .attr({
                            x : this.x + (32 / this._explode_size) * j,
                            y : this.y + (32 / this._explode_size) * i,
                            w : 32 / this._explode_size,
                            h : 32 / this._explode_size,
                            z : 100
                        });
                }
            }

            this.destroy();
        });
    }
});
