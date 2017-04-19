<?php
	use App\Controllers\Mobile\CadastroController as MobileCadastroController;
	use App\Controllers\Mobile\LoginController as MobileLoginController;

	return function (App\Http\Handler $app) {
		
		// Utilizar app.com.br/api/
		$mobile = function() use ($app) {
			
			$app
				->get('/', function() use ($app) {
					echo "Principal";
				}, []);
			
			// Cadastro
			$app
				->post('/cadastrar', MobileCadastroController::class . ':cadastro', []);
			
			// Login
			$app
				->post('/logar', MobileLoginController::class . ':login', [])
				->post('/esqueci/senha', MobileLoginController::class . ':esqueci_senha', []);
		};
		$app->group('/api', $mobile);
	};