MainMenu = BaseEntity.extend({
    defaults : {
        'x' : (Crafty.viewport.width / 2) - 100,
        'y' : (Crafty.viewport.height / 2) - 100,
        'width' : 200,
        'height' : 80,
        'color' : '#000066',
        'text_color' : '#FFFFFF',
        'select_color' : '#FFFF00',
        'border' : '3px solid #FFFFFF',
        'border_radius' : '10px',
        'size' : 20,
        'family' : 'Arial'
    },
    
    initialize : function() {
        var model = this;

        var entity = Crafty.e("BaseMenu");

        entity
            .attr({
                x : model.get('x'),
                y : model.get('y'),
                w : model.get('width'),
                h : model.get('height')
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
            .addOption({
                'label' : 'Start',
                'type' : 'scene',
                'action' : 'main'
            })
            .addOption({
                'label' : 'Map Editor',
                'type' : 'scene',
                'action' : 'MapEdit'
            });

        model.set({'entity' : entity});
    }
});
