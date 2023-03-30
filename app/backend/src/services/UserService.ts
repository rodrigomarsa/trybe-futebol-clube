import authFunctions from '../utils/authFunctions';
import Users from '../database/models/UserModel';
import IUserService, { IUser, IUserWithId } from './interfaces/IUserService';
import UnauthorizedError from '../errors/UnauthorizedError';
import UserValidations from './validations/UserValidations';

export default class UserService implements IUserService {
  constructor(private model = Users) {}

  async login(login: IUser): Promise<string | null> {
    UserValidations.validateUser(login);
    const user = await this.model.findOne({ where: { email: login.email } });
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }
    const decoded = authFunctions.verifyBcrypt(login.password, user.password);
    if (!decoded) {
      throw new UnauthorizedError('Invalid email or password');
    }
    const { id, username } = user as IUserWithId;
    const token = authFunctions.createJwt({ id, username });
    return token;
  }
}
