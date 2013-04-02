//Module allows a group of tests to be considered together.
//Note that module also allows setup and teardown, see cookbook
//http://qunitjs.com/cookbook/
module("TK FIRST TEST MODULE");
test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

//The test function is called with 2 arguments, the name of the test and a function that represents the test.
test("first unique test", function(){
	/* BUILDING BLOCKS: ok(), equal(), deepEqual(), expect() */
	//expect(numberOfAssertionsExpected)
	//The expect function. The argument tells the number of assertions expected to succeed in the test
	expect(4);
	
	//ok(truthy, message)
	//The ok function. If the argument evaluates to truthy, assertion is fine.
	ok(true, "true succeeds");
	ok(!false, "!false succeeds");
	
	//equal(actual, expected, message)
	//The equal function. If actual is equal to expected, assertion is fine.
	//Uses (==) comparison
	equal(1, 1, "1==1 as expected");
	
	//deepEqual(actual, expected, message)
	//Same as equal, but uses (===)
	deepEqual(1, 1, "1===1 as expected");
	
});

module("TK SECOND MODULE");
//This test demonstrates an implied expect of 1 assertion, given as the second argument to test.
test("second unique test", 1, function(){
	ok(true, "true succeeds");
});

test("Date constructors", function(){
	//Valuble for determining the javaScript object's type/instance info
	//http://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
	equal((new Date()) instanceof Date, true);
	equal(new Date().toDateString(), true);
});