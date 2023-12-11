

export class UsersController{
    
    getMyUserInfo = async( req, res, next) => {
        try {
            const me = res.locals.user;

            return res.status(200).json({
                message: '내 정보 조회에 성공했습니다.',
                data: me,
            });
        }catch(err) {
            next(err);
        }
    }
}