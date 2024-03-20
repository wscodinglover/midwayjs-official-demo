import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1689311745960_1831',
    egg: {
      port: 7007,
      hostname: '0.0.0.0',
    },
    // security: {
    //   csrf: false,
    // },
    typeorm: {
      dataSource: {
        default: {
          /**
           * 单数据库实例
           */
          type: 'mysql',
          // host: '150.158.2.212',
          host: '127.0.0.1',
          port: 3306,
          username: 'root',
          password: '123456',
          database: 'learning',
          synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
          logging: true,
          // dateStrings: true, // 配置 dateStrings 可以使 mysql 返回时间按 DATETIME 格式返回，只对 mysql 生效。

          // 配置实体模型
          // entities: [Photo],

          // 或者扫描形式
          entities: ['**/entity/*.entity{.ts,.js}'],

          // 迁移文件
          migrations: ['**/migration/*.ts'],
        },
      },
    },
  } as MidwayConfig;
};
