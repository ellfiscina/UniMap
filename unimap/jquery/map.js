$(document).ready(function(){
	$.mobile.loading().hide();
	//var json = JSON.parse('["usedroom", "usedroom", "emptyroom", "emptyroom", "usedroom", "emptyroom", "usedroom", "usedroom", "emptyroom", "emptyroom", "usedroom", "emptyroom" ]');
	var j;
	var colegiado = [{
		nome: "Colegiado de Computacao",
		coordenador: "Max",
		vice: "Ana Emilia", 
		email: "ccomp@univasf.edu.br", 
		site: "univasf.edu.br/~ccomp",
		tel: "123456" 
		},{
		nome: "Colegiado de Mecânica",
		coordenador: "X",
		vice: "Y", 
		email: "cm@univasf.edu.br", 
		site: "univasf.edu.br/~cm",
		tel: "654321" 
		}];

	$(".groundli").addClass("disabled");
$('#signed').hide();
	$.getJSON("actions.php?action=showSessionInfo", function(json){
		if(json){
			$('#signin').hide();
			$('#signed').show();
			$("#signed").html('<p>'+json["name"]+'</p><i class="fa fa-user fa-lg" aria-hidden="true"></i>');	
		}
	});
	

	showRoom(0);

	$.getJSON("actions.php?action=showRooms", function(json){
		console.log(json);
		$('.aula').each(function() {
	    	$(this).addClass(json[$(this).attr("id")]?"emptyroom":"usedroom");
		});
		
		$('.aulaR').each(function() {
	    	$(this).addClass(json[$(this).attr("id")]?"emptyroom":"usedroom");
		});
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
		$(".sRoom5").hide();
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
				$(".sRoom5").show();
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

   $('.colegiado').click(function(){
   		var x = $(this).attr('id');
   		var html = '<div class="modal-dialog">' +
						'<div class="modal-content">' +
							'<div class="modal-header">' +
								'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
								'<h4 class="modal-title">' + colegiado[x].nome +'</h4>'+
							'</div>'+
						'<div class="modal-body">' +
							'<div class="container">' +
								'<p>Coordenador: ' + colegiado[x].coordenador +'</p>' +
								'<p>Vice-coordenador: ' + colegiado[x].vice +'</p>' +
								'<p>Email: ' + colegiado[x].email +'</p>' +
								'<p>Site: ' + colegiado[x].site +'</p>' +
								'<p>Telefone: ' + colegiado[x].tel +'</p>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';

		$('#modalColegiado').html(html);
   });

   $('.aula, .aulaR').click(function(){
   		var y = $(this).attr('id');
   		var html = '<div class="modal-dialog">' +
							'<div class="modal-content">' +
								'<div class="modal-header">' +
									'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
									'<h4 class="modal-title">Grade de Horário</h4>' +
								'</div><div class="modal-body">' +
									'<div class="container" id="containerSchedule">'+
									'</div>' +
								'</div>' +
							'<div class="modal-footer">' +
								'<button type="button" class="btn btn-primary">Reservar</button>' +
							'</div></div></div>';
							$("#modalAula").html(html);
   		$.getJSON("actions.php?action=showRoomSchedule&room="+y, function(json){
   			console.log(json);
	   		var html = 					'<div class="table-responsive">' +
											'<table class="table">' +
												'<thead><tr>' +
													'<th>Horário</th><th>Segunda</th><th>Terça</th><th>Quarta</th><th>Quinta</th><th>Sexta</th><th>Sábado</th>' +
												'</tr></thead>' +
												'<tbody><tr>' +
													'<td>07:00</td><td>'+json["Monday"][7]["discipline"]["name"]+'<br>'+json["Monday"][7]["teacher"]["name"]+'</td><td>'+json["Tuesday"][7]["discipline"]["name"]+'<br>'+json["Tuesday"][7]["teacher"]["name"]+'</td><td>'+json["Wednesday"][7]["discipline"]["name"]+'<br>'+json["Wednesday"][7]["teacher"]["name"]+'</td><td>'+json["Thursday"][7]["discipline"]["name"]+'<br>'+json["Thursday"][7]["teacher"]["name"]+'</td><td>'+json["Friday"][7]["discipline"]["name"]+'<br>'+json["Friday"][7]["teacher"]["name"]+'</td><td>'+json["Saturday"][7]["discipline"]["name"]+'<br>'+json["Saturday"][7]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>08:00</td><td>'+json["Monday"][8]["discipline"]["name"]+'<br>'+json["Monday"][8]["teacher"]["name"]+'</td><td>'+json["Tuesday"][8]["discipline"]["name"]+'<br>'+json["Tuesday"][8]["teacher"]["name"]+'</td><td>'+json["Wednesday"][8]["discipline"]["name"]+'<br>'+json["Wednesday"][8]["teacher"]["name"]+'</td><td>'+json["Thursday"][8]["discipline"]["name"]+'<br>'+json["Thursday"][8]["teacher"]["name"]+'</td><td>'+json["Friday"][8]["discipline"]["name"]+'<br>'+json["Friday"][8]["teacher"]["name"]+'</td><td>'+json["Saturday"][8]["discipline"]["name"]+'<br>'+json["Saturday"][8]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>09:00</td><td>'+json["Monday"][9]["discipline"]["name"]+'<br>'+json["Monday"][9]["teacher"]["name"]+'</td><td>'+json["Tuesday"][9]["discipline"]["name"]+'<br>'+json["Tuesday"][9]["teacher"]["name"]+'</td><td>'+json["Wednesday"][9]["discipline"]["name"]+'<br>'+json["Wednesday"][9]["teacher"]["name"]+'</td><td>'+json["Thursday"][9]["discipline"]["name"]+'<br>'+json["Thursday"][9]["teacher"]["name"]+'</td><td>'+json["Friday"][9]["discipline"]["name"]+'<br>'+json["Friday"][9]["teacher"]["name"]+'</td><td>'+json["Saturday"][9]["discipline"]["name"]+'<br>'+json["Saturday"][9]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>10:00</td><td>'+json["Monday"][10]["discipline"]["name"]+'<br>'+json["Monday"][10]["teacher"]["name"]+'</td><td>'+json["Tuesday"][10]["discipline"]["name"]+'<br>'+json["Tuesday"][10]["teacher"]["name"]+'</td><td>'+json["Wednesday"][10]["discipline"]["name"]+'<br>'+json["Wednesday"][10]["teacher"]["name"]+'</td><td>'+json["Thursday"][10]["discipline"]["name"]+'<br>'+json["Thursday"][10]["teacher"]["name"]+'</td><td>'+json["Friday"][10]["discipline"]["name"]+'<br>'+json["Friday"][10]["teacher"]["name"]+'</td><td>'+json["Saturday"][10]["discipline"]["name"]+'<br>'+json["Saturday"][10]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>11:00</td><td>'+json["Monday"][11]["discipline"]["name"]+'<br>'+json["Monday"][11]["teacher"]["name"]+'</td><td>'+json["Tuesday"][11]["discipline"]["name"]+'<br>'+json["Tuesday"][11]["teacher"]["name"]+'</td><td>'+json["Wednesday"][11]["discipline"]["name"]+'<br>'+json["Wednesday"][11]["teacher"]["name"]+'</td><td>'+json["Thursday"][11]["discipline"]["name"]+'<br>'+json["Thursday"][11]["teacher"]["name"]+'</td><td>'+json["Friday"][11]["discipline"]["name"]+'<br>'+json["Friday"][11]["teacher"]["name"]+'</td><td>'+json["Saturday"][11]["discipline"]["name"]+'<br>'+json["Saturday"][11]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>13:00</td><td>'+json["Monday"][13]["discipline"]["name"]+'<br>'+json["Monday"][13]["teacher"]["name"]+'</td><td>'+json["Tuesday"][13]["discipline"]["name"]+'<br>'+json["Tuesday"][13]["teacher"]["name"]+'</td><td>'+json["Wednesday"][13]["discipline"]["name"]+'<br>'+json["Wednesday"][13]["teacher"]["name"]+'</td><td>'+json["Thursday"][13]["discipline"]["name"]+'<br>'+json["Thursday"][13]["teacher"]["name"]+'</td><td>'+json["Friday"][13]["discipline"]["name"]+'<br>'+json["Friday"][13]["teacher"]["name"]+'</td><td>'+json["Saturday"][13]["discipline"]["name"]+'<br>'+json["Saturday"][13]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>14:00</td><td>'+json["Monday"][14]["discipline"]["name"]+'<br>'+json["Monday"][14]["teacher"]["name"]+'</td><td>'+json["Tuesday"][14]["discipline"]["name"]+'<br>'+json["Tuesday"][14]["teacher"]["name"]+'</td><td>'+json["Wednesday"][14]["discipline"]["name"]+'<br>'+json["Wednesday"][14]["teacher"]["name"]+'</td><td>'+json["Thursday"][14]["discipline"]["name"]+'<br>'+json["Thursday"][14]["teacher"]["name"]+'</td><td>'+json["Friday"][14]["discipline"]["name"]+'<br>'+json["Friday"][14]["teacher"]["name"]+'</td><td>'+json["Saturday"][14]["discipline"]["name"]+'<br>'+json["Saturday"][14]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>15:00</td><td>'+json["Monday"][15]["discipline"]["name"]+'<br>'+json["Monday"][15]["teacher"]["name"]+'</td><td>'+json["Tuesday"][15]["discipline"]["name"]+'<br>'+json["Tuesday"][15]["teacher"]["name"]+'</td><td>'+json["Wednesday"][15]["discipline"]["name"]+'<br>'+json["Wednesday"][15]["teacher"]["name"]+'</td><td>'+json["Thursday"][15]["discipline"]["name"]+'<br>'+json["Thursday"][15]["teacher"]["name"]+'</td><td>'+json["Friday"][15]["discipline"]["name"]+'<br>'+json["Friday"][15]["teacher"]["name"]+'</td><td>'+json["Saturday"][15]["discipline"]["name"]+'<br>'+json["Saturday"][15]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>16:00</td><td>'+json["Monday"][16]["discipline"]["name"]+'<br>'+json["Monday"][16]["teacher"]["name"]+'</td><td>'+json["Tuesday"][16]["discipline"]["name"]+'<br>'+json["Tuesday"][16]["teacher"]["name"]+'</td><td>'+json["Wednesday"][16]["discipline"]["name"]+'<br>'+json["Wednesday"][16]["teacher"]["name"]+'</td><td>'+json["Thursday"][16]["discipline"]["name"]+'<br>'+json["Thursday"][16]["teacher"]["name"]+'</td><td>'+json["Friday"][16]["discipline"]["name"]+'<br>'+json["Friday"][16]["teacher"]["name"]+'</td><td>'+json["Saturday"][16]["discipline"]["name"]+'<br>'+json["Saturday"][16]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>17:00</td><td>'+json["Monday"][17]["discipline"]["name"]+'<br>'+json["Monday"][17]["teacher"]["name"]+'</td><td>'+json["Tuesday"][17]["discipline"]["name"]+'<br>'+json["Tuesday"][17]["teacher"]["name"]+'</td><td>'+json["Wednesday"][17]["discipline"]["name"]+'<br>'+json["Wednesday"][17]["teacher"]["name"]+'</td><td>'+json["Thursday"][17]["discipline"]["name"]+'<br>'+json["Thursday"][7]["teacher"]["name"]+'</td><td>'+json["Friday"][17]["discipline"]["name"]+'<br>'+json["Friday"][17]["teacher"]["name"]+'</td><td>'+json["Saturday"][17]["discipline"]["name"]+'<br>'+json["Saturday"][17]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>18:00</td><td>'+json["Monday"][18]["discipline"]["name"]+'<br>'+json["Monday"][18]["teacher"]["name"]+'</td><td>'+json["Tuesday"][18]["discipline"]["name"]+'<br>'+json["Tuesday"][18]["teacher"]["name"]+'</td><td>'+json["Wednesday"][18]["discipline"]["name"]+'<br>'+json["Wednesday"][18]["teacher"]["name"]+'</td><td>'+json["Thursday"][18]["discipline"]["name"]+'<br>'+json["Thursday"][18]["teacher"]["name"]+'</td><td>'+json["Friday"][18]["discipline"]["name"]+'<br>'+json["Friday"][18]["teacher"]["name"]+'</td><td>'+json["Saturday"][18]["discipline"]["name"]+'<br>'+json["Saturday"][18]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>19:00</td><td>'+json["Monday"][19]["discipline"]["name"]+'<br>'+json["Monday"][19]["teacher"]["name"]+'</td><td>'+json["Tuesday"][19]["discipline"]["name"]+'<br>'+json["Tuesday"][19]["teacher"]["name"]+'</td><td>'+json["Wednesday"][19]["discipline"]["name"]+'<br>'+json["Wednesday"][19]["teacher"]["name"]+'</td><td>'+json["Thursday"][19]["discipline"]["name"]+'<br>'+json["Thursday"][19]["teacher"]["name"]+'</td><td>'+json["Friday"][19]["discipline"]["name"]+'<br>'+json["Friday"][19]["teacher"]["name"]+'</td><td>'+json["Saturday"][19]["discipline"]["name"]+'<br>'+json["Saturday"][19]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>20:00</td><td>'+json["Monday"][20]["discipline"]["name"]+'<br>'+json["Monday"][20]["teacher"]["name"]+'</td><td>'+json["Tuesday"][20]["discipline"]["name"]+'<br>'+json["Tuesday"][20]["teacher"]["name"]+'</td><td>'+json["Wednesday"][20]["discipline"]["name"]+'<br>'+json["Wednesday"][20]["teacher"]["name"]+'</td><td>'+json["Thursday"][20]["discipline"]["name"]+'<br>'+json["Thursday"][20]["teacher"]["name"]+'</td><td>'+json["Friday"][20]["discipline"]["name"]+'<br>'+json["Friday"][20]["teacher"]["name"]+'</td><td>'+json["Saturday"][20]["discipline"]["name"]+'<br>'+json["Saturday"][20]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>21:00</td><td>'+json["Monday"][21]["discipline"]["name"]+'<br>'+json["Monday"][21]["teacher"]["name"]+'</td><td>'+json["Tuesday"][21]["discipline"]["name"]+'<br>'+json["Tuesday"][21]["teacher"]["name"]+'</td><td>'+json["Wednesday"][21]["discipline"]["name"]+'<br>'+json["Wednesday"][21]["teacher"]["name"]+'</td><td>'+json["Thursday"][21]["discipline"]["name"]+'<br>'+json["Thursday"][21]["teacher"]["name"]+'</td><td>'+json["Friday"][21]["discipline"]["name"]+'<br>'+json["Friday"][21]["teacher"]["name"]+'</td><td>'+json["Saturday"][21]["discipline"]["name"]+'<br>'+json["Saturday"][21]["teacher"]["name"]+'</td>' +
												'</tr><tr>' +
													'<td>22:00</td><td>'+json["Monday"][22]["discipline"]["name"]+'<br>'+json["Monday"][22]["teacher"]["name"]+'</td><td>'+json["Tuesday"][22]["discipline"]["name"]+'<br>'+json["Tuesday"][22]["teacher"]["name"]+'</td><td>'+json["Wednesday"][22]["discipline"]["name"]+'<br>'+json["Wednesday"][22]["teacher"]["name"]+'</td><td>'+json["Thursday"][22]["discipline"]["name"]+'<br>'+json["Thursday"][22]["teacher"]["name"]+'</td><td>'+json["Friday"][22]["discipline"]["name"]+'<br>'+json["Friday"][22]["teacher"]["name"]+'</td><td>'+json["Saturday"][22]["discipline"]["name"]+'<br>'+json["Saturday"][22]["teacher"]["name"]+'</td>' +
												'</tr></tbody>' +
											'</table>' +
										'</div>' ;

			$('#containerSchedule').html(html);
	   		});
   });

 $("#loginForm").submit(function(){
 	$.post('actions.php?action=login', $('#loginForm').serialize()).done(function(data){
 	window.location.reload();
 })});

 $("#searchButton").click(function(){
 	window.location.assign("search.php?term="+$("#inputSearch").val());
 });

});
