import { Schema, model } from 'mongoose'
import { cleanSchemaMongoose } from '../utils/clean-schema-mongoose'
import { UserEntity } from '../entities/user.entity'

const userSchema: Schema = new Schema<UserEntity>(
  {
    rol: {
      type: String,
      required: true,
      ref: 'Roles',
    },
    credits: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
)

cleanSchemaMongoose(userSchema)

export const User = model<UserEntity>('Users', userSchema)
