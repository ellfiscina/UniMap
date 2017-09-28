$(document).ready(function(){
	$.mobile.loading().hide();
	var json = JSON.parse('["usedroom", "usedroom", "emptyroom", "emptyroom", "usedroom", "emptyroom", "usedroom", "usedroom", "emptyroom", "emptyroom", "usedroom", "emptyroom" ]');
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

   $('.aula').click(function(){
   		var y = $(this).attr('id');
   		var html = '<div class="modal-dialog">' +
						'<div class="modal-content">' +
							'<div class="modal-header">' +
								'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
								'<h4 class="modal-title">Grade de Horário</h4>' +
							'</div><div class="modal-body">' +
								'<div class="container">' +
									'<div class="table-responsive">' +
										'<table class="table">' +
											'<thead><tr>' +
												'<th>Horário</th><th>Segunda</th><th>Terça</th><th>Quarta</th><th>Quinta</th><th>Sexta</th><th>Sábado</th>' +
											'</tr></thead>' +
											'<tbody><tr>' +
												'<td>07:00</td><td></td><td></td><td></td><td></td><td></td><td></td>' +
											'</tr><tr>' +
												'<td>08:00</td>' +
											'</tr><tr>' +
												'<td>09:00</td>' +
											'</tr><tr>' +
												'<td>10:00</td>' +
											'</tr><tr>' +
												'<td>11:00</td>' +
											'</tr><tr>' +
												'<td>13:00</td>' +
											'</tr><tr>' +
												'<td>14:00</td>' +
											'</tr><tr>' +
												'<td>15:00</td>' +
											'</tr><tr>' +
												'<td>16:00</td>' +
											'</tr><tr>' +
												'<td>17:00</td>' +
											'</tr><tr>' +
												'<td>18:00</td>' +
											'</tr><tr>' +
												'<td>19:00</td>' +
											'</tr><tr>' +
												'<td>20:00</td>' +
											'</tr><tr>' +
												'<td>21:00</td>' +
											'</tr><tr>' +
												'<td>22:00</td>' +
											'</tr></tbody>' +
										'</table>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'<div class="modal-footer">' +
							'<button type="button" class="btn btn-primary">Reservar</button>' +
						'</div></div></div>';

		$('#modalAula').html(html);
   });
});
