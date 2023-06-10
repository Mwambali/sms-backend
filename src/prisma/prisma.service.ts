// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config/dist';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService extends PrismaClient{
//     constructor(config: ConfigService){
//         super({ //calls the constructor of the class we're extending
//             datasources: {
//                 db: {
//                     url: config.get('DATABASE_URL')
//                 },
//             },

//         });
//     }
    //teardown logic to run before our e2e test
    // cleanDb(){
    //     return this.$transaction([ //to execute in given order
    //     this.user.deleteMany(),
    //     this.bookmark.deleteMany(),
    //     ]);
    // }
// }

/*
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  get user() {
    return this.prisma.user;
  }

  get course() {
    return this.prisma.course;
  }

  get test() {
    return this.prisma.test;
  }

  get testResult() {
    return this.prisma.testResult;
  }

  get userEnrollment() {
    return this.prisma.userEnrollment;
  }

  get courseEnrollment() {
    return this.prisma.courseEnrollment;
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}

*/
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}