const ERROR_HANDLER = {
    CastError: (res) => 
        res.status(400).send({"message":'Id used is invalid'}),
    JsonWebTokenError: (res) => 
        res.status(400).send({"message":'Token used is invalid'}),
    TokenExpiredError: (res) => 
        res.status(400).send({"message":'Token used is expired'}),
    SyntaxError: (res) => 
        res.status(400).send({"message":'Data type is invalid'}),
    TypeError: (res) => 
        res.status(400).send({"message":'Type is invalid'}),
    defaultError : (res) => 
        res.status(500).end()
}

module.exports = (error, req, res, next) => {
    console.error(error.name);
    const handler = ERROR_HANDLER[error.name];
    // handler(res, error);
}