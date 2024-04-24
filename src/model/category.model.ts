import { Schema, model } from 'mongoose'
import { cleanSchemaMongoose } from '../utils/clean-schema-mongoose'
import { CategoryEntity } from '../entities/category.entity'

const categorySchema: Schema = new Schema<CategoryEntity>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    collection: 'categories',
    timestamps: true,
  },
)

cleanSchemaMongoose(categorySchema)

export const Category = model<CategoryEntity>('Categories', categorySchema)
