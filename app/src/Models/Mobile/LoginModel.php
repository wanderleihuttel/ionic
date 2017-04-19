<?php
	namespace App\Models;
	use PDO;
	
	class LoginModel extends Model
	{
		public function login($email, $senha){			
			$stmt = $this->db->prepare("SELECT `codigo`, `email`, `senha` FROM `loja_cliente` WHERE `lojista`.`email` = :email");
			$stmt->bindValue(':email', $email, PDO::PARAM_STR);
			$stmt->execute();
			$dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($dados) == 1) {
				if (password_verify($senha, $dados[0]['senha'])) {
					$retorno['codigo'] = $dados[0]['codigo'];
					$retorno['resposta'] = 'logou';
				}
			} else {
				$retorno['resposta'] = 'login_invalido';
			}
			return $retorno;
		}
	}