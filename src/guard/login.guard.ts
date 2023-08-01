import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from '../user/entities/role.entity';
import { AuthType } from '../utils/custom-decorator';
declare module 'express' { 
  interface Request { 
    user: {
      username: string,
      roles:Role[]
    }
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector

  @Inject(JwtService)
  private jwtService: JwtService
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const requireLogin = this.reflector.get<AuthType>('require-auth', context.getHandler());
    //如果是require-login则返回undefined代表需要校验是否登录过， 否则返回true，不需要判断是否有authorization
    if (requireLogin == 'login' || requireLogin == 'refresh') { 
      return true
    }
    const authorization = request.headers.authorization;
    if (!authorization) { 
      throw new UnauthorizedException('用户未登录')
    }
    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);
      request.user=data.user
      return true;
    } catch (error) {
      throw new UnauthorizedException('token 失效，请重新登录'); 
    }
    return true;
  }
}
