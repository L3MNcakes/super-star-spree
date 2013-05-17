Crafty.c("Game_BlockTile", {
    init : function() {
        this.addComponent("Game_BaseTile,platform,Solid,Explodable");
        this._tile = gameContainer.conf.get("tiles").block;
    }
});
