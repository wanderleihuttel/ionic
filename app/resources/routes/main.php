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
			$app->get('/pedidos', PedidosController::class . ':pedidos', []);
			
			// Detalhes do pedido
			$app->get('/pedido', DetalhesController::class . ':pedido', []);
			
			// Pesquisa pela loja
			$app->get('/pesquisa/estabelecimento', PesquisaController::class . ':estabelecimento', []);
			
			// Pesquisa pelo produto da loja
			$app->get('/pesquisa/produto', PesquisaController::class . ':produto', []);
			
			// Produtos
			$app->get('/produtos', ProdutosController::class . ':produtos', []);
			$app->get('/produtos-categoria', ProdutosController::class . ':produtos_categoria', []);
			
			// Detalhes do produto
			$app->get('/produto', DetalhesController::class . ':produto', []);
			
			// Carregar mais
			$app->get('/carregar-mais/:qtd', function ($qtd) use ($app) {
				return $app->resolve(ProdutosController::class, 'carregar_mais', $qtd);
			}, []);
		};
		$app->group('/api', $mobile);
	};