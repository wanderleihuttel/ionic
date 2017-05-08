<?php
	namespace App\Models;
	use PDO;
	
	class PesquisaModel extends Model
	{
		public function pesquisa($loja){
			$retorno['resposta'] = 'erro';
			
			/*
				SELECT `id`, `nome`, `cidade`
				FROM `admin_lojas` WHERE `nome` LIKE :nome
				LIMIT 5
			*/
			$stmt = $this->db->prepare("
					SELECT
						`admin_lojas`.`id`,
						`admin_lojas`.`nome`,
						`admin_lojas`.`cidade`,
						`admin_cidades`.`nome` as nome_cidade
							FROM `admin_lojas`
								INNER JOIN `admin_cidades` ON (`admin_cidades`.`id` = `admin_lojas`.`cidade`)
						WHERE `nome` LIKE :nome LIMIT 5
			");
			$stmt->bindValue(':nome', '%'.$loja.'%', PDO::PARAM_STR);
			$stmt->execute();
			
			$dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			if (count($dados) > 0) {
				$retorno = array('loja' => $dados);
			}
			return $retorno;
		}
	}