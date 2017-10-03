$(document).ready(function(){
	$.getJSON("actions.php?action=search&term="+get, function(json){
		$("#results").append("Disciplinas<hr>");
		$(json["disciplines"]).each(function(){
			console.log($(this));
			$("#results").append("<a href='javascript:void(0);' id='"+$(this)[0]["cod_disc"]+"'>"+$(this)[0]["name"]+"</a><br>");
		});
		$("#results").append("<hr>Professores<hr>");
		$(json["teachers"]).each(function(){
			console.log($(this));
			$("#results").append("<a href='javascript:void(0);' id='"+$(this)[0]["id"]+"'>"+$(this)[0]["name"]+"</a><br>");
		});
	});
});