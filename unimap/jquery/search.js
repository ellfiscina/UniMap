$(document).ready(function(){
	$.getJSON("actions.php?action=search&term="+get, function(json){
		console.log(json);
		json["disciplines"].each(function(){});
	});
});