//subModuleB1 has no dependencies. It returns a function.
define(
	function(){
		//Return a function that prints to the console
		return function(){ console.log("I just print when I'm told. I am from subModuleB1"); }
	}
);