<?php
	use App\Controllers\CadastroController;
	use App\Controllers\LoginController;
	use App\Controllers\PedidosController;
	use App\Controllers\PesquisaController;
	use App\Controllers\ProdutosController;
	use App\Controllers\DetalhesController;

	return function (App\Http\Handler $app) {
		
		// Utilizar app.com.br/api/
		$mobile = function() use ($app) {
			
			// Cadastro
			$app->post('/cadastrar', CadastroController::class . ':cadastro', []);
			
			// Login
			$app->post('/logar', LoginController::class . ':login', []);
			
			// Pedidos
			$app->post('/pedidos', PedidosController::class . ':pedidos', []);
			
			// Detalhes do pedido
			$app->post('/pedido', DetalhesController::class . ':pedido', []);
			
			// Pesquisa pela loja
			$app->post('/pesquisa/estabelecimento', PesquisaController::class . ':estabelecimento', []);
			
			// Pesquisa pelo produto da loja
			$app->post('/pesquisa/produto', PesquisaController::class . ':produto', []);
			
			// Produtos
			$app->post('/produtos', ProdutosController::class . ':produtos', []);
			$app->post('/produtos-categoria', ProdutosController::class . ':produtos_categoria', []);
			
			// Detalhes do produto
			$app->post('/produto', DetalhesController::class . ':produto', []);
			
			// Carregar mais
			$app->get('/carregar-mais/:qtd', function ($qtd) use ($app) {
				return $app->resolve(ProdutosController::class, 'carregar_mais', $qtd);
			}, []);
		};
		$app->group('/api', $mobile);
	};