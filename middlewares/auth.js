const apiSecret = process.env.SECRET || 'test';

exports.validToken = async (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send('Unauthorized');
            } else {
                if(authorization[1] === apiSecret) {
                    return next();
                } else {
                    return res.status(403).send('Forbidden');
                }
            }
        } catch (err) {
            return res.status(403).send('Forbidden');
        }
    } else {
        return res.status(401).send('Unauthorized');
    }
};