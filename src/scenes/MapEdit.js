Crafty.scene("MapEdit", function() {
    
    Crafty.background("url('web/images/bg.png')");

    var elements = [
        "src/components/Grid.js",
        "src/components/MapEdit_BaseTile.js",
    ];

    require(elements, function() {
        sc["Grid"] = Crafty.e("Grid").newGrid(16,16,64);
    });
});
