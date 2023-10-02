import { CacheModule }   from '@nestjs/cache-manager'
import { Module }        from '@nestjs/common'
import { ConfigModule }  from '@nestjs/config'
import { ConfigService } from '@nestjs/config'
// import * as redisStore   from 'cache-manager-redis-store'
import { redisStore }    from 'cache-manager-redis-yet'

import { AppController } from './app.controller'
import { AppService }    from './app.service'

@Module({
  imports: [
    // see https://docs.nestjs.com/techniques/caching#async-configuration

    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: Number(configService.get('CACHE_TTL')),
        store: redisStore as any,
        host: 'localhost',
        port: 6379
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
