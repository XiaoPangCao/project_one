import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Permission } from './entities/permission.entity'
import { Reflector } from '@nestjs/core';



@Injectable()
export class PermissionGuard implements CanActivate {

  @Inject(UserService)
  private userService: UserService

  @Inject(Reflector)
  private reflect: Reflector

 async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {

    const request:Request = context.switchToHttp().getRequest();
    if (!request.user) {
      return true;
    }
   const roles = await this.userService.findRolesByIds(request.user.roles.map(item => item.id))
    const permissions:Permission[] = roles.reduce((total, current) => {
      total.push(...current.permissions);
      return total;
    }, []);
   const requiredPermissions = this.reflect.getAllAndOverride('require-premission', [
     context.getClass(),
     context.getHandler()
   ])
   for (let i = 0; i < requiredPermissions.length; i++) {
     const curPermission = requiredPermissions[i];
     const found = permissions.find(item => item.name === curPermission);
     if (!found) {
       throw new UnauthorizedException('您没有访问该接口的权限');
     }
   }
    return true;
  }
}
