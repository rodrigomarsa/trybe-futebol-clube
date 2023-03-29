// import BadRequestError from '../../errors/BadRequestError';
// import NotFoundError from '../../errors/NotFoundError';
// import { User } from '../../service/interfaces/IUserService';
// import IUserValidations from './interface/user-validations';

// export default class UserValidations implements IUserValidations {
//   validateUsername = (username: string): void => {
//     if (username.length <= 3) {
//       throw new BadRequestError('username precisa ter mais que 3 caracteres');
//     }
//   };

//   validateEmail(email: string): void {
//     const emailValidation = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
//     if (!emailValidation.test(email)) {
//       throw new BadRequestError('email deve ser um email válido')
//     }
//   }

//   validatePassword(password: string): void {
//     if (password.length < 6) {
//       throw new BadRequestError('password deve ter ao menos 6 caracteres')
//     }
//   }

//   validateAge(age: number): void {
//     if (age < 18) {
//       throw new NotFoundError('Pessoas usuárias devem ser maiores de idade')
//     }
//   }

//   validateUser(user: User): void {
//     this.validateUsername(user.username);
//     this.validateEmail(user.email);
//     this.validatePassword(user.password)
//     this.validateAge(user.age)
//   }
// }
