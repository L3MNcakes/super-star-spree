Crafty.c("Explodable", {
    _explode_size : 8,

    init : function() {
        this.addComponent("Collision");

        this.onHit("Game_Bullet", function() {
            spr = this._tile.sprite[this._sprite_position];    

            for(i=0;i<this._explode_size;i++) {
                for(j=0;j<this._explode_size;j++) {
                    entity = Crafty.c("2D,Canvas,Gravity,Sprite,"+spr)
                        .crop(
                            j * this._explode_size,
                            i * this._explode_size,
                            this._explode_size,
                            this._explode_size
                        )
                        .attr({
                            x : this.x + this._explode_size * j,
                            y : this.y + this._explode_size * i,
                            w : this._explode_size,
                            h : this._explode_size
                        })
                        .gravity('platform');

                    entity._falling = false;

                    entity.bind("EnterFrame", function() {
                    
                    });
                }
            }
        });
    }
});
