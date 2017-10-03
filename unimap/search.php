<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>UniMap</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="css/map.css">
	<link rel="stylesheet" type="text/css" href="css/map-responsive.css">
	<script type="text/javascript">
		var get = <?php echo "\"".$_GET["term"]."\""; ?>;
	</script>
</head>
<body>
	<header>
		<div class="container">
			<div class="row">
				<div class="col-sm-4"><a href="index.html" target="_self"><h1>UniMap</h1></a></div>
				<div class="col-sm-4">
					<div class="input-group">
						<input type="text" name="search" placeholder="Pesquisar" id="inputSearch">
						<span class="input-group-btn">
							<a class="btn btn-default btn-sm" id="searchButton" href="javascript:void(0);"><i class="fa fa-search"></i></a>
						</span>
					</div>
				</div>
				<div class="col-sm-4">
					<a href="#" class="btn button" role="button" data-toggle="modal" data-target="#loginDiv"><i class="fa fa-sign-in fa-lg" aria-hidden="true"></i></a>
				</div>
			</div>
		</div>
	</header>
	<div class="modal fade" id="loginDiv" data-title="Login">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title"><i class="fa fa-sign-in" aria-hidden="true"></i></span> &nbsp;&nbsp;Login</h4>
				</div>
				<form method="POST" action="login.php">
					<div class="modal-body">
						<div class="input-group">
						  <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user" aria-hidden="true"></i></span>
						  <input type="text" class="form-control" name="email" placeholder="E-mail" aria-describedby="basic-addon1">
						</div><br>
						<div class="input-group">
						  <span class="input-group-addon" id="basic-addon1"><i class="fa fa-unlock-alt" aria-hidden="true"></i></span>
						  <input type="password" class="form-control" name="password" placeholder="Senha" aria-describedby="basic-addon1">
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
						<input type="submit" class="btn btn-success" value='Entrar'><br>
					</div>
				</form>
			</div>
		</div>
	</div> <!-- Login -->

	<section>
		<div class="container" id="main">
			<div id="results"></div>
		</div>
	</section>
	<footer></footer>
</body>
	<script type="text/javascript" src="jquery/jquery.min.js"></script>
	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<script type="text/javascript" src="jquery/map.js"></script>
	<script type="text/javascript" src="jquery/search.js"></script>
</html>