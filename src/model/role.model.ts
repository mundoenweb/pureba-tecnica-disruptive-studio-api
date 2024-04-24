import { Schema, model } from 'mongoose'
import { cleanSchemaMongoose } from '../utils/clean-schema-mongoose'
import { RoleEntity } from '../entities/role.entity'

const userSchema: Schema = new Schema<RoleEntity>(
  {
    role: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    collection: 'roles',
    timestamps: true,
  },
)

cleanSchemaMongoose(userSchema)

export const Rol = model<RoleEntity>('Roles', userSchema)
