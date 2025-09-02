import passport from 'passport';

//const passportAuth = passport.authenticate('jwt', { session: false });

export const passportCall = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, { session: false }, (error, user, info) => {
            if (error) {
                return next(error);
            }
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized', error: info.messages ? info.messages : info.toString() });
            }
            req.user = user;
            next();
        })(req, res, next);
    }
};