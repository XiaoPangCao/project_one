import { SetMetadata } from '@nestjs/common'
export enum AuthType {
  LOGIN = 'login',
  REFRESH = 'refresh',
}

export const RequireLogin = (AuthType: AuthType) => SetMetadata('require-auth', AuthType)

export const RequirePermission = (...permissions: string[]) => SetMetadata('require-premission', permissions);
