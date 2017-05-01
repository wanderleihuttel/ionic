<?php
	namespace App\Models;
	use PDO;
	
	class CadastroModel extends Model
	{
        public function cadastro($nome, $sobrenome, $telefone, $email, $senha){			
			$senha_criptografada = password_hash($senha, PASSWORD_BCRYPT, ['cost' => 12]);
			
			$nome_completo = $nome.' '.$sobrenome;
			$peaces = explode(' ', $nome_completo);
			$letras = $peaces[0][0].''.$peaces[count($peaces) - 1][0];
			$numero = substr($telefone, (strlen($telefone) - 4), strlen($telefone));
			$codigo = $letras.$numero;
			
			$stmt = $this->db->prepare("SELECT `email` FROM `loja_clientes` WHERE `email` = :email");
			$stmt->bindValue(':email', $email, PDO::PARAM_STR);
			$stmt->execute();
			$conta = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($conta) > 0) {
				$retorno = array('resposta' => 'email_existente');
			} else {
				$stmt = $this->db->prepare("INSERT INTO `loja_clientes` (`codigo`, `nome`, `sobrenome`, `email`, `senha`, `lixeira`) VALUES (:codigo, :nome, :sobrenome, :email, :senha, :lixeira)");
				$stmt->bindValue(':codigo', $codigo, PDO::PARAM_STR);
				$stmt->bindValue(':nome', $nome, PDO::PARAM_STR);
				$stmt->bindValue(':sobrenome', $sobrenome, PDO::PARAM_STR);
				$stmt->bindValue(':email', $email, PDO::PARAM_STR);
				$stmt->bindValue(':senha', $senha_criptografada, PDO::PARAM_STR);
				$stmt->bindValue(':lixeira', 0, PDO::PARAM_INT);
				if ($stmt->execute()) {
					$retorno = array('resposta' => 'cadastrou');
				}
			}
			return $retorno;
		}
	}