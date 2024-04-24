import { Schema, model } from 'mongoose'
import { cleanSchemaMongoose } from '../utils/clean-schema-mongoose'
import { ThemesEntity } from '../entities/themes.entity'

const themeSchema: Schema = new Schema<ThemesEntity>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
      },
    ],
  },
  {
    collection: 'themes',
    timestamps: true,
  },
)

cleanSchemaMongoose(themeSchema)

export const Theme = model<ThemesEntity>('Themes', themeSchema)
