Config = Backbone.Model.extend({
    defaults: {
        'renderType' : 'Canvas',
        'game_title' : 'Super Star Spree',
        'MapEdit_default_plop' : 'block',
        'tile_width' : 32,
        'tiles' : {
            'block' : {
                'sprite' : {
                    'top_left' : 'tile_block_TL',
                    'top_center' : 'tile_block_TC',
                    'top_right' : 'tile_block_TR',
                    'center_left' : 'tile_block_CL',
                    'center_center' : 'tile_block_CC',
                    'center_right' : 'tile_block_CR',
                    'center_left' : 'tile_block_CL',
                    'bottom_left' : 'tile_block_BL',
                    'bottom_center' : 'tile_block_BC',
                    'bottom_right' : 'tile_block_BR'
                },
                'z' : 3,
                'offset' : 0,
                'single' : false
            },
            'player' : {
                'sprite' : {
                    'walk_f1' : 'walk_F1',
                    'walk_f2' : 'walk_F2',
                    'walk_f3' : 'walk_F3',
                    'walk_f4' : 'walk_F4',
                    'walk_f5' : 'walk_F5',
                    'walk_f6' : 'walk_F6',
                    'walk_f7' : 'walk_F7',
                    'walk_f8' : 'walk_F8',
                    'walk_f9' : 'walk_F9',
                    'walk_f10' : 'walk_F10',
                    'walk_f11' : 'walk_F11',
                    'walk_f12' : 'walk_F12'
                },
                'z' : 5,
                'offset' : 0,
                'single' : true
            },
            'star' : {
                'sprite' : {
                    'center_center' : 'tile_star'
                },
                'z' : 4,
                'offset' : 0,
                'single' : false 
            },
            'empty' : {
                'sprite' : {
                    'center_ceter' : ''
                }
            }
        }
    },
    initialize: function() {
       
    },
    
});
