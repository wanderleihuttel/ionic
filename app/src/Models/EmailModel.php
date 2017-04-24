<?php
	namespace App\Models;
    use App\Helpers\Email;
	use PDO;
	
	class EmailModel extends Model
	{
		public function recuperar(){
			$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
			
			try {
				$stmt = $this->db->prepare("SELECT `id`, `nome` FROM `loja_lojistas` WHERE `email` = :email");
				$stmt->bindValue(':email', $email, PDO::PARAM_STR);
				$stmt->execute();
				$dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
				if (count($dados) > 0) {
					$codigo = sha1(md5(uniqid(mt_rand(), true)));
					$data_expira = date('Y-m-d H:i:s', strtotime('+1 day'));
					
					$retorno = $this->cadastrar($dados[0]['id'], $dados[0]['nome'], $email, $codigo, $data_expira);					
				} else {
					$retorno['resposta'] = 'nao_encontrado';
				}
				$_SESSION['token'] = hash('sha512', rand(10, 1000));
				$retorno['token'] = $_SESSION['token'];
				return $retorno;
			} catch(PDOException $e) {
				die($e->getMessage());
			}
		}
		
		public function cadastrar($loja, $nome, $email, $codigo, $data_expira){
			try {
				$stmt = $this->db->prepare("INSERT INTO `loja_codigos` (`id_usuario`, `tipo`, `codigo`, `data`) VALUES (:loja, :tipo, :codigo, :data)");
				$stmt->bindValue(':loja', $loja, PDO::PARAM_INT);
				$stmt->bindValue(':tipo', 1, PDO::PARAM_INT);
				$stmt->bindValue(':codigo', $codigo, PDO::PARAM_STR);
				$stmt->bindValue(':data', $data_expira, PDO::PARAM_STR);
				if ($stmt->execute()) {
					$url = 'http://app.com.br/loja/codigo/'.$codigo;
					$mensagem = '<p>Olá <strong>'.$nome.'</strong>, foi solicitado ajuda para lembrar sua senha de acesso ao sistema Pague com Pontos. Não podemos enviar por e-mail pois ela é criptografada para sua segurança, <strong>MAS</strong> você pode trocá-la clicando no link abaixo. Se você não solicitou a redefinição da senha, por favor desconsidere este e-mail!</p><p><a href="'.$url.'" target="_blank">Clique aqui</a></p><br/><p>Atenciosamente, <strong>EMPRESA</strong></p><br/><p>Mensagem enviada dia <strong>'.date('d/m/Y H:i').'</strong></p>';
					
					$enviar = new Email('Esqueceu sua senha?', utf8_encode($mensagem), 'contato@teste.com.br', 'EMPRESA', $email, $nome);
                    return $enviar->enviar();
				}
			} catch(PDOException $e) {
				die($e->getMessage());
			}
		}
	}