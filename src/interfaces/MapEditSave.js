MapEditSave = BaseEntity.extend({
    defaults : {
        'x' : Crafty.viewport.width / 2 - 200,
        'y' : Crafty.viewport.height / 2 - 200,
        'width' : 400,
        'height' : 400,
        'color' : '#FFFFFF',
        'font-family' : 'Courier New, Courier, Monospace, Mono',
        'css' : {
            'border' : '10px solid #000000',
            'padding' : '10px',
            'word-wrap' : 'break-word',
            'overflow' : 'hidden'
        },
        'intro' : "Copy/Paste the following into src/maps/map_name.js",
        'footer' : "Press Q to return to Map Editor",
        'json' : null
    },

    initialize : function() {
        var model = this;

        var entity = Crafty.e("2D,DOM,Color,Text,Keyboard"); 

        entity.attr({
            x : model.get('x'),
            y : model.get('y'),
            w : model.get('width'),
            h : model.get('height'),
            z : 10
        })
        .color(model.get('color'))
        .textFont({
            family : model.get('font-family')
        })
        .css(model.get('css'))
        .bind("KeyDown", function(e) {
            if(e.key == Crafty.keys["Q"]) {
                this.destroy();
                Crafty.trigger("MapEditSave_Close");
            }
        });

        model.set({'entity' : entity});
    },

    fill : function(t) {
        var model = this;
        var entity = this.getEntity();

        real_text = model.get('intro') + "<br><br>var map_name = " + t + "<br><br>" + model.get('footer');

        entity
            .text(real_text)
            .attr({
                w : model.get('width'),
                h : model.get('height')
            });
    }
});
