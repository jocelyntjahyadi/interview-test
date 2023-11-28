import { UserService } from 'src/user/service/user/user.service';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';



export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
