//ModuleA depends on the submodules. This module returns a javascript object with message properties.
define(['subModuleA1', 'subModuleA2'], function( submodule1, submodule2){
	return { message1: submodule1.message, message2: submodule2.message };
});