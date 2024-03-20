import { Inject, Controller, Get, Post, Query } from '@midwayjs/core';
import { Context } from 'egg';
import { PhotoService } from '../service/photo';

@Controller('/photo')
export class PhotoController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: PhotoService;

  @Post('/get_photo')
  async getUser(@Query('uid') uid: string): Promise<any> {
    const user = await this.userService.findPhoto();
    return { success: true, message: 'OK', data: user };
  }

  @Get('/save')
  async saveItem(): Promise<any> {
    const user = await this.userService.savePhoto();
    return { success: true, message: 'OK', data: user };
  }

  @Get('/save-cascade')
  async saveCascadeItem(): Promise<any> {
    const user = await this.userService.updatePhotoCascade();
    return { success: true, message: 'OK', data: user };
  }
}
