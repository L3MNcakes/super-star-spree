Title = BaseEntity.extend({
    defaults : {
        'text' : "Super Star Spree!"
    },

    initialize : function() {
        var model = this;

        var entity = Crafty.e("2D,DOM,Text");

        entity
            .text(model.get("text"))
            .textColor("#FFFFFF")
            .textFont({
                'weight' : 'bold',
                'family' : 'Arial Black, Arial, Helvetica, Sans-serif',
                'size' : '72px',
            })
            .css({
                'text-align' : 'center',
                'text-shadow' : '0px 0px 10px #003'
            })
            .attr({
                x : Crafty.viewport.width / 2 - 100,
                y : Crafty.viewport.height / 3 - 300,
                w : 200
            });

        model.set({'entity' : entity});
    }
});
