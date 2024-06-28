import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { QuestionModule } from './question/question.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get<string>('TYPEORM_DATABASE'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD').toString(),
        host: configService.get<string>('TYPEORM_HOST'),
        logging: configService.get<boolean>('TYPEORM_LOGGING'),
        cli: {
          migrationsDir: 'dist/migrations/*{.ts,.js}',
        },
        autoLoadEntities: true,
        entities: ['dist/entities/*{.ts,.js}'],
        migrations: ['dist/migrations/*{.ts,.js}'],
        migrationsRun: true,
        dropSchema: false,
        synchronize: true,
        bigNumberStrings: false,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    UserModule,
    GameModule,
    QuestionModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
