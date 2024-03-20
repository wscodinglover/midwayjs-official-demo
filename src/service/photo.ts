import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Photo } from '../entity/photo.entity';
import { PhotoMetadata } from '../entity/photoMetadata.entity';
import { Repository } from 'typeorm';

@Provide()
export class PhotoService {
  @InjectEntityModel(Photo)
  photoModel: Repository<Photo>;

  @InjectEntityModel(PhotoMetadata)
  photoMetadataModel: Repository<PhotoMetadata>;

  // 双向关联查询
  // find
  async findPhoto() {
    /*photos 的值是一个数组，包含了整个数据库的查询结果，并且每个 photo 对象都包含其关联的 metadata 属性*/
    // const photos = await this.photoModel.find({ relations: ['metadata'] }); // typeorm@0.2.x

    // QueryBuilder允许创建和执行几乎任何复杂的 SQL 查询。使用 QueryBuilder 时，请像创建 SQL 查询一样思考。在此示例中，“photo” 和 “metadata” 是应用于所选 photos 的别名。您可以使用别名来访问所选数据的列和属性
    const photos = await this.photoModel
      .createQueryBuilder('photo')
      .innerJoinAndSelect('photo.metadata', 'metadata')
      .getMany();
    return photos;
  }

  // 单向关联
  async savePhotoMeta() {
    // create a photo
    const photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.isPublished = true;

    // create a photo metadata
    const metadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = 'cybershoot';
    metadata.orientation = 'portrait';
    metadata.photo = photo; // this way we connect them

    // first we should save a photo
    await this.photoModel.save(photo);

    // photo is saved. Now we need to save a photo metadata
    await this.photoMetadataModel.save(metadata);

    // done
    console.log(
      'Metadata is saved, and relation between metadata and photo is created in the database too'
    );
  }

  // 自动保存关联的对象
  async updatePhotoCascade() {
    // create photo object
    const photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.isPublished = true;

    // create photo metadata object
    const metadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = 'cybershoot';
    metadata.orientation = 'portrait';

    photo.metadata = metadata; // this way we connect them

    // save a photo also save the metadata
    await this.photoModel.save(photo);

    // done
    console.log('Photo is saved, photo metadata is saved too');
  }

  // save
  async savePhoto() {
    // create a entity object
    const photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.views = 1;
    photo.isPublished = true;

    // save entity
    const photoResult = await this.photoModel.save(photo);

    // save success
    console.log('photo id = ', photoResult.id);
    return photoResult.id;
  }

  // 更新
  async updatePhoto() {
    const photoToUpdate = await this.photoModel.findOne({
      where: {
        id: 1,
      },
    });
    photoToUpdate.name = 'Me, my friends and polar bears';

    await this.photoModel.save(photoToUpdate);
  }

  // 删除
  async deletePhoto() {
    /*...*/
    const photo = await this.photoModel.findOne({
      where: {
        id: 1,
      },
    });

    // 删除单个
    await this.photoModel.remove(photo);
    // 删除多个
    // await this.photoModel.remove([photo1, photo2, photo3]);

    // 按 id 删除
    // await this.photoModel.delete(1);
    // await this.photoModel.delete([1, 2, 3]);
    // await this.photoModel.delete({ name: 'Timber' });

    // 软删除的方法。
    // await this.photoModel.softDelete(1);
    // 使用 restore 方法恢复;
    // await this.photoModel.restore(1);
  }
}
