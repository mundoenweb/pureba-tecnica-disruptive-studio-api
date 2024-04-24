import { PostEntity } from '../../entities/post.entity'
import { PostFindQueryRequest } from '../../requests/post.request'

export interface IPostRepository {
  findAll: (filter?: PostFindQueryRequest) => Promise<PostEntity[]>
  findAllShort: (filter: PostFindQueryRequest) => Promise<PostEntity[]>
  findOne: (id: string) => Promise<PostEntity | null>
  create: (theme: Partial<PostEntity>) => Promise<PostEntity>
  update: (id: string, theme: Partial<PostEntity>) => Promise<PostEntity>
  delete: (id: string) => Promise<PostEntity>
}
