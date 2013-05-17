Crafty.c("Game_BaseTile", {
    init : function() {
        this.addComponent("2D,Canvas,Sprite,Collision,Keyboard,Mouse");
        this.collision();
    },
    
    setPos : function(sp) {
        if(this._tile) {
            this.attr({
                z : this._tile.z
            });

            if(this._sprite_position) {
                this.removeComponent(this._tile.sprite[this._sprite_position]);
            }

            this._sprite_position = sp;
            this.addComponent(this._tile.sprite[this._sprite_position]);
        }
    }
});
