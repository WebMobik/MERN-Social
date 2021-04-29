import { NextFunction, Response } from 'express'
import { LeanDocument } from 'mongoose'
import formidable from 'formidable'
import fs from 'fs'
import { IncomingMessage } from 'http'
import PostModel from '../models/post'
import errorHandler from '../helpers/dbErrorHandler'
import { IRequest, PostSchemaDoc, ErrorRes, UserProfile, PostComment, PostLike } from '../types'

const create = (req: IRequest | IncomingMessage, res: Response<PostSchemaDoc | ErrorRes>) => {
  const form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.multiples = true
  form.parse(req as IncomingMessage, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Photo could not be uploaded',
      })
    }
    const post: PostSchemaDoc = new PostModel(fields)
    post.postedBy = (req as IRequest).profile
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo['path'])
      post.photo.contentType = files.photo['type']
    }
    try {
      await post.save()
      res.json(post)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      })
    }
  })
}

const postById = async (req: IRequest, res: Response, next: NextFunction, id: string) => {
  try {
    const post = await PostModel.findById(id)
      .populate('postedBy', '_id name')
      .exec()
    if (!post)
      return res.status(400).json({
        error: 'Post not found',
      })
    req.post = post
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const listByUser = async (req: IRequest, res: Response<PostSchemaDoc[] | ErrorRes>) => {
  try {
    const posts = await PostModel.find({ postedBy: req.profile.id })
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .sort('-created')
      .exec()
    res.json(posts)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const listNewsFeed = async (req: IRequest, res: Response<PostSchemaDoc[] | ErrorRes>) => {
  try {
    const posts = await PostModel.find({
      postedBy: { $in: req.profile.following as LeanDocument<UserProfile>[] },
    })
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .sort('-created')
      .exec()
    res.json(posts)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const remove = async (req: IRequest, res: Response<PostSchemaDoc | ErrorRes>) => {
  const post = req.post
  try {
    const deletePost = await post.remove()
    res.json(deletePost)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const photo = (req: IRequest, res: Response<Buffer>) => {
  const reqPhoto = req.post.photo
  res.set('Content-Type', reqPhoto.contentType)
  return res.json(reqPhoto.data)
}

const like = async (req: IRequest<PostLike>, res: Response<PostSchemaDoc | ErrorRes>) => {
  try {
    const result = await PostModel.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.body.userId } },
      { new: true }
    )
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const unlike = async (req: IRequest<PostLike>, res: Response<PostSchemaDoc | ErrorRes>) => {
  try {
    const result = await PostModel.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.body.userId } },
      { new: true }
    )
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const comment = async (req: IRequest<PostComment>, res: Response<PostSchemaDoc | ErrorRes>) => {
  const comment = req.body.comment
  comment.postedBy = req.body.userId
  try {
    const result = await PostModel.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment as never } },
      { new: true }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const uncomment = async (req: IRequest<PostComment>, res: Response<PostSchemaDoc | ErrorRes>) => {
  const comment = req.body.comment
  try {
    const result = await PostModel.findByIdAndUpdate(
      req.body.postId,
      { $pull: { comments: { _id: comment._id } } as { comments: never } },
      { new: true }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const isPoster = (req: IRequest, res: Response, next: NextFunction) => {
  const isPoster = req.post && req.post.postedBy._id === req.auth._id
  if (!isPoster) {
    return res.status(403).json({
      error: 'User is not authorized',
    })
  }
  next()
}

export default {
  listByUser,
  listNewsFeed,
  create,
  postById,
  remove,
  photo,
  like,
  unlike,
  comment,
  uncomment,
  isPoster,
}
