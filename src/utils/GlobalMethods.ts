import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import {ValidationPipe} from '@nestjs/common'
import { AllExceptionsFilter } from "src/filter/any-exception.filter";
import { TransformInterceptor } from '../interceptors/transform/transform.interceptor';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import * as packageConfig from "../../package.json";


export const GlobalConfig = () => { 
  global.app.useGlobalInterceptors(new TransformInterceptor())
  global.app.useGlobalFilters(new AllExceptionsFilter());
  global.app.useGlobalFilters(new HttpExceptionFilter());
  global.app.useGlobalPipes(new ValidationPipe())
  generateDocument()
}

//配置swagger方法
const generateDocument = () => {
  const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .build();
  const document = SwaggerModule.createDocument(global.app, options);
  SwaggerModule.setup('/api/doc', global.app, document);
}

