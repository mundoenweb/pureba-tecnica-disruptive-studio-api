import { PostEntity } from '../../entities/post.entity'
import { PostFindQueryRequest } from '../../requests/post.request'

export interface IPostService {
  create: (body: PostEntity) => Promise<PostEntity>
  update: (id: string, body: Partial<PostEntity>) => Promise<PostEntity>
  findAll: (filter: PostFindQueryRequest) => Promise<PostEntity[]>
  findAllShort: (filter: PostFindQueryRequest) => Promise<PostEntity[]>
  findOne: (id: string) => Promise<PostEntity | null>
  delete: (id: string) => Promise<PostEntity | null>
}
