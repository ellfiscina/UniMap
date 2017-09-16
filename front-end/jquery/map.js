$(document).ready(function(){
	$.mobile.loading().hide();
	var json = JSON.parse('["usedroom", "usedroom", "emptyroom" ]');
	var j;
	$(".groundli").addClass("disabled");

	Hide(0);
	$(".one").click(function(){
		$(".oneli").addClass("disabled");
		$(".groundli, .twoli").removeClass("disabled");
		Hide(1);
		/*$(".room").hide();
		$(".gRoom").hide();
		$(".gEmpty").hide();
		$(".empty").hide();
		$(".facility").hide();
		$(".biblioteca").hide();
		$(".lab").hide();

		for (var i = 0; i < 38; i++) {
			j = i+1;
			if (i < 6) {
				if(i == 4){
					$('.sala1').append('<div class="empty"><p>Banheiro</p></div>');
				}
				else{
					$('.sala1').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			} 
			else if(i < 17){
				if(i == 15){
					$('.sala2').append('<div class="empty"><p>Escada</p></div>');
				}
				else{
					$('.sala2').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
			else if(i < 28){
				if(i == 26){
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
		}*/
	});
	$(".two").click(function(){
		$(".twoli").addClass("disabled");
		$(".groundli, .oneli").removeClass("disabled");
		Hide(2);
		/*for (var i = 0; i < 32; i++) {
			if (i < 5) {
				if(i == 3){
					$('.sala1').append('<div class="empty"><p>Banheiro</p></div>');
				}
				else{
					$('.sala1').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			} 
			else if(i < 13){
				if(i == 11){
					$('.sala2').append('<div class="empty"><p>Escada</p></div>');
				}
				else{
					$('.sala2').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
			else if(i < 24){
				if(i == 22){
					$('.sala3').append('<div class="empty"><p>Banheiro</p></div>');
				}
				else{
					$('.sala3').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
			else{
				if(i == 30){
					$('.sala4').append('<div class="empty"><p>Escada</p></div>');
				}
				else{
					$('.sala4').append('<div class="room '+json[i]+'"><p>'+ j +'</p></div>');
				}
			}
			j++;
		}*/
	});
	$(".ground").click(function(){
		$(".groundli").addClass("disabled");
		$(".twoli, .oneli").removeClass("disabled");
		Hide(0);
	});

	function Hide(andar) {
		$(".gRoom").hide();
		$(".biblioteca").hide();
		$(".gFacility").hide();
		$(".fFacility").hide();
		$(".sFacility").hide();
		$(".gSalinha").hide();
		$(".fSalinha").hide();
		$(".sSalinha").hide();
		$(".fRoom").hide();
		$(".fCRoom").hide();
		$(".lab").hide();
		$(".sRoom").hide();
		$(".sRoom6").hide();
		$(".sCRoom").hide();
		$(".fCornerRoom").hide();
		$(".sCornerRoom").hide();
		$(".fRoom8").hide();

		switch(andar){
			case 0: 
				$(".gRoom").show();
				$(".biblioteca").show();
				$(".gFacility").show();
				$(".lab").show();
				$(".gSalinha").show();
				break;
			case 1: 
				$(".fRoom").show();
				$(".fCRoom").show();
				$(".fCornerRoom").show();
				$(".fRoom8").show();
				$(".fFacility").show();
				$(".fSalinha").show();
				break;
			case 2: 
				$(".sRoom").show();
				$(".sRoom6").show();
				$(".sCRoom").show();
				$(".sCornerRoom").show();
				$(".sFacility").show();
				$(".sSalinha").show();
				break;
		}
	}
	$("#myCarousel").swiperight(function() {
      $(this).carousel('prev');
    });
   $("#myCarousel").swipeleft(function() {
      $(this).carousel('next');
   });
});
