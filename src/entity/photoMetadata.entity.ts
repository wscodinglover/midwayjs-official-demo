import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  height: number;

  @Column('int')
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;

  // @OneToOne 的新装饰器。它允许我们在两个实体之间创建一对一的关系。
  // type => Photo是一个函数，它返回我们要与其建立关系的实体的类
  // 由于语言的特殊性，我们被迫使用一个返回类的函数，而不是直接使用该类。
  // 我们也可以将其写为 () => Photo ，但是我们使用 type => Photo作为惯例来提高代码的可读性。
  // 类型变量本身不包含任何内容。
  // @OneToOne(type => Photo)
  // @JoinColumn()
  // photo: Photo;

  // 关系映射可以是单向或双向的。当在 PhotoMetadata 和 Photo之间的关系是单向的。关系的所有者是PhotoMetadata，而 Photo对 PhotoMetadata 是一无所知的。这使得从 Photo 端访问 PhotoMetadata 变得很复杂。若要解决此问题，我们添加一个反向的关系映射，使 PhotoMetadata 和 Photo之间变成双向关联。让我们修改我们的实体
  @OneToOne(() => Photo, photo => photo.metadata)
  @JoinColumn()
  photo: Photo;
}
