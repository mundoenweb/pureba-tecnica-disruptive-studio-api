import { fluentProvide } from 'inversify-binding-decorators'
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Post,
  Put,
  Request,
  Route,
} from 'tsoa'
import { validateClassValidator } from '../middlewares/validateClassValidator.middleware'
import {
  PostFindQueryRequest,
  PostRequest,
  PostUpdateRequest,
} from '../requests/post.request'
import { SERVICES } from '../containers/types'
import { IPostService } from '../services/post/post.service.interface'
import { inject } from 'inversify'
import { PostEntity } from '../entities/post.entity'
import { IUserService } from '../services/user/user.service.interface'
import { Request as Req } from 'express'
import { groupPermissions } from '../constants/dictionary.constant'
import { auth } from '../middlewares/auth.middleware'
import { FieldsToUpdateException } from '../errors/fieldsToUpdate.exception'

@fluentProvide(PostsController).done()
@Route('posts')
export class PostsController extends Controller {
  constructor(
    @inject(SERVICES.user)
    private readonly userService: IUserService,
    @inject(SERVICES.post)
    private readonly postService: IPostService,
  ) {
    super()
  }

  @Middlewares(
    auth(groupPermissions.creator),
    validateClassValidator('body', PostRequest),
  )
  @Post()
  async create(@Body() body: PostRequest): Promise<PostEntity> {
    await this.userService.update(body.user, { credits: 1 })
    const newPost = await this.postService.create(body)
    return newPost
  }

  @Middlewares(
    auth(groupPermissions.all),
    validateClassValidator('query', PostFindQueryRequest),
  )
  @Get()
  async findAll(@Request() req: Req): Promise<PostEntity[]> {
    const themes = await this.postService.findAll(
      req.query as unknown as PostFindQueryRequest,
    )
    return themes
  }

  @Middlewares(validateClassValidator('query', PostFindQueryRequest))
  @Get('short')
  async findAllShort(@Request() req: Req): Promise<PostEntity[]> {
    const themes = await this.postService.findAllShort(
      req.query as unknown as PostFindQueryRequest,
    )
    return themes
  }

  @Middlewares(auth(groupPermissions.all))
  @Get('{id}')
  async findOne(id: string): Promise<PostEntity | null> {
    const theme = await this.postService.findOne(id)
    return theme
  }

  @Middlewares(
    auth(groupPermissions.creator),
    validateClassValidator('body', PostUpdateRequest),
  )
  @Put('{id}')
  async updateTheme(
    id: string,
    @Body() body: PostUpdateRequest,
  ): Promise<PostEntity> {
    const qtyFieldsUpdated = Object.values(body).filter(Boolean).length
    if (qtyFieldsUpdated === 0) throw new FieldsToUpdateException()

    return await this.postService.update(id, body)
  }

  @Middlewares(auth(groupPermissions.admin))
  @Delete('{id}')
  async deleteTheme(id: string): Promise<PostEntity | null> {
    return await this.postService.delete(id)
  }
}
