import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalConfig } from "./utils/GlobalMethods";
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './utils/database'
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt'
import { LoginGuard } from './guard/login.guard';
import { PermissionGuard } from './guard/permission.guard';
@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true}),
    TypeOrmModule.forRoot(databaseConfig),
    JwtModule.register({ global: true, secret: 'xiaocao', signOptions: {expiresIn:'7d'} }),
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:APP_GUARD,
      useClass:LoginGuard
    }, {
      provide: APP_GUARD,
      useClass:PermissionGuard
    }
  ],
})
export class AppModule implements NestModule {
configure(consumer: MiddlewareConsumer) {
  GlobalConfig()
}

}
