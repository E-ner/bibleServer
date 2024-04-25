module.exports.getKey = (req,res,next) => {
    req.key = process.env.API_KEY
    next();
}