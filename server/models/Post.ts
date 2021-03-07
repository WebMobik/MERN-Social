import { ObjectId } from 'bson'
import { model, Schema } from 'mongoose'
import { PostDoc } from '../interfaces'

const PostSchema = new Schema({
  text: {
    type: String,
    required: 'Text is required',
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: ObjectId, ref: 'User' },
    },
  ],
  postedBy: { type: ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
})

export default model('Post', PostSchema)
