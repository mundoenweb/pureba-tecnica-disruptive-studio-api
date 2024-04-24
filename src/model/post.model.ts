import { Schema, model } from 'mongoose'
import { cleanSchemaMongoose } from '../utils/clean-schema-mongoose'
import { PostEntity } from '../entities/post.entity'

const postSchema: Schema = new Schema<PostEntity>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    image: String,
    video: String,
    text: String,
    theme: {
      type: Schema.Types.ObjectId,
      ref: 'Themes',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  {
    collection: 'posts',
    timestamps: true,
  },
)

cleanSchemaMongoose(postSchema)

export const Post = model<PostEntity>('Posts', postSchema)
