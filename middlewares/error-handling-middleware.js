export default function (err, req, res, next) {
    console.log(err);

    res.status(500).json({errorMessage: '에러 발생'});
}