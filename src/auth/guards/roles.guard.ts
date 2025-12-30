import {
    CanActivate,
    ExecutionContext,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../../common/decorators/roles.decorator';
  import { Role } from '../../common/enums/role.enum';

  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        console.log("requiredRoles", requiredRoles);

        if (!requiredRoles) {
            return true;
        }
    
        const request = context.switchToHttp().getRequest();
        console.log("request", request);
        const user = request.user;
        console.log("user", user);
    
        return requiredRoles.includes(user.role);
    }
  }