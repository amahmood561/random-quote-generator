import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { QuotesService } from './app.service.quote';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entity/quote.entity';

@Module({
  exports: [QuotesService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/db.sqlite',
      entities: [Quote],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Quote]),
  ],
  controllers: [AppController],
  providers: [QuotesService],
})
export class AppModule {}
