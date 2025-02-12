const ApiError = require("../error/ApiError");
const tokenService = require("../service/tokenService");

module.exports = function (requiredRole) {
    return function (req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(ApiError.unathorizedError());
            }
            
            const accessToken = authorizationHeader.split(' ')[1];
            if(!accessToken) {
                return next(ApiError.unathorizedError());
            }
        
            const userData = tokenService.validateAccessToken(accessToken);
            if(!userData) {
                return next(ApiError.unathorizedError());
            }
    
            if(userData.role !== requiredRole) {
                return next(ApiError.forbiden())
            }
        
            req.user = userData;
            next();
        
          }  catch (e) {
            return next(ApiError.unathorizedError());
        
          }
    }
    
}