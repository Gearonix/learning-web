import { CACHE_MANAGER }    from '@nestjs/cache-manager'
import { CacheKey }         from '@nestjs/cache-manager'
import { CacheTTL }         from '@nestjs/cache-manager'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller }       from '@nestjs/common'
import { UseInterceptors }  from '@nestjs/common'
import { Inject }           from '@nestjs/common'
import { Get }              from '@nestjs/common'
import { Cache }            from 'cache-manager'

import { AppService }       from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('helloworld')
  async getHello(): Promise<any> {
    return this.appService.getHello()
  }
}
