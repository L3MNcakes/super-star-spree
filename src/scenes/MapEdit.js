Crafty.scene("MapEdit", function() {
    
    Crafty.background("url('web/images/bg.png')");

    var elements = [
        "src/components/MapEdit_Grid.js",
        "src/components/MapEdit_BaseTile.js",
        "src/components/MapEdit_SpriteGrid.js",
        "src/components/MapEdit_SpriteTile.js",
        "src/interfaces/MapEditMenu.js",
        "src/interfaces/MapEditSave.js",
        "src/interfaces/MapEditLoad.js",
        "src/interfaces/MapEditSpriteSelect.js"
    ];

    require(elements, function() {
        sc["mapedit_grid"] = Crafty.e("MapEdit_Grid")
            .attr({
                x : 0,
                y : 0,
                w : Crafty.viewport.width,
                h : Crafty.viewport.height
            })
            .grid(32,32);
    });
});
