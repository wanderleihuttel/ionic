<?php
	namespace App\Models;
	use PDO;
	
	class PedidosModel extends Model
	{
        public function pedidos($cliente){
			try {
				$stmt = $this->db->prepare("
					SELECT
						`loja_pedidos`.`id`,
						`loja_pedidos`.`id_loja`,
						`loja_pedidos`.`status`,
						`loja_produtos`.`nome` as nome_produto,
						`loja_produtos`.`foto`,
						`admin_lojas`.`nome` as nome_loja,
						`admin_lojas`.`bairro`,
						`admin_lojas`.`rua`,
						`admin_lojas`.`numero`
							FROM `loja_produtos_pedidos`
								INNER JOIN `loja_pedidos` ON (`loja_pedidos`.`id` = `loja_produtos_pedidos`.`id_pedido`)
								INNER JOIN `loja_produtos` ON (`loja_produtos`.`id` = `loja_produtos_pedidos`.`id_produto`)
								INNER JOIN `admin_lojas` ON (`admin_lojas`.`id` = `loja_pedidos`.`id_loja`)

							WHERE `loja_pedidos`.`id_cliente` = :cliente
				");
				
				$stmt->bindValue(':cliente', $cliente, PDO::PARAM_INT);
				$stmt->execute();
				return $stmt->fetchAll(PDO::FETCH_ASSOC);
			} catch(PDOException $e) {
				die($e->getMessage());
			}
        }
		
		public function detalhes($loja, $pedido){
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
				$stmt->bindValue(':loja', $loja, PDO::PARAM_INT);
				$stmt->bindValue(':pedido', $pedido, PDO::PARAM_INT);
				$stmt->execute();
				
				return $stmt->fetchAll(PDO::FETCH_ASSOC);
			} catch(PDOException $e) {
				die($e->getMessage());
			}
		}
	}