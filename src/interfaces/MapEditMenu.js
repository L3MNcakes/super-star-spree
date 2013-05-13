MapEditMenu = BaseEntity.extend({
    defaults : {
        'x' : Crafty.viewport.width - 225,
        'y' : 25,
        'width' : 200,
        'height' : 80,
        'color' : '#000066',
        'text_color' : '#FFFFFF',
        'select_color' : '#FFFF00',
        'border' : '3px solid #FFFFFF',
        'border_radius' : '10px',
        'size' : 20,
        'family' : 'Arial',
        'active' : false
    },

    initialize : function() {
        var model = this;

        var entity = Crafty.e("BaseMenu,MapEditMenu")
            .attr({
                x : model.get('x'),
                y : model.get('y'),
                w : model.get('width'),
                h : model.get('height'),
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
                'label' : 'Quit',
                'type' : 'scene',
                'action' : 'main'
            });

        model.set({'entity' : entity});
    }
});
