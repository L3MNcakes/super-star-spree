Crafty.scene("Game", function() {
    Crafty.background("url('web/images/bg.png')");

    var elements = [
        "src/components/Game_Grid.js",
        "src/components/Game_BaseTile.js",
        "src/components/Game_BlockTile.js",
        "src/components/Game_StarTile.js",
        "src/components/Game_Actor.js",
        "src/components/BetterGravity.js",
        "src/components/Game_Bullet"
    ];

    require(elements, function() {
        sc["Grid"] = Crafty.e("Game_Grid")
            .attr({
                x : 0,
                y : 0,
                w : Crafty.viewport.width,
                h : Crafty.viewport.height
            })
            .loadMap();
    });
});
