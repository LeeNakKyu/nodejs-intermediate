import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    PASSWORD_HASH_SALT_ROUNDS,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/security.costant.js';
import { AuthRepository } from '../repositories/users.repository.js';

export class AuthService {
    authRepository = new AuthRepository();

    // 회원가입 
    signup = async (email, password, passwordConfirm, name) => {
        if (!email) {
            throw new Error ('이메일 입력이 필요합니다.');
        }

        if (!password) {
            throw new Error ('비밀번호 입력이 필요합니다.');
        }

        if (!passwordConfirm) {
            throw new Error ('비밀번호 확인 입력이 필요합니다.');
        }

        if (!name) {
            throw new Error ('이름 입력이 필요합니다.');
        }

        if (password !== passwordConfirm) {
            throw new Error ('입력 한 비밀번호가 서로 일치하지 않습니다.');
        }

        let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
        const isValidEmail = emailValidationRegex.test(email);
        if (!isValidEmail) {
            throw new Error ('올바른 이메일 형식이 아닙니다');
        }

        const existedUser = await this.authRepository.findEmail(email);

        if (existedUser) {
            throw new Error ('이미 가입 된 이메일입니다.');
        }

        const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);

        const newUser = await this.authRepository.createUser(email, hashedPassword, name);

        return {
            userId: newUser.userId,
            email: newUser.email,
            name: newUser.name,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };
    };

    // 로그인
    signin = async(email, password) => {
        if (!email) {
            throw new Error ('이메일 입력이 필요합니다.');
          }
      
          if (!password) {
            throw new Error ('비밀번호 입력이 필요합니다.');
          }
        
          const user = await this.authRepository.findEmail(email);
          const hashedPassword = user.password ?? '';
          const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);

          const isCorrectUser = user && isPasswordMatched;

          if (!isCorrectUser) {
            throw new Error ('일치하는 인증 정보가 없습니다.');
          }

          const accessToken = jwt.sign({ userId: user.id }, JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
          });

          return {
            accessToken
          }
    }
}