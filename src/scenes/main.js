Crafty.scene("main", function() {

    Crafty.background("url('web/images/bg.png')");

	var elements = [
        "src/interfaces/Title.js",
        "src/interfaces/MainMenu.js",
        "src/components/Rectangle.js",
        "src/components/Menu.js"
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {	   
        infc["Title"] = new Title();
        infc["MainMenu"] = new MainMenu();
	});

});
