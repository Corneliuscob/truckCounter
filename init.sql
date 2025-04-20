-- Trucks.TruckHits definition

CREATE TABLE IF NOT EXISTS `TruckHits` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `date` date NOT NULL,
  `linkto` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;