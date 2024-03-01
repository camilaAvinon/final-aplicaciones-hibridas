const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authorization = req.get('authorization');
        
        let token = null;
        if(authorization && authorization.toLowerCase().startsWith('bearer')){
            token = authorization.split(' ')[1];
        }
        
        const decodedToken = jwt.verify(token, process.env.KEY, {expiresIn: 60*60*24*7})
        if (!token || !decodedToken){
            return res.status(401).json({error: 'invalid or missing token'})
        }
        
        const {id: userId} = decodedToken;
        req.userId = userId;
        next();
}