import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from 'src/common/constant';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  validateRequest(request: any) {
    const user = request.user;
    if (!user) return false;

    if (user.role === UserRole.ADMIN) return true;

    const params = request.params;
    if (!params || params.id === undefined) return false;

    return user.id === parseInt(params.id);
  }
}
