import { CacheModuleOptions }  from '@nestjs/cache-manager'
import { CacheOptionsFactory } from '@nestjs/cache-manager'
import { Injectable }          from '@nestjs/common'

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      ttl: 5
    }
  }
}
