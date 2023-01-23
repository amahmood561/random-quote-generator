import { Controller, Get, Post } from '@nestjs/common';
import { QuotesService } from './app.service.quote';
import { Quote } from './entity/quote.entity';

@Controller()
export class AppController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  async getRandomQuote(): Promise<Quote> {
    return this.quotesService.getRandomQuote();
  }

  @Post('/seed')
  async seed(): Promise<string> {
    return this.quotesService.seed();
  }
}
