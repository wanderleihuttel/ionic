<?php
	namespace App\Models;
	use PDO;
	
	class LoginModel extends Model
	{
		public function login($email, $senha){			
			$stmt = $this->db->prepare("SELECT `codigo`, `nome`, `sobrenome`, `email`, `senha` FROM `loja_clientes` WHERE `email` = :email");
			$stmt->bindValue(':email', $email, PDO::PARAM_STR);
			$stmt->execute();
			$dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($dados) == 1) {
				if (password_verify($senha, $dados[0]['senha'])) {
					// Gravar o codigo, nome, sobrenome e e-mail no SQLite [Ionic]
					
					$retorno = array(
						'resposta' => 'logou',
						'codigo' => $dados[0]['codigo'],
						'nome' => $dados[0]['nome'],
						'sobrenome' => $dados[0]['sobrenome'],
						'email' => $dados[0]['email']
					);
				}
			} else {
				$retorno['resposta'] = 'login_invalido';
			}
			return $retorno;
		}
	}