Crafty.c("Game_BlockTile", {
    init : function() {
        this.addComponent("Game_BaseTile,tile_block,Collision,platform,Solid");
        this.z = 3;
        this.collision();
    }
});
