import { MongooseCRUD } from '../common/mongoose.repository'
import { MODELS } from '../../containers/types'
import { Model, PopulateOptions } from 'mongoose'
import { inject } from 'inversify'
import { IPostRepository } from './post.repository.interface'
import { PostEntity } from '../../entities/post.entity'

export class PostRepository
  extends MongooseCRUD<PostEntity>
  implements IPostRepository
{
  constructor(@inject(MODELS.post) postModel: Model<PostEntity>) {
    super({
      model: postModel,
      entity: 'publicación',
    })
  }

  async findAll(filter: Record<string, any> = {}): Promise<PostEntity[]> {
    if (filter.name) {
      filter.name = new RegExp(filter.name as string, 'i')
    }

    const posts = await this.Model.find(filter)
      .sort({ createdAt: -1 })
      .populate(this.buildPopulate())
      .exec()
      .catch((error) => this.validateError(error, 'find'))

    return posts as unknown as PostEntity[]
  }

  async findAllShort(filter: Record<string, any> = {}): Promise<PostEntity[]> {
    if (filter.name) {
      filter.name = new RegExp(filter.name as string, 'i')
    }

    const posts = await this.Model.find(filter)
      .select('-video -text -image')
      .sort({ createdAt: -1 })
      .populate(this.buildPopulate())
      .exec()
      .catch((error) => this.validateError(error, 'find'))

    return posts as unknown as PostEntity[]
  }

  async findOne(id: string): Promise<PostEntity> {
    const posts = await this.Model.findById(id)
      .populate(this.buildPopulate())
      .exec()
      .catch((error) => this.validateError(error, 'find'))

    return posts as unknown as PostEntity
  }

  async create(payload: Partial<PostEntity>): Promise<PostEntity> {
    const newModel = new this.Model(payload)
    const post = await newModel
      .save()
      .catch((error) => this.validateError(error, 'create'))

    const result = await post.populate(this.buildPopulate())

    return result.toJSON() as unknown as PostEntity
  }

  private buildPopulate(): PopulateOptions[] {
    return [
      {
        path: 'theme',
        populate: {
          path: 'categories',
          model: 'Categories',
          select: '-createdAt -updatedAt',
        },
        select: '-createdAt -updatedAt -image',
      },
      {
        path: 'user',
        select: '-rol -_id -createdAt -updatedAt',
      },
    ]
  }
}
