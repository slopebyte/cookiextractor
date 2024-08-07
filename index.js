/*!
 * @module cookiextractor
 * @version 1.0.0
 * @license MIT
 * @since 1.0.0
 * @author slobydev dev@slopebyte.com
 */


'use strict';


/**
 * @function cookiextractor
 * @description Middleware that extracts and parses cookies from Node.js Express.js server
 * @returns {Function} - Middleware that extracts and parses cookies from Node.js Express.js server
 * 
 * @example
 * const cookiextractor = require('cookiextractor');
 * expressServer.use(cookiextractor());
 */

function cookiextractor(opts = {}) {
    
    return function cookiextractor(request, response, next) {
        const _cookies = request.headers.cookie?.split("; ");
        const cookies = {};
    
        if (request.cookies || !_cookies || _cookies.length < 1) {
            if (!request.cookies) {
                request.cookies = cookies;
            }
            return next();
        }
    
        _cookies.forEach((cookie) => {
            const cookieSplitIndex = cookie.indexOf("=", 0);
            if (cookieSplitIndex !== -1) {
                const cookieKey = cookie.substring(0, cookieSplitIndex);
                const cookieValue = cookie.substring(cookieSplitIndex + 1);
    
                if (cookieKey && cookieValue && cookies[cookieKey] === undefined) {
                    cookies[cookieKey] = cookieValue;
                }
            }
        });
    
        request.cookies = cookies;
    
        next();
    }
    
}


/**
 * Expose `cookiextractor()`.
 */

module.exports = cookiextractor;