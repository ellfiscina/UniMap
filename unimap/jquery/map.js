$(document).ready(function(){
	$.mobile.loading().hide();
	//var json = JSON.parse('["usedroom", "usedroom", "emptyroom", "emptyroom", "usedroom", "emptyroom", "usedroom", "usedroom", "emptyroom", "emptyroom", "usedroom", "emptyroom" ]');
	var j;
	var logado = false;
	var colegiado = [{
		nome: "Colegiado de Engenharia Mecânica",
		coordenador: "Luiz Mariano Pereira",
		vice: "José Pereira Alencar Júnior", 
		email: "cenmec@univasf.edu.br", 
		site: "www.mecanica.univasf.edu.br".link("http://www.mecanica.univasf.edu.br/"),
		tel: "(74) 2102-7633" 
	},
	{
		nome: "Colegiado de Engenharia da Computacao",
		coordenador: "Max Santana Rolemberg Farias",
		vice: "Ana Emília de Melo Queiroz", 
		email: "ccomp@univasf.edu.br", 
		site: "www.cecomp.univasf.edu.br".link("http://www.cecomp.univasf.edu.br/"),
		tel: "(74) 2102-7636" 
	},
	{
		nome: "Colegiado de Ciências Sociais",
		coordenador: "Rosicleide Araújo de Melo",
		vice: "Ednaldo Ferreira Tôrres", 
		email: "ccsociais@univasf.edu.br", 
		site: "www.cienciassociais.univasf.edu.br".link("http://www.cienciassociais.univasf.edu.br/"),
		tel: "(74) 2102-7639" 
	},
	{
		nome: "Colegiado de Artes Visuais",
		coordenador: "Clarissa Campello Ramos",
		vice: "Elson de Assis Rabelo", 
		email: "cartes@univasf.edu.br", 
		site: "www.artes.univasf.edu.br".link("http://www.artes.univasf.edu.br/"),
		tel: "(074) 2102-7642" 
	},
	{
		nome: "Colegiado de Engenharia Elétrica",
		coordenador: "Isnaldo José de Souza Coelho",
		vice: "Antonio de Almeida Fernandes", 
		email: "cenel@univasf.edu.br", 
		site: "www.eletrica.univasf.edu.br".link("http://www.eletrica.univasf.edu.br/"),
		tel: "(74)2102-7630" 
	},
	{
		nome: "Colegiado de Engenharia de Produção",
		coordenador: "Francisco Alves Pinheiro",
		vice: "Carlos Antonio Freitas da Silva", 
		email: "cprod@univasf.edu.br", 
		site: "univasf.edu.br/~cprod".link("http://univasf.edu.br/~cprod"),
		tel: "(74) 2102-7627 " 
	},
	{
		nome: "Colegiado de Engenharia Agrícola e Ambiental",
		coordenador: "Clóvis Manoel Carvalho Ramos",
		vice: "Miriam Cleide Cavalcante de Amorim", 
		email: "cenamb@univasf.edu.br", 
		site: "www.agricola.univasf.edu.br".link("http://www.agricola.univasf.edu.br/"),
		tel: "(74) 2102-7621" 
	},
	{
		nome: "Colegiado de Engenharia Civil",
		coordenador: "Paulo César Rodrigues de Lima Júnior",
		vice: "Sérgio Luís de Oliveira", 
		email: "ccivil@univasf.edu.br", 
		site: "www.civil.univasf.edu.br".link("http://www.civil.univasf.edu.br/"),
		tel: "(074) 2102-7624" 
	}];

	$(".groundli").addClass("disabled");
	$('#signed').hide();

	$.getJSON("actions.php?action=showSessionInfo", function(json){
		console.log("hey");
		if(json){
			logado = json;
			$('#signin').hide();
			$('#signed').show();
			$("#btnSigned").html('<p>'+json["name"]+'</p><i class="fa fa-user fa-lg" aria-hidden="true"></i>');	

		}
	});
	$("#btnLogout").click(function(){
		$.ajax({url: "actions.php?action=logout", success: function(json){ window.location.reload(); }})
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
		'<div class="modal-footer" >' +
		'<button type="button" class="btn btn-primary '+(logado?"":"disabled")+'">Solicitar</button>' +
		'<button id="btnR" '+(logado?'data-toggle="modal" data-target="#modalReserva"':"")+' type="button" class="btn btn-primary '+(logado?"":"disabled")+'">Reservar</button>' +
		'<button '+(logado?'data-toggle="modal" data-target="#modalAutoriza"':"")+' type="button" class="btn btn-primary '+(logado?"":"disabled")+'">Autorizar</button>' +
		'</div></div></div>';
		$("#modalAula").html(html);

		$("#btnR").click(function(){
			var html  = '<div class="modal-dialog">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
			'<h4 class="modal-title">Reservar Sala</h4>' +
			'</div>' +
			'<form method="POST" id="cadastroFormDisc">' +
			'<div class="modal-body">' +
			'<div class="input-group">' +
			'<label style="margin-right: 10px;">Disciplina </label>' +
			'<input list="disciplinas" name="disciplinas">' +
			'<datalist id="disciplinas">' +
			'</datalist>' +
			'</div><br>' +
			'<div class="input-group">' +
			'<label style="margin-right: 11px;">Professor </label>' +
			'<input list="profs" name="profs">' +
			'<datalist id="profs">' +
			'</datalist>' +
			'</div><br>' +
			'<div class="row">' +
  			'<div class="col-md-6">' +
  			'<div class="input-group">' +
  			'<label>Horário de início </label>' +
  			'<input type="text" id="inicio" class="form-control" name="inicio" placeholder="8" aria-describedby="basic-addon1">' +
  			'</div>' +
  			'</div>' +
  			'<div class="col-md-6">' +
  			'<div class="input-group">' +
  			'<label>Horário de término </label>' +
  			'<input type="text" id="inicio" class="form-control" name="inicio" placeholder="10" aria-describedby="basic-addon1">' +
  			'</div>' +
  			'</div></div><br>' +
  			'<div class="row">' +
  			'<div class="col-md-3">' +
  			'<div class="form-check">' +
  			'<label class="form-check-label">' +
  			'<input class="form-check-input" type="radio" name="type" id="semester" value="S" checked>' +
  			'Dia da Semana</label>' +
  			'</div></div>' +
  			'<div id="week" class="col-md-9">' +
  			'<div class="checkboxes">'+
    		'<label for="s"><input type="checkbox" id="s" /> <span class="checkLabel">Monday</span></label>'+
    		'<label for="t"><input type="checkbox" id="t" /> <span class="checkLabel">Tuesday</span></label>'+
    		'<label for="w"><input type="checkbox" id="w" /> <span class="checkLabel">Wednesday</span></label>'+
  			'<label for="x"><input type="checkbox" id="x" /> <span class="checkLabel" style="margin-right: 50px;">Thursday</span></label>'+
    		'<label for="y"><input type="checkbox" id="y" /> <span class="checkLabel" style="margin-right: 74px;">Friday</span></label>'+
    		'<label for="z"><input type="checkbox" id="z" /> <span class="checkLabel">Saturday</span></label>'+
  			'</div>'+
  			'</div></div><br>' +
  			'<div class="row">' +
  			'<div class="col-md-3">' +
  			'<div class="form-check">' +
  			'<label class="form-check-label">' +
  			'<input class="form-check-input" type="radio" name="type" id="day" value="D" checked>' +
  			'Data</label>' +
  			'</div></div>' +
  			'<div class="col-md-6">' +
  			'<input type="date" id="dia" class="form-control" name="dia" aria-describedby="basic-addon1">' +
  			'</div></div>' +
			'<div class="modal-footer">' +
			'<span id="msgErrorCD"></span>' +
			'<input type="submit"  class="btn btn-success" value="Reservar"><br>' +
			'</div>' +
			'</form>' +
			'</div>' +
			'</div>';
			$("#modalReserva").html(html);

			$.getJSON("actions.php?action=showRoomSchedule&room="+y, function(json){
				$(json).each(function(){
					$("#disciplinas").append("<option id='"+ $(this)["name"] +"' value='"+ $(this)["name"]+"'>'"+ $(this)["cod_disc"] +"'</option>");
				});
			});
			$.getJSON("actions.php?action=showRoomSchedule&room="+y, function(json){
				$(json).each(function(){
					$("#profs").append("<option id='"+ $(this)["name"] +"' value='"+ $(this)["name"]+"'>'"+ $(this)["id"] +"'</option>");
				});
			});
			
			$('input[value="S"]').prop("checked",true);
			$("#dia").hide();
			$("input[type='radio']").change(function(){

			   if($(this).val()=="S"){
			      	$("#week").show();
			     	$("#dia").hide();
			   }
			   else if($(this).val()=="D"){
			   		$("#week").hide();
			      	$("#dia").show();
			   }
			   else{
			       	$("#week").hide();
			      	$("#dia").hide(); 
			   }

			});
		});

		$.getJSON("actions.php?action=showRoomSchedule&room="+y, function(json){
			console.log(json);
			var html = '<div class="table-responsive">' +
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
		data = JSON.parse(data);
		if(data["cod"]==0) window.location.reload();
		else{

			$("#msgError").show();
			$("#msgError").html(data["msg"]);
		}
	})});

$("#searchButton").click(function(){
	window.location.assign("search.php?term="+$("#inputSearch").val());
});

$('#btnEdit').click(function(){
	var html = '<div class="modal-dialog">' +
	'<div class="modal-content">' +
	'<div class="modal-header">' +
	'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'<h4 class="modal-title">Cadastrar Usuário</h4>' +
	'</div>' +
	'<form method="POST" id="cadastroFormUser">' +
	'<div class="modal-body">' +
	'<div class="input-group">' +
	'<span class="input-group-addon" id="basic-addon1"><i class="fa fa-user" aria-hidden="true"></i></span>' +
	' <input class="form-control" type="text" placeholder="CPF" value = "'+logado['cpf']+'" readonly>' +
	'</div><br>' +
	'<div class="input-group">' +
	'<span class="input-group-addon" id="basic-addon1"><i class="fa fa-user" aria-hidden="true"></i></span>' +
	'<input type="text" id="name" class="form-control" name="name" placeholder="Nome" value = "'+logado['name']+'" aria-describedby="basic-addon1">' +
	'</div><br>' +
	'<div class="input-group">' +
	'<span class="input-group-addon" id="basic-addon1"><i class="fa fa-at" aria-hidden="true"></i></span>' +
	'<input type="email" id="email" class="form-control" name="email" placeholder="Email" value = "'+logado['email']+'" aria-describedby="basic-addon1">' +
	'</div><br>' +
	'<div class="input-group">' +
	' <span class="input-group-addon" id="basic-addon1"><i class="fa fa-unlock-alt" aria-hidden="true"></i></span>' +
	' <input type="password" id="password" class="form-control" name="pass" placeholder="Senha" aria-describedby="basic-addon1">' +
	'</div><br>' +
	'<div class="input-group">' +
	' <span class="input-group-addon" id="basic-addon1"><i class="fa fa-unlock-alt" aria-hidden="true"></i></span>' +
	'  <input type="password" id="password" class="form-control" name="passConf" placeholder="Confirmação de Senha" aria-describedby="basic-addon1">' +
	'</div><br>' +
	'</div>' +
	'<div class="modal-footer">' +
	'<span id="msgErrorCU"></span>' +
	'<input type="submit"  class="btn btn-success" value="Editar"><br>' +
	'</div>' +
	'</form>' +
	'</div>' +
	'</div>';
	$("#modalEditar").html(html);
});

$('input[value="A"]').prop("checked",true);







});
