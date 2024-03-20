import { MigrationInterface, QueryRunner } from 'typeorm';

export class Photo1689930402558 implements MigrationInterface {
  name = 'Photo1689930402558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `photo_metadata` (`id` int NOT NULL AUTO_INCREMENT, `height` int NOT NULL, `width` int NOT NULL, `orientation` varchar(255) NOT NULL, `compressed` tinyint NOT NULL, `comment` varchar(255) NOT NULL, `photoId` int NULL, UNIQUE INDEX `REL_99f01ed52303cc16139d69f746` (`photoId`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'CREATE TABLE `photo_test` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `description` text NOT NULL, `filename` varchar(255) NOT NULL, `views` double NOT NULL, `isPublished` tinyint NOT NULL, `createdDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleteDate` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'ALTER TABLE `photo_metadata` ADD CONSTRAINT `FK_99f01ed52303cc16139d69f7464` FOREIGN KEY (`photoId`) REFERENCES `photo_test`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `photo_metadata` DROP FOREIGN KEY `FK_99f01ed52303cc16139d69f7464`'
    );
    await queryRunner.query('DROP TABLE `photo_test`');
    await queryRunner.query(
      'DROP INDEX `REL_99f01ed52303cc16139d69f746` ON `photo_metadata`'
    );
    await queryRunner.query('DROP TABLE `photo_metadata`');
  }
}
