$(document).ready(function(){
	$.mobile.loading().hide();
	var json = JSON.parse('["usedroom", "usedroom", "emptyroom", "emptyroom", "usedroom", "emptyroom", "usedroom", "usedroom", "emptyroom", "emptyroom", "usedroom", "emptyroom" ]');
	var j;
	$(".groundli").addClass("disabled");

	showRoom(0);

	var ID = 0;
	var IDR = 0;
	$('.aula').each(function() {
    	$(this).addClass(json[ID]);
    	ID++;
	});
	
	$('.aulaR').each(function() {
    	$(this).addClass(json[IDR]);
    	IDR++;
	});
	$(".one").click(function(){
		$(".oneli").addClass("disabled");
		$(".groundli, .twoli").removeClass("disabled");
		showRoom(1);
	});
	$(".two").click(function(){
		$(".twoli").addClass("disabled");
		$(".groundli, .oneli").removeClass("disabled");
		showRoom(2);
	});
	$(".ground").click(function(){
		$(".groundli").addClass("disabled");
		$(".twoli, .oneli").removeClass("disabled");
		showRoom(0);
	});

	function showRoom(andar) {
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
