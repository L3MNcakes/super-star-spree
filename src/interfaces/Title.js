Title = BaseEntity.extend({
    defaults : {
        'img' : "web/images/title.png"
    },

    initialize : function() {
        var model = this;

        var entity = Crafty.e("2D,DOM,Image");

        entity
            .attr({
                x : Crafty.viewport.width / 2 - 150,
                y : Crafty.viewport.height / 3 - 300,
                w : 300
            })
            .image(model.get('img'));

        model.set({'entity' : entity});
    }
});
