MapEditSpriteSelect = BaseEntity.extend({
    defaults : {

    },

    initialize : function(ts) {
        var model = this;
        
        var entity = Crafty.e("MapEdit_SpriteGrid")
            .attr({
                x : 0,
                y : 0,
                w : Crafty.viewport.width,
                h : Crafty.viewport.height
            })
            .tileset(ts);

        return this;
    }
});
