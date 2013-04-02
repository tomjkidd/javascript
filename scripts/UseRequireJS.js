//This will load ModuleA and ModuleB into the current namespace.
//Observations:
//This file was referred to in the data-main attribute of UseRequireJS.html, so it will act like main.
//All modules are expected to be in the same directory as this one, and relative to this one to be included from elsewhere.
//The require function allows modules to be loaded into the workspace and used in the script.
//The define functions creates modules that can return javascript objects/functions.
//Both functions allow the modular array of dependencies to be specified as the first argument.
//jquery reference works coincidentally:
//http://www.bennadel.com/blog/2287-Using-jQuery-As-A-Named-Module-In-RequireJS.htm
requirejs.config({
	paths: {
		jquery : "../lib/jquery"
	}
});

requirejs(["jquery","ModuleA", "ModuleB"], function($, modA, modB){
//	$(document).ready(function(){
		$("#main-div").append("AHH YEAH!");
		//Here modA is a javascript object whose messages are composed from submodules
		console.log(modA.message1);
		console.log(modA.message2);
		//Here modB exposes a function defined in one of its submodules
		modB.callFunctionSubB1(); //This should also print to the console
//	});
});