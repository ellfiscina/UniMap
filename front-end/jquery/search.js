$(document).ready(function(){
	console.log(jQuery.url.param("term"));
	$.getJSON("actions.php?action=search&term=".$_GET["term"], function(json){
		console.log(json);
	});
});