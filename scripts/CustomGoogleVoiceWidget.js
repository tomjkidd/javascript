//With a little help from...
//http://www.stephenjc.com/2009/05/09/google-voice-call-widget-post-commands/
//http://razvangavril.com/web-development/custom-google-voice-widget-2/

/*
Need to figure out error, but functionality works despite them
XMLHttpRequest cannot load https://clients4.google.com/voice/embed/webButtonConnect. Origin null is not allowed by Access-Control-Allow-Origin.

Possible solution
http://www.html5rocks.com/en/tutorials/cors/
*/
$( document ).ready(function() {
	
	$(".call-button").click(function(){
		alert("Call button clicked");
		handleGoogleVoiceConnect("e22cefe291894def50e0a314c1a7dbf6bc0df346", "Tom", "8572449033");
	});
});

var handleGoogleVoiceConnect = function(id, caller, callerNumber){
	alert("Call to :"+id+" from "+caller+" ("+callerNumber+")");

	var data = {
		"buttonId": id,
		"callerNumber": callerNumber,
		"name": caller,
		"showCallerNumber": 0
	};
	
	var url = "https://clients4.google.com/voice/embed/webButtonConnect";
	$.ajax({
		type: "POST",
		url: url,
		data: data,
		success: function(){
			alert("Success");
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert(jqXHR + " " + textStatus + " " + errorThrown);
		}
	});
}