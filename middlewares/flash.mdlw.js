module.exports = function (req, res,next){
    
    req.flash = function(type, content){
        
        if (req.session.flash) {
            res.locals.flash = req.session.flash
            req.session.flash = undefined
        }
        
        if (req.session.flash === undefined) {
            req.session.flash = {}
        }
        req.session.flash[type] = content;
    }
    
    next()
}