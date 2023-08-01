import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject, UnauthorizedException } from '@nestjs/common';
import {UserInfo} from './dto/UserInfo.dto'
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt/dist';
import { RequireLogin,AuthType } from 'src/utils/custom-decorator';

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
  @RequireLogin(AuthType.LOGIN)
  @Post('login')
 async login(@Body() userInfo: UserInfo) { 
    const user = await this.userService.Login(userInfo);
    const access_token = this.jwtService.sign(
      {
        userId: user.id,
        roles: user.roles,
      },
      {
        expiresIn:'30m'
      }
    )
    const refresh_token = this.jwtService.sign(
      {
        userId: user.id,
        roles: user.roles,
      },
      {
        expiresIn: '7d'
      }
    )
    
    return {
      access_token, refresh_token
    };
  }
  @ApiOperation({ summary: '查询数据' })
  @Get('finall')
  FindAll(@Query() query) { 
    return query
  }

  @ApiOperation({ summary: 'token刷新' })
  @RequireLogin(AuthType.REFRESH)
  @Get('refresh')
  async Refresh(@Query('refresh_token') refreshtoken: string) { 
    try {
      const data = await this.jwtService.verify(refreshtoken);
      console.log(data);
      const user = await this.userService.findUserById(data.userId)
      console.log('object',user);
      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          roles: user.roles,
        },
        {
          expiresIn: '30m'
        }
      )
      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
          roles: user.roles,
        },
        {
          expiresIn: '7d'
        }
      )
      return {
        access_token,
        refresh_token
      }
    } catch (error) {
      throw new UnauthorizedException('token已失效，请重新登录')
      
    }
  }
}``