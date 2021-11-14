import { User } from 'src/users/entities/user.entity';
import { UserState } from './constant';

export default function isBlocked(user: User) {
  return user.active === UserState.BLOCKED;
}
