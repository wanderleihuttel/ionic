<?php
	use App\Controllers\CadastroController;
	use App\Controllers\LoginController;
	use App\Controllers\PedidosController;

	return function (App\Http\Handler $app) {
		
		// Utilizar app.com.br/api/
		$mobile = function() use ($app) {
			
			// Cadastro
			$app->post('/cadastrar', CadastroController::class . ':cadastro', []);
			
			// Login
			$app->post('/logar', LoginController::class . ':login', []);
			
			// Pedidos
			$app
				->post('/pedidos', PedidosController::class . ':pedidos', [])
				->post('/pedir', PedidosController::class . ':pedir', []);
		};
		$app->group('/api', $mobile);
	};