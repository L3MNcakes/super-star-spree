MapEditLoad = BaseEntity.extend({
    defaults : {
        'x' : Crafty.viewport.width / 2 - 200,
        'y' : Crafty.viewport.height / 2 - 200,
        'width' : 400,
        'height' : 0,
        'color' : '#000066',
        'text_color' : '#FFFFFF',
        'select_color' : '#FFFF00',
        'border' : '3px solid #FFFFFF',
        'border_radius' : '10px',
        'size' : 20,
        'family' : 'Arial',
        'num_options' : 0
    },

    initialize : function() {
        var model = this;
        var entity = Crafty.e("BaseMenu");

        entity
            .attr({
                x : model.get('x'),
                y : model.get('y'),
                w : model.get('width'),
                h : model.get('num_options') * model.get('size') + (model.get('size') * 2),
                z : 10
            })
            .menu({
                'color' : model.get('color'),
                'text_color' : model.get('text_color'),
                'select_color' : model.get('select_color'),
                'border' : model.get('border'),
                'border_radius' : model.get('border_radius'),
                'size' : model.get('size'),
                'family' : model.get('family')
            })

        model.set({'entity' : entity}); 
    },

    maps : function(m) {
        m = m || [];
        var entity = this.getEntity();
        var model = this;

        for(var map in m) {
            var obj = m[map];

            entity.addOption({
                'label' : obj.label,
                'type' : 'event',
                'action' : 'MapEditLoad_Load',
                'data' : obj.map
            });
        }

        entity.attr({
            x : model.get('x'),
            y : model.get('y'),
            w : model.get('width'),
            h : m.length * model.get('size') + (model.get('size') * 2),
            z : 10
        });
    }
});
