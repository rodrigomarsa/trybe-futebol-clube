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
    if (!user || !authFunctions.verifyBcrypt(login.password, user.password)) {
      throw new UnauthorizedError('Invalid email or password');
    }
    const { id, username, role } = user as IUserWithId;
    const token = authFunctions.createJwt({ id, username, role });
    return token;
  }
}
