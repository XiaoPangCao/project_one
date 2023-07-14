import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication, ExpressAdapter } from "@nestjs/platform-express";
import { GlobalConfig } from "./utils/Profile";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  global.app = app
  GlobalConfig()
  await app.listen(3000);
}
bootstrap();
