import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject } from '@nestjs/common';
import {UserInfo} from './dto/UserInfo.dto'
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt/dist';

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService
  constructor(private readonly userService: UserService) { }
  
  @ApiOperation({summary:'初始化数据'})
  @Post('initData')
  async initData() { 
    await this.userService.initData();
  }
  @ApiOperation({ summary: '登录接口' })
    @Post('login')
 async login(@Body() userInfo: UserInfo) { 
    const user = await this.userService.Login(userInfo);
    const token = this.jwtService.sign({
      user: {
        username: user.username,
        roles: user.roles,
      }
    })
    return token;
  }
  @ApiOperation({ summary: '查询数据' })
  @Get('finall')
  FindAll(@Query() query) { 
    return query
  }
}