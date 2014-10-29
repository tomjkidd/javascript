//Module B depends on subModuleB1, returns a javascript object
define(['subModuleB1'], function(subModB1){
	return {message: "ModuleTwo", callFunctionSubB1: subModB1}
});