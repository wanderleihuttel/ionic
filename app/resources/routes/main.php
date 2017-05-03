<?php
	use App\Controllers\CadastroController;
	use App\Controllers\LoginController;
	use App\Controllers\PedidosController;
	use App\Controllers\PesquisaController;
	use App\Controllers\ProdutosController;

	return function (App\Http\Handler $app) {
		
		// Utilizar app.com.br/api/
		$mobile = function() use ($app) {
			
			// Cadastro
			$app->post('/cadastrar', CadastroController::class . ':cadastro', []);
			
			// Login
			$app->post('/logar', LoginController::class . ':login', []);
			
			// Pedidos
			$app->post('/pedidos', PedidosController::class . ':pedidos', []);
			
			// Detalhes
			$app->post('/detalhes', PedidosController::class . ':detalhes', []);
			
			// Pesquisa
			$app->post('/pesquisa', PesquisaController::class . ':pesquisa', []);
			
			// Produtos
			$app->post('/produtos', ProdutosController::class . ':produtos', []);
		};
		$app->group('/api', $mobile);
	};