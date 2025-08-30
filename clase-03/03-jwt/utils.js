import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'coderhouse_secret_key_234192847319248'

export const generateToken = (user) => {
    return jwt.sign({ ...user}, PRIVATE_KEY, { expiresIn: '1h'})
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader, req.headers)
    if (!authHeader) {
        return res.status(401).json({error: 'invalid token'})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
        if (err) {
            return res.status(403).json({error: 'invalid token'})
        }

        req.user = credentials.user
        next()
    })
}
