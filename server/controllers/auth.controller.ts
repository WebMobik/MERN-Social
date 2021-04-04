import UserModel from '../models/User'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../../config/config'
import { NextFunction, Response } from 'express'
import { IRequest, UserAuth } from '../types'
import { HasAuthReq, UserAuthReq, UserAuthRes } from './types'

const signin = async (req: IRequest<UserAuthReq>, res: Response<UserAuthRes>) => {
    try {
        const user: UserAuth = await UserModel.findOne({
            'email': req.body.email
        })
        
        if (!user)
        return res.status(401).json({
            error: "User not found"
        })
        
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({
                error: 'Email and password don\'t match.'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, config.jwtSecret)

        res.cookie('t', token, {
            expires: new Date()
        })
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        return res.status(401).json({
            error: 'Could not sign in'
        })
    }
}

const signout = (req: IRequest, res: Response) => {
    res.clearCookie('t')
    return res.status(200).json({
        message: 'signed out'
    })
}

const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['HS256'],
})

const hasAuthorization = (req: IRequest<HasAuthReq>, res: Response, next: NextFunction) => {
    const authorization = req.profile && req.auth && req.profile._id == req.auth._id
    if (!authorization) {
        return res.status(403).json({
            error: 'User is not authorized'
        })
    }
    next()
}

export default {
    signin,
    signout,
    requireSignin,
    hasAuthorization
}
