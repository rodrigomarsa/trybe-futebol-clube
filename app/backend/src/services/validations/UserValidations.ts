import UnauthorizedError from '../../errors/UnauthorizedError';
import { IUser } from '../interfaces/IUserService';

export default class UserValidations {
  static validateEmail(email: string): void {
    const emailValidation = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!emailValidation.test(email)) {
      throw new UnauthorizedError('Invalid email or password');
    }
  }

  static validatePassword(password: string): void {
    if (password.length < 6) {
      throw new UnauthorizedError('Invalid email or password');
    }
  }

  static validateUser(user: IUser): void {
    UserValidations.validateEmail(user.email);
    UserValidations.validatePassword(user.password);
  }
}
