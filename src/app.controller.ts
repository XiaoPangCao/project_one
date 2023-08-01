import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RequireLogin, RequirePermission } from './utils/custom-decorator';
import { getConfig } from './utils/index'
@Controller()
@RequireLogin()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @RequirePermission("删除 bbb")
  getHello(): string {
    return this.appService.getHello();
  }
}
