<?php
	use App\Controllers\CadastroController;

	return function (App\Http\Handler $app) {
		
		// Utilizar app.com.br/api/
		$mobile = function() use ($app) {
			
			$app
				->get('/', function() use ($app) {
					echo "Teste";
				}, []);
			
			// Cadastro
			$app
				->post('/cadastrar', CadastroController::class . ':cadastro', []);
		};
		$app->group('/api', $mobile);
	};