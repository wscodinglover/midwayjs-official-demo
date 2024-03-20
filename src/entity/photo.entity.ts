import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { PhotoMetadata } from './photoMetadata.entity';

// 表名和当前的实体名不同，可以在参数中指定
@Entity('photo_test')
export class Photo {
  // 要使列成为主键，您需要使用 @PrimaryColumn 装饰器
  // 要设置自增的 id 列，需要将 @PrimaryColumn 装饰器更改为 @PrimaryGeneratedColumn 装饰器
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  // 不同列名设置
  // @Column({
  //   length: 100,
  //   name: 'custom_name'
  // })
  @Column('double')
  views: number;

  @Column()
  isPublished: boolean;

  // 特殊列
  // @CreateDateColumn 是一个特殊列，自动为实体插入日期。
  // @UpdateDateColumn 是一个特殊列，在每次调用实体管理器或存储库的save时，自动更新实体日期。
  // @VersionColumn 是一个特殊列，在每次调用实体管理器或存储库的save时自动增长实体版本（增量编号）。
  // @DeleteDateColumn 是一个特殊列，会在调用 soft-delete（软删除）时自动设置实体的删除时间。

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdDate: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateDate: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deleteDate: Date;

  // 关系映射可以是单向或双向的。当在 PhotoMetadata 和 Photo之间的关系是单向的。关系的所有者是PhotoMetadata，而 Photo对 PhotoMetadata 是一无所知的。这使得从 Photo 端访问 PhotoMetadata 变得很复杂。若要解决此问题，我们添加一个反向的关系映射，使 PhotoMetadata 和 Photo之间变成双向关联。让我们修改我们的实体
  // @OneToOne(() => PhotoMetadata, photoMetadata => photoMetadata.photo)
  // metadata: PhotoMetadata;

  // 在我们希望在每次保存另一个对象时都自动保存关联的对象，
  // 这个时候可以在关系中设置级联。
  @OneToOne(type => PhotoMetadata, metadata => metadata.photo, {
    cascade: true,
  })
  metadata: PhotoMetadata;
}
