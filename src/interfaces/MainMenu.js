MainMenu = BaseEntity.extend({
    defaults : {
        'options' : [
            {
                "label" : "Start", 
                "scene" : "main",
            },
            {
                "label" : "Map Editor",
                "scene" : "MapEdit"
            }
        ],
        'color' : '#000066'
    },
    
    initialize : function() {
        var model = this;

        var entity = Crafty.e("2D,Canvas,Menu");
        opts = model.get('options');

        entity
            .newMenu(opts,opts[0],Crafty.viewport.width/2-100,Crafty.viewport.height/2 - 100,200,model.get('color')); 

        model.set({'entity' : entity});
    }
});
