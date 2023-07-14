import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true
    })],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }