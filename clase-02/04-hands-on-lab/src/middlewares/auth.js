export function checkAuth({ mustBeLoggedIn }) {
    return (req, res, next) => {
        const isLogged = !!req.session.user;

        if (mustBeLoggedIn && !isLogged) {
            return res.redirect('/');
        }

        if (!mustBeLoggedIn && isLogged) {
            return res.redirect('/productos');
        }

        next();
    };
}
