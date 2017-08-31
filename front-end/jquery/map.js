$(document).ready(function(){
	var json = JSON.parse('["usedroom", "usedroom", "emptyroom" ]');
	var j;
	$("#downli").hide();
	$("#groundli").addClass("disabled");
	
	$("#one").click(function(){
		$("#oneli").addClass("disabled");
		$("#groundli, #twoli").removeClass("disabled");
		$("#upli").show();
		$("#downli").show();
		
		for (var i = 0; i < 44; i++) {
			j = i+1;
			if (i < 11) {
				if(i == 9){
					$('#sala1').append('<div class="empty"><p>Banheiro</p></div>');
				}
				else{
					$('#sala1').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			} 
			else if(i < 22){
				if(i == 20){
					$('#sala2').append('<div class="empty"><p>Escada</p></div>');
				}
				else{
					$('#sala2').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
			else if(i < 33){
				if(i == 31){
					$('#sala3').append('<div class="empty"><p>Banheiro</p></div>');
				}
				else{
					$('#sala3').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
			else{
				if(i == 42){
					$('#sala4').append('<div class="empty"><p>Escada</p></div>');
				}
				else{
					$('#sala4').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
		}
	});
	$("#two").click(function(){
		$("#twoli").addClass("disabled");
		$("#upli").hide();
		$("#groundli, #oneli").removeClass("disabled");
		$("#downli").show();
	});
	$("#ground").click(function(){
		$("#groundli").addClass("disabled");
		$("#twoli, #oneli").removeClass("disabled");
		$("#upli").show();
		$("#downli").hide();
	});
	$("#up").click(function(){
		$("#twoli").addClass("disabled");
		$("#groundli, #oneli").removeClass("disabled");
		$("#upli").hide();
		$("#downli").show();
	});
	$("#down").click(function(){
		$("#groundli").addClass("disabled");
		$("#twoli, #oneli").removeClass("disabled");
		$("#upli").show();
		$("#downli").hide();
	});
});