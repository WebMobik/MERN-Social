import { ObjectId } from 'mongodb'
import { model, Schema } from 'mongoose'
import { PostSchemaDoc } from '../types'

const PostSchema = new Schema<PostSchemaDoc>({
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

export default model<PostSchemaDoc>('Post', PostSchema)
