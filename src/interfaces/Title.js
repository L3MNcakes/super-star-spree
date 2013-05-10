Title = BaseEntity.extend({
    defaults : {
        'text' : "Super Star Spree!"
    },

    initialize : function() {
        var model = this;

        var entity = Crafty.e("2D,DOM,Text");

        entity
            .attr({
                x : Crafty.viewport.width / 2 - 100,
                y : Crafty.viewport.height / 3 - 300,
                w : 200
            })
            .text(model.get("text"))
            .textColor("#FFFFFF")
            .textFont({
                weight : 'bold',
                size : '72px',
                family: 'Arial Black, Arial, Helvetica, Sans-serif',
            })
            .css({
                'text-align' : 'center',
                'text-shadow' : '0px 0px 10px #003'
            });

        model.set({'entity' : entity});
    }
});
