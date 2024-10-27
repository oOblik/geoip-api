const secret = process.env.SECRET || 'test';

exports.validToken = async (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                if(authorization[1] == secret) {
                    return next();
                } else {
                    return res.status(403).send();
                }
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};