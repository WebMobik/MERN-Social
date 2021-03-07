import UserModel from '../models/User'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'
import { IRequest } from '../interfaces'
import { NextFunction, Response } from 'express'
import profileImage from '../../client/assets/images/profile-pic.png'
import formidable from 'formidable'
import fs from 'fs'

const create = async (req: IRequest, res: Response) => {
  const user = new UserModel(req.body)

  try {
    await user.save()
    return res.status(200).json({
      message: 'Successfully signed up !',
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const userById = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
  id: string
) => {
  try {
    const user = await UserModel.findById(id)
    if (!user) {
      return res.status(400).json({
        error: 'User not found',
      })
    }
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve user',
    })
  }
}

const read = (req: IRequest, res: Response) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const list = async (req?: IRequest, res?: Response) => {
  try {
    const users = await UserModel.find().select('name email updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const update = async (req, res: Response) => {
  const form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Photo could not be uploaded',
      })
    }
    const user = extend(req.profile, fields)
    user.updated = Date.now()
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo['path'])
      user.photo.contentType = files.photo['type']
    }
    try {
      await user.save()
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      })
    }
  })
}

const remove = async (req: IRequest, res: Response) => {
  try {
    const user = req.profile
    const deleteUser = await user.remove()
    deleteUser.hashed_password = undefined
    deleteUser.salt = undefined
    res.json(deleteUser)
  } catch (err) {
    return err.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const photo = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.profile.photo.data) {
    res.set('Content-Type', req.profile.photo.contentType)
    return res.send(req.profile.photo.data)
  }
  next()
}

const defaultPhoto = (req: IRequest, res: Response) => {
  return res.sendFile(process.cwd() + profileImage)
}

const addFollowing = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserModel.findByIdAndUpdate(req.body.userId, {
      $push: { following: req.body.followId },
    })
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const addFollower = async (req: IRequest, res: Response) => {
  try {
    const res: any = await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $push: { followers: req.body.userId } },
      { new: true }
    )
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec()
    res.hashed_password = undefined
    res.salt = undefined
    res.json(res)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const removeFollowing = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserModel.findByIdAndUpdate(req.body.userId, {
      $pull: { following: req.body.unfollowId },
    })
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const removeFollower = async (req: IRequest, res: Response) => {
  try {
    const res: any = await UserModel.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.body.userId } },
      { new: true }
    )
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec()
    res.hashed_password = undefined
    res.salt = undefined
    res.json(res)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const findPeople = async (req: IRequest, res: Response) => {
  const following = req.profile.following
  following.push(req.profile._id)
  try {
    const users = await UserModel.find({ _id: { $nin: following } }).select(
      'name'
    )
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

export default {
  create,
  userById,
  read,
  list,
  update,
  remove,
  photo,
  defaultPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
}
