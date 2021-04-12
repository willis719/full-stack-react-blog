function checkAuth(req, res, next) {
    // if user is not logged in send 401 error
    const { user } = req.session;
    if (!user) {
        return res.status(401).json({
            error: 'Not logged in'
        })
    } else {
        next();
    }
}

module.exports = checkAuth;