/**
    examples:             
    'sprites_name' : {
         'file' : 'path/to/file',
         'tile' : width,
         'tileh' : height,
         'elements': {
             'sprite_name' : [0, 0]
         }
    },
*/

Sprites = Backbone.Model.extend({
    defaults: {
        images:{
            'blocks' : {
                'file' : 'web/images/block_spritesheet.png',
                'tile' : 32,
                'tileh' : 32,
                'elements' : {
                    'tile_block_TL' : [0,0],
                    'tile_block_TC' : [1,0],
                    'tile_block_TR' : [2,0],
                    'tile_block_CL' : [0,1],
                    'tile_block_CC' : [1,1],
                    'tile_block_CR' : [2,1],
                    'tile_block_BL' : [0,2],
                    'tile_block_BC' : [1,2],
                    'tile_block_BR' : [2,2]
                }
            },
            'tiles' : {
                'file' : 'web/images/tile_spritesheet.png',
                'tile' : 32,
                'tileh' : 32,
                'elements' : {
                    'tile_block' : [0,0],
                    'tile_star' : [1, 0]
                }
            },
            'actors' : {
                'file' : 'web/images/actor_spritesheet.png',
                'tile' : 32,
                'tileh' : 32,
                'elements' : {
                    'walk_F1' : [0,0],
                    'walk_F2' : [1,0],
                    'walk_F3' : [2,0],
                    'walk_F4' : [3,0],
                    'walk_F5' : [4,0],
                    'walk_F6' : [5,0],
                    'walk_F7' : [6,0],
                    'walk_F8' : [7,0],
                    'walk_F9' : [8,0],
                    'walk_F10' : [9,0],
                    'walk_F11' : [10,0],
                    'walk_F12' : [11,0]
                }
            }
        }
    },
    initialize: function(){
        
    },
    /**
     * Create Crafty sprites from images object
     * Pass key if You want create only one choosen sprite.
     * 
     * @param  string key - sprite definition key
     */
    create: function(key){
        if(key != undefined){
            element = this.get('images')[key];
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
    		
            return true;
        };

        _.each(this.get('images'), function(element, k){ 
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
        });

    },
    /**
     * Get path for sprites files - for loading
     * 
     * @return array array of files paths
     */
    getPaths: function(){
        var array = [], i=0;
        _.each(this.get('images'), function(element, key){ 
            array[i] = element['file']
            i++;
        });

        return array;
    }
});
