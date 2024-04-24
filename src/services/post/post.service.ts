import { inject, injectable } from 'inversify'
import { REPOSITORIES } from '../../containers/types'
import { IPostService } from './post.service.interface'
import { IPostRepository } from '../../repositories/posts/post.repository.interface'
import { PostEntity } from '../../entities/post.entity'
import { PostFindQueryRequest } from '../../requests/post.request'

@injectable()
export class PostService implements IPostService {
  constructor(
    @inject(REPOSITORIES.post)
    private readonly postRepository: IPostRepository,
  ) {}

  async findOne(id: string): Promise<PostEntity | null> {
    return await this.postRepository.findOne(id)
  }

  async findAll(query: PostFindQueryRequest): Promise<PostEntity[]> {
    return await this.postRepository.findAll(query)
  }

  async findAllShort(query: PostFindQueryRequest): Promise<PostEntity[]> {
    return await this.postRepository.findAllShort(query)
  }

  async create(data: PostEntity): Promise<PostEntity> {
    const result = await this.postRepository.create(data)
    return result
  }

  async update(id: string, data: Partial<PostEntity>): Promise<PostEntity> {
    const result = await this.postRepository.update(id, data)
    return result
  }

  async delete(id: string): Promise<PostEntity | null> {
    return await this.postRepository.delete(id)
  }
}
