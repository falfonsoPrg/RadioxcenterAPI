const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send({error:'Acceso denegado'})
    try {
        const verified = jwt.verify(token,process.env.JWTOKEN)
        req.user = verified
        next()
    } catch (error) {
        res.status(401).send({error:'Token invalido'})
    }
}
