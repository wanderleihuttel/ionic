<?php
	namespace App\Models;
	use PDO;
	
	class DetalhesModel extends Model
	{		
		public function pedido($estabelecimento, $pedido){
			try {				
				$stmt = $this->db->prepare("
					SELECT
						`loja_fotos_produto`.`foto`
							FROM `loja_produtos_pedidos`
								INNER JOIN `admin_lojas` ON (`admin_lojas`.`id` = `loja_produtos_pedidos`.`id_loja`)
								INNER JOIN `loja_pedidos` ON (`loja_pedidos`.`id` = `loja_produtos_pedidos`.`id_pedido`)
								INNER JOIN `loja_produtos` ON (`loja_produtos`.`id` = `loja_produtos_pedidos`.`id_produto`)
								INNER JOIN `loja_fotos_produto` ON (`loja_fotos_produto`.`id_produto` = `loja_produtos`.`id`)

							WHERE `loja_pedidos`.`id` = :pedido AND `admin_lojas`.`id` = :loja
				");
				$stmt->bindValue(':loja', $estabelecimento, PDO::PARAM_INT);
				$stmt->bindValue(':pedido', $pedido, PDO::PARAM_INT);
				$stmt->execute();
				
				return $stmt->fetchAll(PDO::FETCH_ASSOC);
			} catch(PDOException $e) {
				die($e->getMessage());
			}
		}
		
		public function produto($estabelecimento, $produto){
			try {				
				$stmt = $this->db->prepare("
					SELECT
						`loja_fotos_produto`.`foto`
							FROM `loja_produtos`
								INNER JOIN `admin_lojas` ON (`admin_lojas`.`id` = `loja_produtos`.`id_loja`)
								INNER JOIN `loja_fotos_produto` ON (`loja_fotos_produto`.`id_produto` = `loja_produtos`.`id`)

							WHERE `loja_produtos`.`id` = :produto AND `admin_lojas`.`id` = :loja
				");
				$stmt->bindValue(':loja', $estabelecimento, PDO::PARAM_INT);
				$stmt->bindValue(':produto', $produto, PDO::PARAM_INT);
				$stmt->execute();
				
				return $stmt->fetchAll(PDO::FETCH_ASSOC);
			} catch(PDOException $e) {
				die($e->getMessage());
			}
		}
	}