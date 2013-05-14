Crafty.c("Game_StarTile", {
    init : function() {
        this.addComponent("Game_BaseTile,tile_star,Collision,Collectable");
        this.z = 5;

        this.onHit("Game_Actor", function(e) {
            e.obj.
            this.destroy();
        });
    }
});
