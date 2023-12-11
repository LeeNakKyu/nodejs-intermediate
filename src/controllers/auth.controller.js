import { AuthController } from '../controllers/auth.controller.js';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
    authService = new AuthService();

    // 회원가입
    signup = async (req, res, next) => {
        try {
            const { email, password, passwordConfirm, name } = req.body;

            const user = await this.authService.signup(email, password, passwordConfirm, name);

            return res.status(200).json({
                message: '회원가입 성공',
                data: user,
            })
        } catch (err) {
            next(err);
        }
    }


    // 로그인
    signin = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await this.authService.signin(email, password);

            return res.statsu(200).json({
                message: '로그인 성공',
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }

}
