Crafty.c("Game_StarTile", {
    init : function() {
        this.addComponent("Game_BaseTile,Collision,Collectable");

        this._tile = gameContainer.conf.get("tiles").star;

        this.onHit("Game_Actor", function(e) {
            this.destroy();
        });
    }
});
