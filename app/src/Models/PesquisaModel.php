<?php
	namespace App\Models;
	use PDO;
	
	class PesquisaModel extends Model
	{
		public function loja($loja){
			$retorno['resposta'] = 'erro';

			$stmt = $this->db->prepare("
					SELECT
						`admin_lojas`.`id`,
						`admin_lojas`.`nome`,
						`admin_lojas`.`cidade`,
						`admin_cidades`.`nome` as nome_cidade
							FROM `admin_lojas`
								INNER JOIN `admin_cidades` ON (`admin_cidades`.`id` = `admin_lojas`.`cidade`)
						WHERE `admin_lojas`.`nome` LIKE :nome LIMIT 5
			");
			$stmt->bindValue(':nome', '%'.$loja.'%', PDO::PARAM_STR);
			$stmt->execute();
			
			$dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			if (count($dados) > 0) {
				$retorno = array('loja' => $dados);
			}
			return $retorno;
		}
		
		public function produto($loja, $produto){
			$retorno['resposta'] = 'erro';

			$stmt = $this->db->prepare("
				SELECT `id`, `foto`, `nome` FROM `loja_produtos` WHERE `nome` LIKE :nome AND `id_loja` = :loja LIMIT 3
			");
			$stmt->bindValue(':loja', $loja, PDO::PARAM_INT);
			$stmt->bindValue(':nome', '%'.$produto.'%', PDO::PARAM_STR);
			$stmt->execute();
			
			$dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			if (count($dados) > 0) {
				$retorno = array('produtos' => $dados);
			}
			return $retorno;
		}
	}