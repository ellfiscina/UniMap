$(document).ready(function(){
	var json = JSON.parse('["usedroom", "usedroom", "emptyroom" ]');
	var j;
	$(".groundli").addClass("disabled");
	
	$(".one").click(function(){
		$(".oneli").addClass("disabled");
		$(".groundli, .twoli").removeClass("disabled");
		$(".room").hide();
		$(".gRoom").hide();
		$(".gEmpty").hide();
		$(".empty").hide();
		$(".facility").hide();
		$(".biblioteca").hide();
		$(".lab").hide();

		for (var i = 0; i < 38; i++) {
			j = i+1;
			if (i < 8) {
				if(i == 6){
					$('.sala1').append('<div class="empty"><p>Banheiro</p></div>');
				}
				else{
					$('.sala1').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			} 
			else if(i < 19){
				if(i == 17){
					$('.sala2').append('<div class="empty"><p>Escada</p></div>');
				}
				else{
					$('.sala2').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
			else if(i < 30){
				if(i == 28){
					$('.sala3').append('<div class="empty"><p>Banheiro</p></div>');
				}
				else{
					$('.sala3').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
			else{
				if(i == 36){
					$('.sala4').append('<div class="empty"><p>Escada</p></div>');
				}
				else{
					$('.sala4').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
		}
	});
	$(".two").click(function(){
		$(".twoli").addClass("disabled");
		$(".groundli, .oneli").removeClass("disabled");
		$(".gRoom").hide();
		$(".gEmpty").hide();
		$(".room").hide();
		$(".empty").hide();
		$(".facility").hide();
		$(".biblioteca").hide();
		$(".lab").hide();
		j = 39;
		for (var i = 0; i < 38; i++) {
			if (i < 8) {
				if(i == 6){
					$('.sala1').append('<div class="empty"><p>Banheiro</p></div>');
				}
				else{
					$('.sala1').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			} 
			else if(i < 19){
				if(i == 17){
					$('.sala2').append('<div class="empty"><p>Escada</p></div>');
				}
				else{
					$('.sala2').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
			else if(i < 30){
				if(i == 28){
					$('.sala3').append('<div class="empty"><p>Banheiro</p></div>');
				}
				else{
					$('.sala3').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
			else{
				if(i == 36){
					$('.sala4').append('<div class="empty"><p>Escada</p></div>');
				}
				else{
					$('.sala4').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
			j++;
		}
	});
	$(".ground").click(function(){
		$(".groundli").addClass("disabled");
		$(".twoli, .oneli").removeClass("disabled");
		$(".gRoom").show();
		$(".gEmpty").show();
		$(".room").hide();
		$(".empty").hide();
		$(".facility").show();
		$(".biblioteca").show();
		$(".lab").show();
	});
});
