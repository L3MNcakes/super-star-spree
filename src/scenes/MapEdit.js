Crafty.scene("MapEdit", function() {
    
    Crafty.background("url('web/images/bg.png')");

    var elements = [
        "src/components/MapEdit_Grid.js",
        "src/components/MapEdit_BaseTile.js",
        "src/interfaces/MapEditMenu.js"
    ];

    require(elements, function() {
        sc["mapedit_grid"] = Crafty.e("MapEdit_Grid")
            .attr({
                x : 0,
                y : 0,
                w : Crafty.viewport.width,
                h : Crafty.viewport.height
            })
            .grid(16,16);
    });
});
