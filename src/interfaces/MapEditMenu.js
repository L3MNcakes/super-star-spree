MapEditMenu = BaseEntity.extend({
    defaults : {
        'x' : Crafty.viewport.width - 225,
        'y' : 25,
        'width' : 200,
        'height' : 0,
        'color' : '#000066',
        'text_color' : '#FFFFFF',
        'select_color' : '#FFFF00',
        'border' : '3px solid #FFFFFF',
        'border_radius' : '10px',
        'size' : 20,
        'family' : 'Arial',
        'num_options' : 3
    },

    initialize : function() {
        var model = this;

        var entity = Crafty.e("BaseMenu,MapEditMenu")
            .attr({
                x : model.get('x'),
                y : model.get('y'),
                w : model.get('width'),
                h : (model.get('num_options')+1) * model.get('size') + (model.get('size') * 2),
                z : 0
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
                'label' : 'Save',
                'type' : 'event',
                'action' : 'MapEditMenu_Save'
            })
            .addOption({
                'label' : 'Load',
                'type' : 'event',
                'action' : 'MapEditMenu_Load'
            })
            .addOption({
                'label' : 'Test',
                'type' : 'event',
                'action' : 'MapEditMenu_Test'
            })
            .addOption({
                'label' : 'Quit',
                'type' : 'scene',
                'action' : 'main'
            });

        model.set({'entity' : entity});
    }
});
