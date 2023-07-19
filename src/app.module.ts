import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalConfig } from "./utils/GlobalMethods";
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './utils/database'
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true
    }),
    TypeOrmModule.forRoot(databaseConfig),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule implements OnApplicationBootstrap {
  onApplicationBootstrap() { 
    GlobalConfig()
  }

}
