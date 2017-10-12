$(document).ready(function(){
	$.getJSON("actions.php?action=search&term="+get, function(json){
		$("#results").append("<h1>Disciplinas</h1><hr class='dash'>");
		$(json["disciplines"]).each(function(){
			console.log($(this));
			$("#results").append("<a class='discipline' data-toggle='modal' data-target='#modalPesquisa' href='' id='"+$(this)[0]["cod_disc"]+"'>"+$(this)[0]["name"]+"</a><br>");
		});
		$("#results").append("<hr><h1>Professores</h1><hr class='dash'>");
		$(json["teachers"]).each(function(){
			console.log($(this));
			$("#results").append("<a class='teacher' data-toggle='modal' data-target='#modalPesquisa' href='' id='"+$(this)[0]["id"]+"'>"+$(this)[0]["name"]+"</a><br>");
		});


		$('.discipline').click(function(){
   		var x = $(this).attr('id');
   		var html = '<div class="modal-dialog">' +
						'<div class="modal-content">' +
							'<div class="modal-header">' +
								'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
								'<h4 class="modal-title"></h4>'+
							'</div>'+
						'<div class="modal-body">' +
							'<div class="container" id="containerSearch"></div>' +
						'</div>' +
					'</div>' +
				'</div>';

		$('#modalPesquisa').html(html);
		$.getJSON("actions.php?action=showDisciplineSchedule&discipline="+x, function(json){
			var html = '<div class="table-responsive">' +
							'<table class="table">' +
								'<thead><tr>' +
									'<th>Horário</th><th>Segunda</th><th>Terça</th><th>Quarta</th><th>Quinta</th><th>Sexta</th><th>Sábado</th>' +
								'</tr></thead>' +
								'<tbody>';
			for (var i = 7; i <= 22; i++) {

				html += '<tr><td>'+i+':00</td><td>'+json["Monday"][i]["room"]["name"]+'<br>'+json["Monday"][i]["teacher"]["name"]+'</td><td>'+json["Tuesday"][i]["room"]["name"]+'<br>'+json["Tuesday"][i]["teacher"]["name"]+'</td><td>'+json["Wednesday"][i]["room"]["name"]+'<br>'+json["Wednesday"][i]["teacher"]["name"]+'</td><td>'+json["Thursday"][i]["room"]["name"]+'<br>'+json["Thursday"][i]["teacher"]["name"]+'</td><td>'+json["Friday"][i]["room"]["name"]+'<br>'+json["Friday"][i]["teacher"]["name"]+'</td><td>'+json["Saturday"][i]["room"]["name"]+'<br>'+json["Saturday"][i]["teacher"]["name"]+'</td></tr>';
			}

			html += '</tbody></table></div>';
			html = html.replace(/null/g, "---");
			$('.modal-title').html($(this).html());
			$('#containerSearch').html(html);
		});
   });

	$('.teacher').click(function(){
   		var x = $(this).attr('id');
   		var html = '<div class="modal-dialog">' +
						'<div class="modal-content">' +
							'<div class="modal-header">' +
								'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
								'<h4 class="modal-title"></h4>'+
							'</div>'+
						'<div class="modal-body">' +
							'<div class="container" id="containerSearch"></div>' +
						'</div>' +
					'</div>' +
				'</div>';
		$('#modalPesquisa').html(html);
		
		$.ajax({
			type: "POST",
			url: "actions.php?action=showTeacherSchedule&teacher="+x,
			dataType: 'JSON',
			data: {},
			success: function(json){
			var html = '<div class="table-responsive">' +
							'<table class="table">' +
								'<thead><tr>' +
									'<th>Horário</th><th>Segunda</th><th>Terça</th><th>Quarta</th><th>Quinta</th><th>Sexta</th><th>Sábado</th>' +
								'</tr></thead>' +
								'<tbody>';
			console.log(json);
			for (var i = 7; i <= 22; i++) {
					html += '<tr><td>'+i+':00</td><td>'+json["Monday"][i]["room"]["name"]+'<br>'+json["Monday"][i]["discipline"]["name"]+'</td><td>'+json["Tuesday"][i]["room"]["name"]+'<br>'+json["Tuesday"][i]["discipline"]["name"]+'</td><td>'+json["Wednesday"][i]["room"]["name"]+'<br>'+json["Wednesday"][i]["discipline"]["name"]+'</td><td>'+json["Thursday"][i]["room"]["name"]+'<br>'+json["Thursday"][i]["discipline"]["name"]+'</td><td>'+json["Friday"][i]["room"]["name"]+'<br>'+json["Friday"][i]["discipline"]["name"]+'</td><td>'+json["Saturday"][i]["room"]["name"]+'<br>'+json["Saturday"][i]["discipline"]["name"]+'</td></tr>';
			}

			html += '</tbody></table></div>';
			html = html.replace(/null/g, "---");
			$('.modal-title').html($(this).html());
			$('#containerSearch').html(html);
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
                        alert(errorThrown);
                    }
   });



	});});

	
});