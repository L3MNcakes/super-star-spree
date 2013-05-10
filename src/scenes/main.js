Crafty.scene("main", function() {

    Crafty.background("url('web/images/bg.png')");

	var elements = [
        "src/interfaces/Title.js"
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {	   
        infc["Title"] = new Title();
	});

});
